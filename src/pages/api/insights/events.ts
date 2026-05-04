import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

const TRACKED_EVENTS = ['cta_click', 'lang_switch', 'nav_click', 'external_link_click'];

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();

    const [totalsRes] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: TRACKED_EVENTS },
        },
      },
    });

    const totals = (totalsRes.rows ?? []).map((row) => ({
      event: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }));

    const [ctaRes] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'customEvent:cta_location' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', stringFilter: { value: 'cta_click' } },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    });

    const ctaByLocation = (ctaRes.rows ?? []).map((row) => ({
      location: row.dimensionValues?.[0]?.value || 'unknown',
      count: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }));

    const [linkRes] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'customEvent:link_type' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', stringFilter: { value: 'external_link_click' } },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    });

    const externalByType = (linkRes.rows ?? []).map((row) => ({
      type: row.dimensionValues?.[0]?.value || 'unknown',
      count: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }));

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
