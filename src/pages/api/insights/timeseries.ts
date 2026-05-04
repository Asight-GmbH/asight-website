import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();

    const [response] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const data = (response.rows ?? []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
      visitors: parseInt(row.metricValues?.[1]?.value || '0', 10),
    }));

    return jsonResponse({ data, period: `${days}daysAgo to yesterday`, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', data: [] }, 500);
  }
};
