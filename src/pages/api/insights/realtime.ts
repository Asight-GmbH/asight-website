import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, COUNTRY_CODE_MAP, jsonResponse } from '../../../lib/ga-client';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const client = getGAClient();
    const property = getPropertyPath();

    const [totalRes] = await client.runRealtimeReport({
      property,
      metrics: [{ name: 'activeUsers' }],
    });

    const [locRes] = await client.runRealtimeReport({
      property,
      dimensions: [{ name: 'country' }, { name: 'city' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    });

    const activeUsers = parseInt(totalRes.rows?.[0]?.metricValues?.[0]?.value || '0', 10);

    const locations = (locRes.rows ?? []).map((row) => {
      const country = row.dimensionValues?.[0]?.value || 'Unknown';
      const city = row.dimensionValues?.[1]?.value || '';
      const users = parseInt(row.metricValues?.[0]?.value || '0', 10);
      return { country, countryCode: COUNTRY_CODE_MAP[country] || '', city, users };
    });

    return jsonResponse({ activeUsers, locations, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', activeUsers: 0, locations: [] }, 500);
  }
};
