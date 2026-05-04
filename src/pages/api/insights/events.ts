import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

const TRACKED_EVENTS = ['cta_click', 'lang_switch', 'nav_click', 'external_link_click'];

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }];

    const [totalsRes] = await client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', inListFilter: { values: TRACKED_EVENTS } },
      },
    });

    const totals = (totalsRes.rows ?? []).map((row) => ({
      event: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }));

    const ctaByLocation = await safeQuery(async () => {
      const [res] = await client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'customEvent:cta_location' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { value: 'cta_click' } },
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      });
      return (res.rows ?? []).map((row) => ({
        location: row.dimensionValues?.[0]?.value || 'unknown',
        count: parseInt(row.metricValues?.[0]?.value || '0', 10),
      }));
    }, [] as { location: string; count: number }[]);

    const externalByType = await safeQuery(async () => {
      const [res] = await client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'customEvent:link_type' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { value: 'external_link_click' } },
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      });
      return (res.rows ?? []).map((row) => ({
        type: row.dimensionValues?.[0]?.value || 'unknown',
        count: parseInt(row.metricValues?.[0]?.value || '0', 10),
      }));
    }, [] as { type: string; count: number }[]);

    return jsonResponse({
      totals,
      ctaByLocation,
      externalByType,
      period: `${days}daysAgo to yesterday`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      totals: [], ctaByLocation: [], externalByType: [],
    }, 500);
  }
};
