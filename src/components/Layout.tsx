import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first paint so the prerendered page is not scrolled or stolen focus.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:start-3 focus:bg-primary focus:text-white focus:px-5 focus:py-3 focus:rounded-md focus:font-bold"
      >
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-grow outline-none">
        <Outlet />
      </main>
      {/* Bottom padding keeps the floating WhatsApp button clear of footer text. */}
      <div className="pb-20 md:pb-0">
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
