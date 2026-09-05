import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, Phone, X } from '../lib/icons';
import { trackLead } from '../lib/analytics';
import siteData from '../content/site.json';
import BrandLogo from './BrandLogo';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'من نحن', path: '/about' },
  { name: 'الخدمات', path: '/services' },
  { name: 'المقالات', path: '/articles' },
  { name: 'أسئلة شائعة', path: '/faq' },
  { name: 'تواصل معنا', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>('a, button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className="bg-background/95 backdrop-blur-sm text-text-main sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="الصفحة الرئيسية">
            <BrandLogo className="h-10 md:h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `transition-colors hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-text-muted'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href={`tel:${siteData.phoneE164}`}
              onClick={() => trackLead('phone', 'header')}
              className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
            >
              <Phone size={18} aria-hidden="true" />
              <span dir="ltr">{siteData.phoneDisplay}</span>
            </a>
            <Link
              to="/book"
              className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              احجز استشارة
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${siteData.phoneE164}`}
              onClick={() => trackLead('phone', 'header_mobile')}
              aria-label={`اتصل بنا على ${siteData.phoneDisplay}`}
              className="text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
            >
              <Phone size={24} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              className="text-primary p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="القائمة الرئيسية"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="md:hidden bg-background border-t border-gray-200 shadow-lg absolute w-full"
        >
          <nav className="flex flex-col px-4 py-4 gap-4" aria-label="تنقل الجوال">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 transition-colors rounded-md ${isActive ? 'bg-primary/5 text-primary font-bold' : 'text-text-muted hover:bg-gray-50'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white px-4 py-3 rounded-md font-semibold text-center mt-2"
            >
              احجز استشارة
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
