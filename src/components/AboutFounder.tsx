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
import { shutterAudio } from '../utils/soundEffects.ts';
import { Rotate3DName } from './Rotate3DName.tsx';
import { FuturisticScanPortrait } from './FuturisticScanPortrait.tsx';

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
        {/* Section Header with 3D Rotate Style Identity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Meet The Founder & Creative Director</span>
            <span aria-hidden="true">·</span>
            <span>Alpha Studio Burayu</span>
          </div>

          {/* 3D Rotate Style Name */}
          <Rotate3DName size="large" />
        </motion.div>

        {/* Founder Feature Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: Realistic Futuristic Scan Portrait & 3D Rotating Identity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <FuturisticScanPortrait />
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
                <span className="font-bold text-white tracking-wide text-3d-architect inline-flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
                  <Compass className="w-3.5 h-3.5 text-red-500 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>— Architect Bereket Belay</span>
                </span>
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

            {/* Filter buttons with Animated Gliding Pill */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'architecture', label: 'Architecture' },
                { id: 'photography', label: 'Photography' },
                { id: 'graphics', label: 'Graphic Design' },
                { id: 'web', label: 'Web Design' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as typeof activeTab);
                      shutterAudio.playShutterSound();
                    }}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="founderTabPill"
                        className="absolute inset-0 bg-red-600 rounded-lg shadow-sm shadow-red-600/30 -z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
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
