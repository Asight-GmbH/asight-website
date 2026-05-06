type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function track(name: string, params: Record<string, unknown>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

function isExternal(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);
    return url.host !== window.location.host && (url.protocol === 'http:' || url.protocol === 'https:');
  } catch { return false; }
}

function classifyLink(href: string): string {
  if (href.includes('tidycal.com')) return 'booking';
  if (href.includes('google.com/maps') || href.includes('maps.app.goo.gl')) return 'map';
  if (href.includes('linkedin.com')) return 'linkedin';
  if (href.includes('mailto:')) return 'email';
  if (href.includes('tel:')) return 'phone';
  return 'other';
}

document.addEventListener('click', (e) => {
  const target = e.target instanceof Element ? e.target : null;
  if (!target) return;
  const link = target.closest<HTMLAnchorElement | HTMLButtonElement>('a, button');
  if (!link) return;

  const label = (link.textContent || '').trim().slice(0, 80);
  const href = link instanceof HTMLAnchorElement ? link.getAttribute('href') || '' : '';

  if (link.classList.contains('lang-switch')) {
    const url = new URL(link.getAttribute('href') || '', window.location.href);
    const to = url.searchParams.get('lang') || '';
    const from = document.documentElement.lang || '';
    track('lang_switch', { from, to });
    return;
  }

  if (link.classList.contains('btn-primary') || link.classList.contains('btn-primary-gradient')) {
    let location = 'unknown';
    if (link.closest('.header')) location = 'header';
    else if (link.closest('.hero')) location = 'hero';
    else if (link.closest('.contact')) location = 'contact';
    else if (link.closest('.footer')) location = 'footer';
    track('cta_click', { cta_location: location, cta_label: label });
    return;
  }

  if (link.classList.contains('nav-link') && href.startsWith('/#')) {
    track('nav_click', { nav_target: href.replace('/#', '') });
    return;
  }

  if (href && isExternal(href)) {
    track('external_link_click', { url: href, link_type: classifyLink(href) });
  }
});

export {};
