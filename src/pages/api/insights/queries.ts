import type { APIRoute } from 'astro';
import { jsonResponse, parseDays } from '../../../lib/ga-client';
import { getOAuthAccessToken, getGscSiteUrl } from '../../../lib/oauth-client';

export const prerender = false;

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
    const dimension = url.searchParams.get('dimension') === 'page' ? 'page' : 'query';

    const accessToken = await getOAuthAccessToken();
    const siteUrl = getGscSiteUrl();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: ymd(startDate),
        endDate: ymd(endDate),
        dimensions: [dimension],
        rowLimit: 25,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return jsonResponse({ error: `GSC API ${res.status}: ${text}`, rows: [], totals: null }, 500);
    }

    const data = (await res.json()) as {
      rows?: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
    };

    const rows = (data.rows ?? []).map((r) => ({
      key: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

    const totals = rows.reduce(
      (acc, r) => ({
        clicks: acc.clicks + r.clicks,
        impressions: acc.impressions + r.impressions,
      }),
      { clicks: 0, impressions: 0 },
    );

    return jsonResponse({
      rows,
      totals,
      dimension,
      period: `${ymd(startDate)} to ${ymd(endDate)}`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'unknown', rows: [], totals: null }, 500);
  }
};
