import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, User, LogIn } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface NavbarProps {
  onBookClick: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, onOpenAccount }) => {
  const { user, signIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
            aria-label="Alpha Studio Home"
          >
            <Logo size="sm" showPhone={false} />
          </a>

          {/* Zone 2: 4–5 Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a
              href="#portraits"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0"
            >
              Portraits
            </a>
            <a
              href="#indoor-outdoor"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0"
            >
              Indoor & Outdoor
            </a>
            <a
              href="#interactive-studio"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0"
            >
              Lighting Studio
            </a>
            <a
              href="#founder"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0 text-amber-400 font-semibold"
            >
              Architect Bereket
            </a>
            <a
              href="#pricing"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0"
            >
              Pricing & Packages
            </a>
            <a
              href="#location"
              className="hover:text-red-500 transition-colors whitespace-nowrap shrink-0"
            >
              Burayu Mariam
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Auth Account */}
          <div className="flex items-center gap-2.5 shrink-0">
            {user ? (
              <button
                onClick={onOpenAccount}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-neutral-200 transition-all cursor-pointer"
                title="View My Studio Account & Bookings"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <User className="w-3.5 h-3.5 text-red-500" />
                )}
                <span className="hidden sm:inline max-w-[90px] truncate">{user.displayName?.split(' ')[0] || 'Account'}</span>
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-red-500" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Session</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0f] border-b border-neutral-800 px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-200">
            <a
              href="#portraits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-red-500 transition-colors"
            >
              Portraits & Gallery
            </a>
            <a
              href="#indoor-outdoor"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-red-500 transition-colors"
            >
              Indoor & Outdoor
            </a>
            <a
              href="#interactive-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-red-500 transition-colors"
            >
              Lighting Studio Simulator
            </a>
            <a
              href="#founder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              Meet Architect Bereket Belay (Founder)
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-red-500 transition-colors"
            >
              Pricing & Packages
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-red-500 transition-colors"
            >
              Location: Burayu Mariam
            </a>
          </nav>
          <div className="pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-200 font-semibold"
              >
                <User className="w-4 h-4 text-red-500" />
                <span>My Studio Account ({user.displayName || 'Client'})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signIn();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-neutral-900 rounded-lg text-sm font-bold"
              >
                <LogIn className="w-4 h-4 text-red-500" />
                <span>Sign In with Google</span>
              </button>
            )}
            <a
              href="tel:0939390867"
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-200 font-semibold"
            >
              <Phone className="w-4 h-4 text-red-500" />
              Call Studio: 0939390867
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
