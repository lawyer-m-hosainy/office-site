import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import siteData from '../content/site.json';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'الخدمات', path: '/services' },
    { name: 'المقالات', path: '/articles' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm text-text-main sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/brand/logo.svg" alt="شعار المكتب" className="h-12 w-auto" onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23164A46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
            }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `transition-colors hover:text-primary ${isActive ? 'text-primary font-bold' : 'text-text-muted'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/book" className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-opacity-90 transition-opacity">
              احجز استشارة
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="القائمة الرئيسية">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 shadow-lg absolute w-full">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
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
