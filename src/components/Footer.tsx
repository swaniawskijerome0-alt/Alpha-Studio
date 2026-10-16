import React from 'react';
import { Phone, MapPin, ArrowUp } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface FooterProps {
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-neutral-900 py-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" variant="dark" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mt-2">
              Burayu Mariam's premier photo studio. Specializing in high-end indoor studio lighting and natural outdoor portraits that capture authentic beauty and unforgettable memories.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="tel:0939390867"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 px-3.5 py-2 rounded-lg border border-neutral-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>0939390867</span>
              </a>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Burayu, Mariam</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio Portfolios
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#portraits" className="hover:text-white transition-colors">
                  Indoor Studio Portraits
                </a>
              </li>
              <li>
                <a href="#indoor-outdoor" className="hover:text-white transition-colors">
                  Outdoor Golden Hour Sessions
                </a>
              </li>
              <li>
                <a href="#interactive-studio" className="hover:text-white transition-colors">
                  Virtual Lighting Simulator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Packages & Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio Bookings & Hours
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Open 7 days a week for scheduled studio portrait sessions, walk-in inquiries, and weekend celebrations.
            </p>
            <div className="pt-1 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onBookClick}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center"
              >
                Reserve a Slot
              </button>
              <a
                href="tel:0939390867"
                className="py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Call: 0939390867
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} Alpha Studio · Burayu, Mariam. Founded by </span>
            <strong className="text-neutral-300 font-semibold">Architect Bereket Belay</strong>
            <span className="text-neutral-500"> (Architect, Designer & Photographer).</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#founder" className="text-neutral-400 hover:text-red-400 transition-colors">
              About Founder
            </a>
            <span className="text-neutral-400">Indoor & Outdoor Photography</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors p-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
