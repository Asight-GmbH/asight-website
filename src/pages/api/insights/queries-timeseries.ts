import type { APIRoute } from 'astro';
import { jsonResponse, parseDays } from '../../../lib/ga-client';
import { getOAuthAccessToken, getGscSiteUrl } from '../../../lib/oauth-client';

export const prerender = false;

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function ymdToLabel(s: string): string {
  if (s.length !== 10) return s;
  return `${s.slice(8, 10)}.${s.slice(5, 7)}`;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const days = parseDays(url, 30);
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
        dimensions: ['date'],
        rowLimit: 1000,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return jsonResponse({ error: `GSC API ${res.status}: ${text}`, data: [] }, 500);
    }

    const json = (await res.json()) as {
      rows?: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
    };

    const data = (json.rows ?? []).map((r) => {
      const date = r.keys?.[0] ?? '';
      return {
        date,
        label: ymdToLabel(date),
        clicks: Math.round(r.clicks ?? 0),
        impressions: Math.round(r.impressions ?? 0),
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      };
    });

    const totals = data.reduce(
      (acc, d) => ({
        clicks: acc.clicks + d.clicks,
        impressions: acc.impressions + d.impressions,
      }),
      { clicks: 0, impressions: 0 },
    );

    return jsonResponse({
      data,
      totals,
      period: `${ymd(startDate)} to ${ymd(endDate)}`,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    return jsonResponse({
      error: err instanceof Error ? err.message : 'unknown',
      data: [], totals: { clicks: 0, impressions: 0 },
    }, 500);
  }
};
