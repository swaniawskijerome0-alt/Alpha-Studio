import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Camera,
  Palette,
  Globe,
  Award,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  Briefcase,
  Layers,
  Ruler,
  GraduationCap,
} from 'lucide-react';

interface AboutFounderProps {
  onBookClick: () => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'architecture' | 'photography' | 'graphics' | 'web'>('all');

  const disciplines = [
    {
      id: 'architecture',
      title: 'Architectural & Spatial Designer',
      icon: Compass,
      tag: 'B.Sc. Architecture',
      description:
        'Trained architect with deep mastery in spatial composition, light volume, structural geometry, and ambient proportions. Bereket personally designed Alpha Studio’s physical studio layout, acoustics, and custom multi-angle lighting rigs in Burayu Mariam.',
      highlights: [
        'Studio spatial planning & acoustic lighting architecture',
        'Advanced understanding of light physics, shadows & planes',
        'Harmonious framing inspired by classical & modernist proportions',
        'Architectural photography & built-environment documentation',
      ],
    },
    {
      id: 'photography',
      title: 'Lead Photographer & Visual Director',
      icon: Camera,
      tag: 'Fine-Art & Commercial',
      description:
        'Translating architectural discipline into emotional, evocative portraiture. Specializing in dramatic chiaroscuro studio lighting, Oromo traditional cultural documentation (Wandaboo, Callee, Siqqee), and golden hour outdoor portraits in Burayu.',
      highlights: [
        'Mastery of studio strobes, beauty dishes & parabolic reflectors',
        'Preserving Ethiopian & Oromo cultural heritage with dignity',
        'Posing guidance based on human anatomical alignment',
        'Editorial magazine-grade retouching and color grading',
      ],
    },
    {
      id: 'graphics',
      title: 'Graphic Designer & Brand Identity',
      icon: Palette,
      tag: 'Brand Systems & Print',
      description:
        'Crafting bespoke brand marks, typographic hierarchies, and print heirloom collections. Bereket developed the entire Alpha Studio visual system and produces custom leather-bound keepsake photo books for clients.',
      highlights: [
        'High-contrast brand identity and emblem creation',
        'Editorial print layouts & luxury photo album engineering',
        'Typographic discipline and color theory mastery',
        'Visual storytelling for corporate and milestone events',
      ],
    },
    {
      id: 'web',
      title: 'Web & Interactive UI/UX Designer',
      icon: Globe,
      tag: 'Digital Experiences',
      description:
        'Bridging tangible architecture with digital interactivity. Bereket designs seamless, responsive web platforms and digital galleries that allow clients to effortlessly book, view, and interact with studio portfolios.',
      highlights: [
        'Modern dark-mode aesthetic & typographic rigor',
        'Interactive client experience & booking architectures',
        'Performance-optimized visual presentation',
        'Seamless digital delivery for high-resolution galleries',
      ],
    },
  ];

  const filteredDisciplines = activeTab === 'all'
    ? disciplines
    : disciplines.filter((d) => d.id === activeTab);

  return (
    <section id="founder" className="py-24 bg-[#09090c] relative border-t border-neutral-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Meet The Founder & Creative Director</span>
            <span aria-hidden="true">·</span>
            <span>Alpha Studio Burayu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Architect Bereket Belay
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Young visionary entrepreneur combining <strong className="text-white">Architecture</strong>, <strong className="text-white">Graphic Design</strong>, <strong className="text-white">Web Design</strong>, and <strong className="text-white">Professional Photography</strong> to redefine creative portraiture in Burayu Mariam, Ethiopia.
          </p>
        </motion.div>

        {/* Founder Feature Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: Portrait & Creative Credential Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/src/assets/images/architect_bereket_belay_1792138425691.jpg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80';
                  }}
                  alt="Architect Bereket Belay - Founder of Alpha Studio, Architect, Designer and Photographer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                {/* Corner Badges */}
                <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Award className="w-3.5 h-3.5" />
                  <span>Young Entrepreneur</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[11px] font-mono text-neutral-200 flex items-center gap-1.5">
                  <Ruler className="w-3 h-3 text-amber-400" />
                  <span>B.Sc. Architecture</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold block">
                      Founder · Creative Principal
                    </span>
                    <span className="text-[10px] bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-300">
                      Burayu Mariam
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Architect Bereket Belay
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    Architect Designer · Graphics Designer · Web Designer · Lead Photographer
                  </p>
                </div>
              </div>

              {/* Contact & Availability Bar */}
              <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Signature Shoots & Design</span>
                </div>
                <a
                  href="tel:0939390867"
                  className="font-mono text-white font-bold hover:text-red-400 transition-colors"
                >
                  0939390867
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Philosophy & Multi-Disciplinary Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Tagline */}
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-mono uppercase tracking-wider">
                Multi-Disciplinary Design Principal
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                "Where Architecture Meets Light, Geometry & Human Emotion."
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                As a young entrepreneur and practicing architectural designer, <strong className="text-white">Architect Bereket Belay</strong> founded Alpha Studio to bring structural precision and creative rigor into portrait and commercial photography.
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                While traditional studios treat light as a passive background element, Bereket treats it like an architect treats sunlight slicing through space—calculating angles, bounce surfaces, and shadows with surgical accuracy. This holistic mastery spans from <span className="text-neutral-200 font-semibold">architectural space</span> to <span className="text-neutral-200 font-semibold">digital web interfaces</span> and <span className="text-neutral-200 font-semibold">graphic identities</span>.
              </p>
            </div>

            {/* 4 Pillars Mini-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-left">
                <Compass className="w-5 h-5 text-red-500 mb-2" />
                <span className="text-xs font-bold text-white block">Architecture</span>
                <span className="text-[11px] text-neutral-400">Spatial Rigor</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-left">
                <Camera className="w-5 h-5 text-amber-400 mb-2" />
                <span className="text-xs font-bold text-white block">Photography</span>
                <span className="text-[11px] text-neutral-400">Master Portraits</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-left">
                <Palette className="w-5 h-5 text-red-400 mb-2" />
                <span className="text-xs font-bold text-white block">Graphics</span>
                <span className="text-[11px] text-neutral-400">Brand Systems</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-left">
                <Globe className="w-5 h-5 text-emerald-400 mb-2" />
                <span className="text-xs font-bold text-white block">Web Design</span>
                <span className="text-[11px] text-neutral-400">Digital UI/UX</span>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 text-xs text-neutral-300 relative">
              <Sparkles className="w-4 h-4 text-amber-400 absolute top-4 right-4" />
              <p className="italic leading-relaxed">
                “Every portrait is a piece of architecture: it needs foundation, structural balance, and intentional light. Whether we are crafting a client's Oromo cultural attire shoot or designing a modern brand, we build timeless experiences.”
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-white">— Architect Bereket Belay</span>
                <span className="text-[10px] font-mono text-neutral-400">Burayu Mariam, Ethiopia</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Signature Session with Bereket</span>
              </button>
              <a
                href="tel:0939390867"
                className="inline-flex items-center gap-2 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Direct Line: 0939390867</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Detailed Disciplines Breakdown */}
        <div className="mt-12 bg-neutral-950/80 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive Multi-Disciplinary Matrix</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Bereket Belay's Professional Creative Matrix
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'architecture', label: 'Architecture' },
                { id: 'photography', label: 'Photography' },
                { id: 'graphics', label: 'Graphic Design' },
                { id: 'web', label: 'Web Design' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDisciplines.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-red-600/40 transition-colors flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                        Core Capabilities
                      </span>
                      <div className="space-y-1.5">
                        {item.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
