import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Calendar, Phone, Sparkles, MapPin, Eye, Zap, Crosshair, Send } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';
import { ApertureIris } from './ApertureIris.tsx';

interface HeroProps {
  onBookClick: () => void;
  onExploreGallery: () => void;
  triggerGlobalFlash: () => void;
  onOpenLiveCamera: () => void;
}

type HeroLightingMode = 'crimson' | 'golden' | 'noir' | 'editorial';

interface LightingConfig {
  name: string;
  shortLabel: string;
  aperture: number;
  filter: string;
  overlay: string;
  telemetry: string;
}

const LIGHTING_MODES: Record<HeroLightingMode, LightingConfig> = {
  crimson: {
    name: 'Alpha Crimson Strobe',
    shortLabel: 'Studio Strobe',
    aperture: 1.4,
    filter: 'contrast(1.12) brightness(1.02) saturate(1.15)',
    overlay: 'radial-gradient(circle at 75% 25%, rgba(220, 38, 38, 0.38) 0%, transparent 60%)',
    telemetry: '85mm · f/1.4 · 1/250s · ISO 100',
  },
  golden: {
    name: 'Natural Golden Hour',
    shortLabel: 'Golden Hour',
    aperture: 1.2,
    filter: 'contrast(1.06) brightness(1.1) saturate(1.25) sepia(0.18)',
    overlay: 'radial-gradient(circle at 20% 15%, rgba(245, 158, 11, 0.42) 0%, transparent 65%)',
    telemetry: '50mm · f/1.2 · 1/1600s · ISO 50',
  },
  noir: {
    name: 'Monochrome Editorial Noir',
    shortLabel: 'Noir Black & White',
    aperture: 2.0,
    filter: 'grayscale(1) contrast(1.35) brightness(0.96)',
    overlay: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%)',
    telemetry: '85mm · f/2.0 · 1/500s · ISO 200',
  },
  editorial: {
    name: 'High-Key Fashion Clean',
    shortLabel: 'High Fashion',
    aperture: 2.8,
    filter: 'contrast(1.08) brightness(1.16) saturate(1.05)',
    overlay: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 75%)',
    telemetry: '70mm · f/2.8 · 1/320s · ISO 100',
  },
};

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreGallery,
  triggerGlobalFlash,
  onOpenLiveCamera,
}) => {
  const [shutterCount, setShutterCount] = useState(1);
  const [isSnapping, setIsSnapping] = useState(false);
  const [activeMode, setActiveMode] = useState<HeroLightingMode>('crimson');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentage
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [heroImageSrc, setHeroImageSrc] = useState(
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=85'
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHeroImageError = () => {
    if (heroImageSrc.includes('photo-1531746020798')) {
      setHeroImageSrc(
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85'
      );
    } else if (heroImageSrc.includes('photo-1534528741775')) {
      setHeroImageSrc(
        'https://placehold.co/1200x800/18181b/ef4444?text=Alpha+Studio+Burayu+Portrait'
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation (-4deg to +4deg)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -normY * 7,
      rotateY: normX * 7,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const handleShutterClick = () => {
    setIsSnapping(true);
    shutterAudio.playShutterSound();
    triggerGlobalFlash();
    setShutterCount((prev) => prev + 1);
    setTimeout(() => setIsSnapping(false), 380);
  };

  const handleModeChange = (mode: HeroLightingMode) => {
    setActiveMode(mode);
    shutterAudio.playShutterSound();
  };

  const currentConfig = LIGHTING_MODES[activeMode];

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0e0e11] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Creative Ambient Floating Bokeh Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-float-bokeh-1" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none animate-float-bokeh-2" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float-bokeh-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            {/* Clean Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 ml-1" />
              <span>Burayu Mariam</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Premier Portrait Studio</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Indoor & Outdoor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Stunning Portraits That Capture Your{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">
                Purest Essence.
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-amber-500 opacity-40 rounded-full" />
              </span>
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Welcome to <span className="text-white font-semibold">Alpha Studio</span> in Burayu Mariam.
              We blend dramatic indoor studio strobe lighting with radiant natural outdoor golden hours
              to craft timeless, heirloom portraits.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-xl shadow-red-600/30 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 transition-transform group-hover:rotate-6" />
                <span>Book a Portrait Session</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenLiveCamera}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-red-950/60 hover:bg-red-900/60 border border-red-600/60 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer group"
              >
                <Camera className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                <span>Live Camera Snap & Send</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, borderColor: 'rgba(239, 68, 68, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 rounded-xl transition-all hover:text-white cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
                <span>View Portfolio</span>
              </motion.button>
            </div>

            {/* Direct Telephone & Telegram Contact Box */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:0939390867"
                className="inline-flex items-center gap-3 py-2 px-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-red-600/50 text-xs text-neutral-300 hover:text-white transition-all group"
              >
                <span className="p-1.5 rounded-md bg-red-600/10 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
                    Direct Studio Line
                  </span>
                  <span className="text-sm font-bold tracking-wider text-white font-mono">
                    0939390867
                  </span>
                </div>
              </a>

              {/* Direct Telegram link @Gmichael_1 */}
              <a
                href="https://t.me/Gmichael_1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 py-2 px-3.5 rounded-lg bg-[#229ED9]/15 border border-[#229ED9]/40 hover:border-[#229ED9] text-xs text-[#64B5F6] hover:text-white transition-all group"
                title="Direct Telegram Chat: @Gmichael_1"
              >
                <span className="p-1.5 rounded-md bg-[#229ED9]/20 text-[#64B5F6] group-hover:bg-[#229ED9] group-hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
                    Telegram Direct
                  </span>
                  <span className="text-sm font-bold tracking-wider text-white font-mono">
                    @Gmichael_1
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-neutral-400 pl-2 border-l border-neutral-800">
                <span className="text-neutral-500">Open Daily</span>
                <span className="font-semibold text-neutral-200">8:30 AM – 8:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Viewfinder Visual with Autofocus Tracking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
            style={{ perspective: 1000 }}
          >
            {/* Interactive Lighting Preset Switcher Ribbon */}
            <div className="flex items-center justify-between gap-1 mb-3 px-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-neutral-400">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Lighting Mode:</span>
              </div>

              <div className="flex items-center gap-1.5">
                {(Object.keys(LIGHTING_MODES) as HeroLightingMode[]).map((modeKey) => {
                  const isCurrent = activeMode === modeKey;
                  return (
                    <button
                      key={modeKey}
                      onClick={() => handleModeChange(modeKey)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                          : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80'
                      }`}
                    >
                      {LIGHTING_MODES[modeKey].shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Tilt Viewfinder Container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered
                  ? 'transform 0.1s ease-out'
                  : 'transform 0.5s ease-out',
              }}
              className="relative group rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-950 shadow-2xl transition-shadow duration-500 hover:shadow-red-950/20"
            >
              {/* Media image container */}
              <div className="relative aspect-[16/11] overflow-hidden select-none">
                <img
                  src={heroImageSrc}
                  onError={handleHeroImageError}
                  alt="Alpha Studio professional portrait session in Burayu Mariam"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                  style={{
                    filter: currentConfig.filter,
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Dynamic Lighting Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{ background: currentConfig.overlay }}
                />

                {/* Subtle base vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Sheen light sweep on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheen" />
                </div>

                {/* Camera Viewfinder Overlay: Optical Framing Grid */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  {/* Top Bar Telemetry */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-white tracking-wider">ALPHA-CAM 01</span>
                      <span className="text-neutral-500">|</span>
                      <span className="text-red-400 font-semibold">{currentConfig.name}</span>
                    </div>

                    {/* Interactive Rotating Lens Aperture Badge */}
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-neutral-300">
                      <ApertureIris
                        fStop={currentConfig.aperture}
                        size={18}
                        isSnapping={isSnapping}
                      />
                      <span className="text-white font-mono text-xs font-semibold">
                        f/{currentConfig.aperture.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Corner Viewfinder Crop Brackets */}
                  <div className="absolute inset-6 pointer-events-none">
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40" />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40" />

                    {/* Subtle Rule-of-Thirds Grid Lines (fades in on hover) */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        isHovered ? 'opacity-30' : 'opacity-10'
                      }`}
                    >
                      <div className="w-full h-1/3 border-b border-white/20" />
                      <div className="w-full h-1/3 border-b border-white/20" />
                      <div className="absolute top-0 left-1/3 h-full border-r border-white/20" />
                      <div className="absolute top-0 right-1/3 h-full border-r border-white/20" />
                    </div>
                  </div>

                  {/* Dynamic Cursor-Tracking Autofocus Reticle */}
                  {isHovered && (
                    <div
                      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out animate-focus-lock"
                      style={{
                        left: `${mousePos.x}%`,
                        top: `${mousePos.y}%`,
                      }}
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Autofocus Bracket Corner Marks */}
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500" />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500" />
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500" />
                        <Crosshair className="w-3.5 h-3.5 text-red-500/80 animate-pulse" />
                        <div className="absolute -bottom-4 text-[9px] font-mono text-red-400 font-bold tracking-widest whitespace-nowrap bg-black/80 px-1 py-0.2 rounded">
                          AF-C: LOCKED
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expanding Optical Flash Wave Animation on Snap */}
                  {isSnapping && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-40 h-40 rounded-full bg-white animate-flash-wave border border-red-400" />
                    </div>
                  )}

                  {/* Bottom Viewfinder HUD Strip */}
                  <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-auto">
                    <div className="bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-left">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-red-400" />
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-red-400">
                          {currentConfig.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-300">
                        {currentConfig.telemetry}
                      </span>
                    </div>

                    {/* Interactive Shutter & DB Snap Buttons */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={onOpenLiveCamera}
                        title="Touch to directly capture your photo & send to studio database"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-red-950/80 hover:bg-red-900 text-white border border-red-500/60 hover:border-red-400 transition-all shadow-lg cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-red-400" />
                        <span className="hidden sm:inline">Snap to DB</span>
                        <span className="sm:hidden">Snap</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={handleShutterClick}
                        title="Click to trigger camera shutter"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                          isSnapping
                            ? 'bg-white text-black scale-95 shadow-white/50'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5 animate-pulse" />
                        <span>Shutter (#{shutterCount})</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Metrics Row below the Hero Split */}
        <div className="mt-16 pt-8 border-t border-neutral-900 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              0939390867
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Burayu Mariam Hotline
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-red-500 tracking-tight tabular-nums">
              Indoor & Outdoor
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Dual Studio Specialties
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              8K Master
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Ultra High-Resolution Optics
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight tabular-nums">
              100% Bespoke
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Editorial Color Grading
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
