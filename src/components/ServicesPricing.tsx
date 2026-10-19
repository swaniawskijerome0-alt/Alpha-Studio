import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Sparkles, Phone } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  category: 'indoor' | 'outdoor' | 'both' | 'commercial';
  price: string;
  duration: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-indoor',
    name: 'Indoor Signature Studio',
    category: 'indoor',
    price: 'ETB 1,800',
    duration: '45 Minutes Session',
    description: 'Perfect for individual creative portraits, birthday glam, and social media headshots at our Burayu studio.',
    features: [
      'Studio Strobe & Multi-Point Softbox Setup',
      'Choice of 2 Backdrops (Jet Black, Velvet Crimson, or High-Key White)',
      '8 Master Hand-Retouched High-Res Photos',
      'All original digital shots delivered in gallery',
      'Dedicated makeup & outfit dressing vanity room',
      'Live monitor tethering for real-time review',
    ],
  },
  {
    id: 'pkg-outdoor',
    name: 'Outdoor Golden Hour',
    category: 'outdoor',
    badge: 'Most Popular',
    recommended: true,
    price: 'From ETB 6,000',
    duration: '90 Minutes Full Session',
    description: 'Bespoke natural sunlight portraits in Burayu scenic locations. Includes 50 master edited and 50 original RAW photos.',
    features: [
      '50 Master Hand-Edited High-Res Photos',
      '50 Original RAW Digital Photos Included',
      'Scenic Burayu Hills or Lush Garden On-Location',
      'Ultra-shallow depth of field (f/1.2 & f/1.4 prime optics)',
      'Up to 3 Outfit Looks & Posing Direction',
      'High-speed digital delivery & print-ready files',
    ],
  },
  {
    id: 'pkg-traditional-modern',
    name: 'Ethiopian Traditional & Modern Dress Special',
    category: 'both',
    badge: 'Heritage & Modern',
    price: 'ETB 2,800',
    duration: '90 Minutes Session',
    description: 'Dedicated celebration of Ethiopian cultural beauty and modern style. Choose from any traditional dress across Ethiopia (Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, Gojjam, Wollo, Tigray, Harar, Sidama, Wolaita, etc.) or modern dress.',
    features: [
      'Indoor Studio Stage + Scenic Burayu Outdoor Hills',
      'Accommodates any Ethiopian traditional dress or contemporary modern styling',
      '18 Master Hand-Retouched High-Res Photos',
      'Private vanity & dressing suite for outfit & ornament changes',
      'Authentic cultural posing guidance & modern fashion direction',
      'Ultra-fast digital delivery + print-ready files',
    ],
  },
  {
    id: 'pkg-combo',
    name: 'Alpha Elite Dual (Indoor + Outdoor)',
    category: 'both',
    badge: 'Comprehensive',
    price: 'ETB 3,800',
    duration: '2.5 Hours Full Experience',
    description: 'The ultimate Alpha Studio experience combining controlled dramatic studio lighting and outdoor scenery.',
    features: [
      'Indoor Studio Session + Burayu Outdoor Location',
      '25 Master Fine-Art Retouched Photos',
      'Unlimited Outfit Changes',
      'Priority express editing turnaround (24 Hours)',
      'Ideal for couples, graduation, and models',
      'High-resolution archival print files included',
    ],
  },
  {
    id: 'pkg-wedding',
    name: 'Weddings & Celebrations',
    category: 'both',
    price: 'Custom Quote',
    duration: 'Half-Day / Full-Day Coverage',
    description: 'Bespoke coverage for weddings, engagements, and cultural milestones in Burayu and greater Addis Ababa.',
    features: [
      'Complete Ceremony & Portrait Session Coverage',
      'Lead Photographer + Studio Lighting Assistant',
      '100+ Curated & Color-Graded Heirloom Images',
      'Custom Leather Keepsake Photo Album options',
      'Consultation & Timeline Planning',
      'Direct call consultation with master photographer',
    ],
  },
];

interface ServicesPricingProps {
  onSelectPackage: (pkgName: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectPackage }) => {
  return (
    <section id="pricing" className="py-24 bg-[#0c0c0e] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Rates</span>
            <span aria-hidden="true">·</span>
            <span>Alpha Studio Burayu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Portrait Session Packages
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Crafted for individuals, couples, and families who appreciate world-class optical quality, meticulous skin retouching, and prompt delivery.
          </p>
        </div>

        {/* Pricing Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 relative ${
                pkg.recommended
                  ? 'bg-neutral-900/95 border-2 border-red-600 shadow-2xl shadow-red-950/40'
                  : 'bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{pkg.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="pt-2 pb-3 border-b border-neutral-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                    {pkg.price}
                  </div>
                  <span className="text-xs text-neutral-500 font-medium block mt-0.5">
                    {pkg.duration}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-1">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-neutral-800/80">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    shutterAudio.playShutterSound();
                    onSelectPackage(pkg.name);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md text-center cursor-pointer ${
                    pkg.recommended
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  Select & Book
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom inquiry strip */}
        <div className="mt-12 text-center text-xs text-neutral-400 flex flex-wrap items-center justify-center gap-3">
          <span>Need custom group shoots, commercial catalog, or school graduation?</span>
          <a
            href="tel:0939390867"
            className="text-red-500 font-bold hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Call: 0939390867</span>
          </a>
          <span className="text-neutral-600">·</span>
          <a
            href="https://t.me/Gmichael_1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64B5F6] hover:text-white font-bold hover:underline inline-flex items-center gap-1 bg-[#229ED9]/15 px-2.5 py-1 rounded-md border border-[#229ED9]/30 transition-all"
          >
            <span>Telegram: @Gmichael_1</span>
          </a>
        </div>
      </div>
    </section>
  );
};
