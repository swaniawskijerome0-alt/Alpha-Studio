import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Compass, Eye, RefreshCw } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

interface Rotate3DNameProps {
  className?: string;
  size?: 'large' | 'card';
  showSubtitle?: boolean;
}

export const Rotate3DName: React.FC<Rotate3DNameProps> = ({
  className = '',
  size = 'large',
  showSubtitle = true,
}) => {
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [prismIndex, setPrismIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics for 3D rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-24, 24]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [18, -18]);
  const translateZ = useTransform(smoothMouseX, [-0.5, 0, 0.5], [15, 30, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const titles = [
    {
      en: 'Architect Bereket Belay',
      am: 'አርክቴክት በረከት በላይ',
      role: 'Founder · Creative Director',
      spec: 'Architecture · Photography · UI/UX',
    },
    {
      en: 'Bereket Belay, Architect',
      am: 'የአልፋ ስቱዲዮ መስራች',
      role: 'Spatial Designer & Lead Optic Artist',
      spec: 'Structural Light · Golden Proportions',
    },
  ];

  const current = titles[prismIndex % titles.length];

  const handleCyclePrism = (e: React.MouseEvent) => {
    e.stopPropagation();
    shutterAudio.playShutterSound();
    setPrismIndex((prev) => prev + 1);
  };

  if (size === 'card') {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative perspective-1000 select-none group/name ${className}`}
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`relative transition-transform duration-100 ${
            isAutoOrbit ? 'animate-orbit-3d' : ''
          }`}
        >
          <div className="flex items-center gap-2 mb-1" style={{ transform: 'translateZ(18px)' }}>
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold block">
              Founder · Creative Principal
            </span>
            <span className="text-[10px] bg-red-950/80 border border-red-500/30 px-1.5 py-0.5 rounded text-red-200">
              3D PERSPECTIVE
            </span>
          </div>

          <h3
            className="text-2xl sm:text-3xl font-black text-white tracking-tight text-3d-architect"
            style={{ transform: 'translateZ(28px)' }}
          >
            {current.en}
          </h3>

          <p
            className="text-[11px] font-mono text-neutral-300 mt-1 flex items-center gap-2"
            style={{ transform: 'translateZ(14px)' }}
          >
            <span className="text-red-400">{current.am}</span>
            <span className="text-neutral-500">·</span>
            <span>Burayu Mariam</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        className={`relative inline-block ${isAutoOrbit ? 'animate-orbit-3d' : ''}`}
      >
        {/* Holographic glowing 3D plane backdrop */}
        <div
          className="absolute -inset-4 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-cyan-500/10 rounded-2xl blur-xl -z-10 opacity-70 pointer-events-none"
          style={{ transform: 'translateZ(-20px)' }}
        />

        {/* 3D Dimension Tag */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-red-500/30 shadow-lg text-xs font-mono mb-3 text-red-400"
          style={{ transform: 'translateZ(35px)' }}
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="tracking-widest uppercase font-bold">3D Rotational Architectural Identity</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main 3D Title */}
        <div style={{ transformStyle: 'preserve-3d' }}>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none text-3d-architect cursor-grab active:cursor-grabbing"
            style={{
              transform: 'translateZ(45px)',
            }}
          >
            <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              {current.en}
            </span>
          </h2>

          {/* Amharic Script with 3D Depth Layer */}
          <div
            className="mt-2 text-lg sm:text-xl font-bold text-red-400/90 tracking-wide font-mono flex items-center justify-center gap-2"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span>{current.am}</span>
            <span className="text-neutral-500 text-xs">·</span>
            <span className="text-xs uppercase font-sans text-neutral-400 tracking-wider">
              {current.role}
            </span>
          </div>
        </div>

        {showSubtitle && (
          <p
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto"
            style={{ transform: 'translateZ(20px)' }}
          >
            Young visionary entrepreneur combining <strong className="text-white">Architecture</strong>,{' '}
            <strong className="text-white">Graphic Design</strong>,{' '}
            <strong className="text-white">Web Design</strong>, and{' '}
            <strong className="text-white">Professional Photography</strong> to redefine creative portraiture in Burayu Mariam, Ethiopia.
          </p>
        )}

        {/* Interactive 3D Rotation Controls */}
        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs"
          style={{ transform: 'translateZ(40px)' }}
        >
          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className={`px-3 py-1.5 rounded-xl border font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoOrbit
                ? 'bg-red-600/20 border-red-500/50 text-red-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Continuous 3D Orbiting Motion"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoOrbit ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>3D Auto Orbit: {isAutoOrbit ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleCyclePrism}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Cycle 3D Identity Matrix"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Flip 3D Face ({prismIndex % 2 + 1}/2)</span>
          </button>

          <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>Tilt cursor to rotate 3D angles</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};
