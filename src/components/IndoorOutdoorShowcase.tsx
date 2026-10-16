import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Lamp, Sparkles, CheckCircle2, ArrowRight, Camera, Award } from 'lucide-react';

interface IndoorOutdoorShowcaseProps {
  onBookType: (type: string) => void;
}

export const IndoorOutdoorShowcase: React.FC<IndoorOutdoorShowcaseProps> = ({ onBookType }) => {
  const [activeTab, setActiveTab] = useState<'oromo' | 'indoor' | 'outdoor'>('oromo');

  return (
    <section id="indoor-outdoor" className="py-24 bg-[#0c0c0e] relative border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Studio Specializations</span>
            <span aria-hidden="true">·</span>
            <span>Burayu Mariam, Ethiopia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Best Indoor, Outdoor & Cultural Photography
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            From regal <strong className="text-white">Ethiopian Traditional & Modern Dress</strong> sessions to controlled indoor strobe lighting and sunlit outdoor celebrations across Burayu Mariam, Alpha Studio turns every shoot into timeless art.
          </p>

          {/* Interactive Filter Control - 3 Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg gap-1">
            <button
              onClick={() => setActiveTab('oromo')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'oromo'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Traditional & Modern Dress</span>
            </button>
            <button
              onClick={() => setActiveTab('indoor')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'indoor'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Lamp className="w-4 h-4" />
              <span>Indoor Studio Precision</span>
            </button>
            <button
              onClick={() => setActiveTab('outdoor')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'outdoor'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Outdoor Natural Sunlight</span>
            </button>
          </div>
        </motion.div>

        {/* Animated Tab Content Transition */}
        <AnimatePresence mode="wait">
          {activeTab === 'oromo' && (
            <motion.div
              key="oromo"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/90 border border-red-950/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle crimson/gold backdrop glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Dual Visual Showcase: Oromo Traditional Photos */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80 shadow-xl">
                  <img
                    src="/src/assets/images/portfolio_oromo_traditional_1791912459604.jpg"
                    alt="Oromo Traditional Dress Wandaboo and Siqqee ceremonial portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                    Wandaboo & Siqqee
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Cultural Heritage
                    </span>
                    <span className="text-xs font-bold text-white">Authentic Callee & Embroidery</span>
                  </div>
                </div>

                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80 shadow-xl">
                  <img
                    src="/src/assets/images/portfolio_oromo_celebration_1791912460722.jpg"
                    alt="Oromo Cultural Elegance celebration dress with beaded necklace"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md border border-amber-400/30 px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    Burayu Scenery
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Irreecha & Wedding Glam
                    </span>
                    <span className="text-xs font-bold text-white">Intricate Headpiece & Gown</span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-red-500 tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>Specialty at Alpha Studio Burayu</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Ethiopian Traditional & Modern Portraits
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Honor your roots and individual aesthetic. We celebrate every cultural tradition across Ethiopia—<strong className="text-white">Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, Gojjam, Wollo, Tigray, Harar, Sidama, Wolaita</strong>—as well as bespoke <strong className="text-white">contemporary modern dresses</strong>. Photographed with studio chiaroscuro strobe lighting or across scenic Burayu landscapes.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    'Authentic styling support for any Ethiopian ethnic dress: Gurage, Arsi, Wollega, Illu Ababor, Jimma, Gonder, etc.',
                    'Contemporary modern attire: evening gowns, sharp suits, casual chic & graduation robes',
                    'Private luxury dressing & vanity suite for jewelry, beadwork, and hair preparation',
                    'Traditional props and accessories (Siqqee, Chaachuu, Callee, scarves, and cultural ornaments)',
                    'Shot in our Burayu Mariam studio or outdoors across scenic green Burayu hills',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onBookType('Traditional & Cultural Dress Session (Any Region)')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/30 active:scale-95"
                  >
                    <span>Book Traditional / Modern Shoot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:0939390867"
                    className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Call: 0939390867</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'indoor' && (
            <motion.div
              key="indoor"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl"
            >
              {/* Dual Visual Showcase */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80">
                  <img
                    src="/src/assets/images/portfolio_male_studio_1791911974699.jpg"
                    alt="Alpha Studio indoor warm studio portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                      Warm Tones
                    </span>
                    <span className="text-xs font-bold text-white">Classic Studio Stool</span>
                  </div>
                </div>

                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80">
                  <img
                    src="/src/assets/images/portfolio_bw_fashion_1791911975854.jpg"
                    alt="Alpha Studio dramatic monochrome fashion portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 font-bold block">
                      Monochrome
                    </span>
                    <span className="text-xs font-bold text-white">High Stool Editorial</span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-red-500 tracking-wider">
                    Burayu Mariam Main Stage
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Controlled Studio Strobes & Chiaroscuro
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Inside our Burayu Mariam studio, we sculpt light with multi-strobe softboxes, honeycomb grids, and backdrops. Your skin looks smooth, your wardrobe pops, and your confidence shines through.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    'Seamless Backdrops: Warm Earth Brown, Jet Black, Crimson, High-Key White',
                    'Dedicated private vanity dressing area before the shoot',
                    'Live tethered monitor preview for real-time review',
                    'Direction and posing coaching for flawless natural posture',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onBookType('Indoor Studio Session')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
                  >
                    <span>Book Indoor Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:0939390867"
                    className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                  >
                    Direct Call: 0939390867
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'outdoor' && (
            <motion.div
              key="outdoor"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl"
            >
              {/* Dual Visual Showcase */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80">
                  <img
                    src="/src/assets/images/portfolio_traditional_cultural_1791911977871.jpg"
                    alt="Alpha Studio traditional cultural attire portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Cultural Heritage
                    </span>
                    <span className="text-xs font-bold text-white">Traditional Maroon Gown</span>
                  </div>
                </div>

                <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-neutral-800/80">
                  <img
                    src="/src/assets/images/portfolio_grad_confetti_1791911977470.jpg"
                    alt="Alpha Studio outdoor graduation confetti celebration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                      Celebration
                    </span>
                    <span className="text-xs font-bold text-white">Confetti & Sunlit Gardens</span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                    Scenic Burayu Locations
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Sunlit Outdoor Celebrations & Milestones
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Bask in radiant natural Ethiopian sunlight. We guide you across scenic gardens, stone steps, and green hills in Burayu to create energetic graduation milestones, cultural portraits, and wedding moments.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    'Scenic locations and lush gardens in Burayu and nearby vistas',
                    'Fast 85mm f/1.4 prime optics for silky background bokeh blur',
                    'Dynamic motion captures (confetti pops, walking, candid laughter)',
                    'Special packages for Graduations, Traditional Heritage, and Weddings',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onBookType('Outdoor Natural Light Session')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
                  >
                    <span>Book Outdoor Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:0939390867"
                    className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                  >
                    Questions? Call 0939390867
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
