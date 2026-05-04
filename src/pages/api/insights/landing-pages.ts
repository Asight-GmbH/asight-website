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
    const limitRaw = url.searchParams.get('limit');
    const limit = limitRaw ? Math.min(Math.max(parseInt(limitRaw, 10) || 10, 1), 50) : 10;

    const client = getGAClient();
    const property = getPropertyPath();

    const [response] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'landingPage' }],
      metrics: [
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit,
    });

    const pages = (response.rows ?? []).map((row) => {
      const dur = parseFloat(row.metricValues?.[2]?.value || '0');
      return {
        path: row.dimensionValues?.[0]?.value || '(unknown)',
        sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
        bounceRate: parseFloat(row.metricValues?.[1]?.value || '0'),
        avgDurationSeconds: dur,
        avgDuration: fmtDuration(dur),
      };
    });

    const totalSessions = pages.reduce((s, p) => s + p.sessions, 0);

    return jsonResponse({
      pages,
      totalSessions,
      period: `${days}daysAgo to today`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      pages: [], totalSessions: 0,
    }, 500);
  }
};
