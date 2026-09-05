type GtagWindow = Window & {
  gtag?: (command: string, ...args: unknown[]) => void;
};

/** Fires a GA4 event. No-ops when analytics is unavailable (SSR, blocked, dev). */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  (window as GtagWindow).gtag?.('event', name, params);
}

/** A visitor reaching out — the site's actual conversion. */
export function trackLead(method: 'whatsapp' | 'phone' | 'email' | 'form', location: string) {
  trackEvent('generate_lead', { method, lead_location: location });
}

export function trackPageView(path: string, title: string) {
  trackEvent('page_view', { page_path: path, page_title: title });
}
