import type { APIContext, APIRoute } from 'astro';
import { makeHandler } from '@keystatic/astro/dist/keystatic-astro-api.js';
import config from '../../../../keystatic.config';

const originalHandler = makeHandler({ config });

export const prerender = false;

export const ALL: APIRoute = async (context: APIContext) => {
  // On Vercel (and behind proxies), context.request.url has an internal hostname
  // (often localhost). Reconstruct the request with the real public host so
  // Keystatic generates correct OAuth redirect_uri values.
  const forwardedHost =
    context.request.headers.get('x-forwarded-host') ||
    context.request.headers.get('host');

  const forwardedProto =
    context.request.headers.get('x-forwarded-proto') || 'https';

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

  const realHost = forwardedHost || vercelHost;

  if (realHost && !realHost.includes('localhost')) {
    const originalUrl = new URL(context.request.url);
    const fixedUrl = new URL(
      originalUrl.pathname + originalUrl.search,
      `${forwardedProto}://${realHost}`
    );

    const fixedRequest = new Request(fixedUrl.toString(), {
      method: context.request.method,
      headers: context.request.headers,
      body:
        context.request.method === 'GET' || context.request.method === 'HEAD'
          ? undefined
          : context.request.body,
      // @ts-ignore - duplex is required in newer Node versions for body streams
      duplex: 'half',
    });

    const fixedContext = { ...context, request: fixedRequest };
    return originalHandler(fixedContext as APIContext);
  }

  return originalHandler(context);
};
