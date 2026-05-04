import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const client = getGAClient();
    const property = getPropertyPath();
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];

    const [overall] = await client.runReport({
      property,
      dateRanges,
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagementRate' },
        { name: 'bounceRate' },
        { name: 'screenPageViewsPerSession' },
      ],
    });

    const row = overall.rows?.[0];
    const sessions = parseInt(row?.metricValues?.[0]?.value || '0', 10);
    const totalUsers = parseInt(row?.metricValues?.[1]?.value || '0', 10);
    const engagementRate = parseFloat(row?.metricValues?.[2]?.value || '0');
    const bounceRate = parseFloat(row?.metricValues?.[3]?.value || '0');
    const pagesPerSession = parseFloat(row?.metricValues?.[4]?.value || '0');

    const [byUserType] = await client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [{ name: 'totalUsers' }],
    });

    let newUsers = 0;
    let returningUsers = 0;
    for (const r of byUserType.rows ?? []) {
      const type = r.dimensionValues?.[0]?.value || '';
      const v = parseInt(r.metricValues?.[0]?.value || '0', 10);
      if (type === 'new') newUsers = v;
      else if (type === 'returning') returningUsers = v;
    }

    const sumUsers = newUsers + returningUsers;
    const newUsersPct = sumUsers > 0 ? newUsers / sumUsers : 0;
    const returningUsersPct = sumUsers > 0 ? returningUsers / sumUsers : 0;

    return jsonResponse({
      sessions,
      totalUsers,
      engagementRate,
      bounceRate,
      pagesPerSession,
      newUsers,
      returningUsers,
      newUsersPct,
      returningUsersPct,
      period: `${days}daysAgo to today`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      sessions: 0, totalUsers: 0, engagementRate: 0, bounceRate: 0, pagesPerSession: 0,
      newUsers: 0, returningUsers: 0, newUsersPct: 0, returningUsersPct: 0,
    }, 500);
  }
};
