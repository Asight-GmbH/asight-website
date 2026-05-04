import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, COUNTRY_CODE_MAP, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();

    const [response] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 50,
    });

    const countries = (response.rows ?? []).map((row) => {
      const country = row.dimensionValues?.[0]?.value || 'Unknown';
      return {
        country,
        countryCode: COUNTRY_CODE_MAP[country] || '',
        sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
        visitors: parseInt(row.metricValues?.[1]?.value || '0', 10),
      };
    });

    return jsonResponse({ countries, period: `${days}daysAgo to yesterday`, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', countries: [] }, 500);
  }
};
