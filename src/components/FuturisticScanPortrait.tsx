import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Award,
  Ruler,
  Zap,
  Crosshair,
  Layers,
  Activity,
  Scan,
  Sparkles,
  Volume2,
  Maximize2
} from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';
import { Rotate3DName } from './Rotate3DName.tsx';

type ScanMode = 'lidar' | 'cyber' | 'blueprint' | 'studio';

export const FuturisticScanPortrait: React.FC = () => {
  const [scanMode, setScanMode] = useState<ScanMode>('lidar');
  const [isScanningActive, setIsScanningActive] = useState(true);
  const [isFastScan, setIsFastScan] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const [isHovered, setIsHovered] = useState(false);
  const [scanCount, setScanCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    setMousePos({ x, y });
  };

  const handleTriggerManualScan = () => {
    shutterAudio.playShutterSound();
    setIsFastScan(true);
    setScanCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFastScan(false);
    }, 1400);
  };

  const modeColors = {
    lidar: {
      accent: 'cyan',
      laserLine: 'bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#06b6d4,0_0_45px_#0891b2]',
      laserCone: 'from-cyan-500/20 via-cyan-400/5 to-transparent',
      hudBorder: 'border-cyan-500/40',
      hudText: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300',
    },
    cyber: {
      accent: 'red',
      laserLine: 'bg-red-500 shadow-[0_0_15px_#ef4444,0_0_30px_#dc2626,0_0_45px_#991b1b]',
      laserCone: 'from-red-600/20 via-red-500/5 to-transparent',
      hudBorder: 'border-red-500/40',
      hudText: 'text-red-400',
      badgeBg: 'bg-red-950/80 border-red-500/50 text-red-300',
    },
    blueprint: {
      accent: 'emerald',
      laserLine: 'bg-emerald-400 shadow-[0_0_15px_#34d399,0_0_30px_#10b981,0_0_45px_#059669]',
      laserCone: 'from-emerald-500/20 via-emerald-400/5 to-transparent',
      hudBorder: 'border-emerald-500/40',
      hudText: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300',
    },
    studio: {
      accent: 'amber',
      laserLine: 'bg-amber-400 shadow-[0_0_15px_#fbbf24,0_0_30px_#f59e0b,0_0_45px_#d97706]',
      laserCone: 'from-amber-500/15 via-amber-400/5 to-transparent',
      hudBorder: 'border-neutral-700',
      hudText: 'text-amber-400',
      badgeBg: 'bg-neutral-900/90 border-neutral-700 text-neutral-200',
    },
  };

  const currentTheme = modeColors[scanMode];

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl transition-all duration-300">
      {/* Top Futuristic Scan Telemetry Header */}
      <div className="p-3 bg-neutral-900/95 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${scanMode === 'cyber' ? 'bg-red-400' : scanMode === 'blueprint' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${scanMode === 'cyber' ? 'bg-red-500' : scanMode === 'blueprint' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
          </span>
          <span className="font-bold tracking-wider text-white flex items-center gap-1.5">
            <Scan className="w-3.5 h-3.5 text-neutral-400" />
            <span>REALISTIC 3D SCAN v4.8</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 hidden sm:inline">
            BURAYU: 9.0579°N, 38.6432°E
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTriggerManualScan}
            className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95 shadow-sm shadow-red-600/40 cursor-pointer"
            title="Fire a high-speed laser scan pass"
          >
            <Zap className="w-3 h-3" />
            <span>Trigger Scan</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-[3/4] overflow-hidden select-none cursor-crosshair"
      >
        {/* Bereket Belay Photo */}
        <img
          src="/src/assets/images/architect_bereket_belay_1792138425691.jpg"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80';
          }}
          alt="Architect Bereket Belay - Founder of Alpha Studio, Architect, Designer and Photographer"
          className={`w-full h-full object-cover object-top transition-all duration-700 ${
            scanMode === 'blueprint' ? 'hue-rotate-180 contrast-125' : ''
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Subtle Scanlines Texture Overlay */}
        <div className="absolute inset-0 scanlines-pattern pointer-events-none opacity-40" />

        {/* Realistic Laser Scanner Sweep Beam */}
        {isScanningActive && (
          <div
            className={`absolute left-0 right-0 pointer-events-none ${
              isFastScan ? 'animate-laser-sweep-fast' : 'animate-laser-sweep'
            }`}
          >
            {/* Trailing Optical Light Dispersion Sheet */}
            <div
              className={`w-full h-24 bg-gradient-to-t ${currentTheme.laserCone} pointer-events-none`}
            />

            {/* Intense Focused Laser Beam Line */}
            <div className={`w-full h-[2.5px] ${currentTheme.laserLine} relative`}>
              {/* Laser Core Bead */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] transition-all"
                style={{ left: `${mousePos.x}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                style={{ left: `${mousePos.x}%` }}
              />
            </div>
          </div>
        )}

        {/* LiDAR Spatial Wireframe & Coordinate Overlay */}
        {scanMode === 'lidar' && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        )}

        {/* Blueprint Drafting Overlay */}
        {scanMode === 'blueprint' && (
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#34d39918_1px,transparent_1px),linear-gradient(to_bottom,#34d39918_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
        )}

        {/* Corner Millimeter Calipers & Framing Brackets */}
        <div className="absolute inset-3 pointer-events-none text-[9px] font-mono text-neutral-400">
          {/* Top-Left */}
          <div className="absolute top-0 left-0 flex flex-col items-start">
            <div className={`w-4 h-4 border-t-2 border-l-2 ${currentTheme.hudBorder}`} />
            <span className="mt-0.5 text-[8px] opacity-70">00.0mm</span>
          </div>

          {/* Top-Right */}
          <div className="absolute top-0 right-0 flex flex-col items-end">
            <div className={`w-4 h-4 border-t-2 border-r-2 ${currentTheme.hudBorder}`} />
            <span className="mt-0.5 text-[8px] opacity-70">120.0mm</span>
          </div>

          {/* Bottom-Left */}
          <div className="absolute bottom-16 left-0 flex flex-col items-start">
            <span className="mb-0.5 text-[8px] opacity-70">240.0mm</span>
            <div className={`w-4 h-4 border-b-2 border-l-2 ${currentTheme.hudBorder}`} />
          </div>

          {/* Bottom-Right */}
          <div className="absolute bottom-16 right-0 flex flex-col items-end">
            <span className="mb-0.5 text-[8px] opacity-70">360.0mm</span>
            <div className={`w-4 h-4 border-b-2 border-r-2 ${currentTheme.hudBorder}`} />
          </div>
        </div>

        {/* Dynamic Interactive Cursor Reticle */}
        <div
          className="absolute pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          {/* Outer Target Crosshairs */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full border border-dashed ${currentTheme.hudBorder} animate-spin`} style={{ animationDuration: '14s' }} />
            <div className={`w-2 h-2 rounded-full ${scanMode === 'cyber' ? 'bg-red-400' : 'bg-cyan-400'} shadow-[0_0_8px_currentColor]`} />
            <div className={`absolute -top-1 w-2 h-0.5 ${scanMode === 'cyber' ? 'bg-red-400' : 'bg-cyan-400'}`} />
            <div className={`absolute -bottom-1 w-2 h-0.5 ${scanMode === 'cyber' ? 'bg-red-400' : 'bg-cyan-400'}`} />
            <div className={`absolute -left-1 h-2 w-0.5 ${scanMode === 'cyber' ? 'bg-red-400' : 'bg-cyan-400'}`} />
            <div className={`absolute -right-1 h-2 w-0.5 ${scanMode === 'cyber' ? 'bg-red-400' : 'bg-cyan-400'}`} />
          </div>

          {/* Live Position Callout Tag */}
          <div className="absolute left-10 top-0 whitespace-nowrap bg-black/85 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-[9px] font-mono shadow-xl text-neutral-300">
            <span className={`${currentTheme.hudText} font-bold`}>X:{mousePos.x}% Y:{mousePos.y}%</span>
            <span className="text-neutral-500 mx-1">|</span>
            <span>Z: {(1.2 + (mousePos.y / 200)).toFixed(2)}m</span>
          </div>
        </div>

        {/* Corner Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          <div className={`${currentTheme.badgeBg} backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold font-mono tracking-wider flex items-center gap-1.5 shadow-lg`}>
            <Activity className="w-3 h-3 animate-pulse" />
            <span className="uppercase">{scanMode} SCAN ACTIVE</span>
          </div>

          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-lg text-[9px] font-mono text-neutral-300">
            FOCAL DEPTH: 85mm f/1.4
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl text-[10px] font-mono text-neutral-200 flex items-center gap-1.5 shadow-lg">
            <Ruler className="w-3 h-3 text-amber-400" />
            <span>B.Sc. Architecture</span>
          </div>

          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-lg text-[9px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LOCK: 99.98%</span>
          </div>
        </div>

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom 3D Rotating Identity Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Rotate3DName size="card" />
        </div>
      </div>

      {/* Futuristic Scan Mode Bar & Sound Feedback */}
      <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-white font-bold hidden xs:inline">Scan Mode:</span>
        </div>

        <div className="flex items-center gap-1">
          {[
            { id: 'lidar', label: 'LiDAR Spatial' },
            { id: 'cyber', label: 'Cyber Tactical' },
            { id: 'blueprint', label: 'Draft Grid' },
            { id: 'studio', label: 'Studio Optic' },
          ].map((mode) => {
            const isActive = scanMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setScanMode(mode.id as ScanMode);
                  shutterAudio.playShutterSound();
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact & Availability Bar */}
      <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Signature Shoots & Architecture</span>
        </div>
        <a
          href="tel:0939390867"
          className="font-mono text-white font-bold hover:text-red-400 transition-colors"
        >
          0939390867
        </a>
      </div>
    </div>
  );
};
