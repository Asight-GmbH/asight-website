interface AccessTokenCache {
  token: string;
  expiresAt: number;
}

let cache: AccessTokenCache | null = null;

export async function getOAuthAccessToken(): Promise<string> {
  if (cache && Date.now() < cache.expiresAt - 60_000) {
    return cache.token;
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('OAuth env vars missing (GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN)');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`OAuth refresh failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cache.token;
}

export function getGscSiteUrl(): string {
  return process.env.GSC_SITE_URL || 'https://www.asightconsulting.com/';
}
