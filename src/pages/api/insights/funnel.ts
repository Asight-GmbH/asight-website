import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

async function safeNumber(fn: () => Promise<number>): Promise<number | null> {
  try { return await fn(); } catch { return null; }
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];

    const [overall] = await client.runReport({
      property,
      dateRanges,
      metrics: [{ name: 'sessions' }, { name: 'engagedSessions' }],
    });
    const sessions = parseInt(overall.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    const engagedSessions = parseInt(overall.rows?.[0]?.metricValues?.[1]?.value || '0', 10);

    const [events] = await client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: ['cta_click', 'external_link_click'] },
        },
      },
    });

    let ctaClicks = 0;
    let externalClicks = 0;
    for (const r of events.rows ?? []) {
      const name = r.dimensionValues?.[0]?.value;
      const v = parseInt(r.metricValues?.[0]?.value || '0', 10);
      if (name === 'cta_click') ctaClicks = v;
      else if (name === 'external_link_click') externalClicks = v;
    }

    const bookingClicks = await safeNumber(async () => {
      const [res] = await client.runReport({
        property,
        dateRanges,
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              { filter: { fieldName: 'eventName', stringFilter: { value: 'external_link_click' } } },
              { filter: { fieldName: 'customEvent:link_type', stringFilter: { value: 'booking' } } },
            ],
          },
        },
      });
      return parseInt(res.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    });

    const bookingTracked = bookingClicks !== null;
    const finalCount = bookingTracked ? bookingClicks! : externalClicks;
    const finalLabel = bookingTracked ? 'Termin gebucht' : 'Externer Klick';

    const stages = [
      { key: 'sessions',  name: 'Sitzungen',  count: sessions,        hint: 'Alle Besucher' },
      { key: 'engaged',   name: 'Engagiert',  count: engagedSessions, hint: '≥10s oder ≥2 Pageviews' },
      { key: 'cta',       name: 'CTA geklickt', count: ctaClicks,     hint: 'Hero / Header / Contact CTA' },
      { key: 'booking',   name: finalLabel,   count: finalCount,
        hint: bookingTracked ? 'TidyCal-Klick' : 'Custom Dimension link_type nicht registriert — alle externen Links' },
    ].map((s) => ({
      ...s,
      pct: sessions > 0 ? (s.count / sessions) * 100 : 0,
    }));

    return jsonResponse({
      stages,
      bookingTracked,
      totalConversion: stages[stages.length - 1].pct,
      period: `${days}daysAgo to today`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      stages: [], bookingTracked: false, totalConversion: 0,
    }, 500);
  }
};
