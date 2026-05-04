import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

function fmtDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();

    const [response] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
      ],
    });

    const row = response.rows?.[0];
    const sessions = parseInt(row?.metricValues?.[0]?.value || '0', 10);
    const visitors = parseInt(row?.metricValues?.[1]?.value || '0', 10);
    const avgDurationSeconds = parseFloat(row?.metricValues?.[2]?.value || '0');
    const pageViews = parseInt(row?.metricValues?.[3]?.value || '0', 10);
    const engagementRate = parseFloat(row?.metricValues?.[4]?.value || '0');
    const bounceRate = parseFloat(row?.metricValues?.[5]?.value || '0');

    return jsonResponse({
      sessions,
      visitors,
      avgDurationSeconds,
      avgDuration: fmtDuration(avgDurationSeconds),
      pageViews,
      engagementRate,
      bounceRate,
      pagesPerSession: sessions > 0 ? pageViews / sessions : 0,
      period: `${days}daysAgo to today`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      sessions: 0, visitors: 0, avgDurationSeconds: 0, avgDuration: '0:00', pageViews: 0,
      engagementRate: 0, bounceRate: 0, pagesPerSession: 0,
    }, 500);
  }
};
