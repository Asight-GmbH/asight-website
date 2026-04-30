import { defineMiddleware } from 'astro:middleware';

const COOKIE_NAME = 'lang-preference';
const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'lax' as const,
  secure: true,
};

export const onRequest = defineMiddleware(async (context, next) => {
  // Only act on GET requests
  if (context.request.method !== 'GET') {
    return next();
  }

  // 1) Explicit user choice via ?lang=xx query param.
  //    Save to cookie and redirect to the clean URL.
  const langParam = context.url.searchParams.get('lang');
  if (langParam === 'de' || langParam === 'en') {
    context.cookies.set(COOKIE_NAME, langParam, COOKIE_OPTIONS);
    const cleanUrl = new URL(context.url);
    cleanUrl.searchParams.delete('lang');
    return context.redirect(cleanUrl.pathname + cleanUrl.search, 302);
  }

  // 2) Auto-redirect on root '/' if no explicit preference exists yet.
  if (context.url.pathname === '/') {
    const stored = context.cookies.get(COOKIE_NAME)?.value;

    if (stored === 'en') {
      return context.redirect('/en/', 302);
    }

    if (!stored) {
      const accept = context.request.headers.get('accept-language') || '';
      const primary = accept.split(',')[0]?.trim().toLowerCase() || '';
      // German-speaking locales: de-DE, de-AT, de-CH, de
      const isGermanSpeaking = /^de(\b|-)/.test(primary);
      if (!isGermanSpeaking) {
        return context.redirect('/en/', 302);
      }
    }
  }

  return next();
});
