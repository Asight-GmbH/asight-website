import { BetaAnalyticsDataClient } from '@google-analytics/data';

let cachedClient: BetaAnalyticsDataClient | null = null;

export function getGAClient(): BetaAnalyticsDataClient {
  if (cachedClient) return cachedClient;

  const b64 = process.env.GA_SERVICE_ACCOUNT_KEY;
  if (!b64) {
    throw new Error('GA_SERVICE_ACCOUNT_KEY env var is missing');
  }
  const json = Buffer.from(b64, 'base64').toString('utf8');
  const credentials = JSON.parse(json);

  cachedClient = new BetaAnalyticsDataClient({ credentials });
  return cachedClient;
}

export function getPropertyPath(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error('GA4_PROPERTY_ID env var is missing');
  return `properties/${id}`;
}

export const COUNTRY_CODE_MAP: Record<string, string> = {
  Germany: 'DE', Austria: 'AT', Switzerland: 'CH', France: 'FR', Italy: 'IT',
  Spain: 'ES', Portugal: 'PT', Netherlands: 'NL', Belgium: 'BE', Luxembourg: 'LU',
  'United Kingdom': 'GB', Ireland: 'IE', Poland: 'PL', 'Czech Republic': 'CZ',
  Czechia: 'CZ', Slovakia: 'SK', Hungary: 'HU', Romania: 'RO', Bulgaria: 'BG',
  Greece: 'GR', Sweden: 'SE', Norway: 'NO', Finland: 'FI', Denmark: 'DK',
  Estonia: 'EE', Latvia: 'LV', Lithuania: 'LT', Croatia: 'HR', Slovenia: 'SI',
  'United States': 'US', Canada: 'CA', Mexico: 'MX', Brazil: 'BR', Argentina: 'AR',
  China: 'CN', Japan: 'JP', 'South Korea': 'KR', India: 'IN', Singapore: 'SG',
  Australia: 'AU', 'New Zealand': 'NZ', Russia: 'RU', Ukraine: 'UA',
  Turkey: 'TR', Israel: 'IL', 'United Arab Emirates': 'AE', 'Saudi Arabia': 'SA',
  Jordan: 'JO', 'South Africa': 'ZA', Egypt: 'EG', Morocco: 'MA',
};

export function flagFromCountryCode(code?: string): string {
  if (!code || code.length !== 2) return '🌐';
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - 65,
    A + code.toUpperCase().charCodeAt(1) - 65,
  );
}

export function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export function parseDays(url: URL, fallback = 30): number {
  const raw = url.searchParams.get('days');
  const n = raw ? parseInt(raw, 10) : fallback;
  if (!Number.isFinite(n) || n < 1 || n > 365) return fallback;
  return n;
}
