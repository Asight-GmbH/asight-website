import type { APIRoute } from 'astro';
import { getGAClient, getPropertyPath, jsonResponse, parseDays } from '../../../lib/ga-client';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const limitRaw = url.searchParams.get('limit');
    const limit = limitRaw ? Math.min(Math.max(parseInt(limitRaw, 10) || 10, 1), 50) : 10;

    const client = getGAClient();
    const property = getPropertyPath();

    const [response] = await client.runReport({
      property,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'yesterday' }],
      dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit,
    });

    const pages = (response.rows ?? []).map((row) => ({
      title: row.dimensionValues?.[0]?.value || '(no title)',
      path: row.dimensionValues?.[1]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0', 10),
      visitors: parseInt(row.metricValues?.[1]?.value || '0', 10),
    }));

    return jsonResponse({ pages, period: `${days}daysAgo to yesterday`, lastUpdated: new Date().toISOString() });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', pages: [] }, 500);
  }
};
