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
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    });

    const rows = (response.rows ?? []).map((row) => ({
      device: row.dimensionValues?.[0]?.value || 'unknown',
      sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
      visitors: parseInt(row.metricValues?.[1]?.value || '0', 10),
    }));

    const totalSessions = rows.reduce((sum, r) => sum + r.sessions, 0);
    const devices = rows.map((r) => ({
      ...r,
      percentage: totalSessions > 0 ? Math.round((r.sessions / totalSessions) * 100) : 0,
    }));

    return jsonResponse({ devices, totalSessions, period: `${days}daysAgo to yesterday`, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', devices: [], totalSessions: 0 }, 500);
  }
};
