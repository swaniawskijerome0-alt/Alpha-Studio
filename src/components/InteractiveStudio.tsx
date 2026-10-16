import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Camera, RotateCcw, Sparkles, Sun, Moon, Flame, Users } from 'lucide-react';
import { shutterAudio } from '../utils/soundEffects.ts';

interface InteractiveStudioProps {
  triggerGlobalFlash: () => void;
  onBookSession: () => void;
}

type LightingPreset = 'crimson' | 'rembrandt' | 'golden' | 'highkey' | 'noir';

const SUBJECT_OPTIONS = [
  {
    id: 'ethiopian-traditional',
    label: 'Ethiopian Traditional Dress',
    image: '/src/assets/images/portfolio_oromo_traditional_1791912459604.jpg',
  },
  {
    id: 'male-studio',
    label: 'Studio Stool Portrait',
    image: '/src/assets/images/portfolio_male_studio_1791911974699.jpg',
  },
  {
    id: 'bw-fashion',
    label: 'Editorial Stool High Fashion',
    image: '/src/assets/images/portfolio_bw_fashion_1791911975854.jpg',
  },
  {
    id: 'graduation',
    label: 'Graduation Milestone',
    image: '/src/assets/images/portfolio_grad_over_shoulder_1791911976006.jpg',
  },
];

export const InteractiveStudio: React.FC<InteractiveStudioProps> = ({
  triggerGlobalFlash,
  onBookSession,
}) => {
  const [preset, setPreset] = useState<LightingPreset>('crimson');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_OPTIONS[0]);
  const [aperture, setAperture] = useState<number>(1.4);
  const [lightIntensity, setLightIntensity] = useState<number>(85);
  const [colorTemp, setColorTemp] = useState<number>(4500); // Kelvin
  const [flashFired, setFlashFired] = useState(false);

  const presets = [
    {
      id: 'crimson' as LightingPreset,
      name: 'Alpha Crimson Signature',
      desc: 'Our studio hallmark: dramatic key strobe with vivid red rim backlights',
      icon: Flame,
      temp: 4200,
      intensity: 90,
      aperture: 1.4,
      overlayStyle: 'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.45) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
      filter: 'contrast(1.15) brightness(0.95) saturate(1.2)',
    },
    {
      id: 'rembrandt' as LightingPreset,
      name: 'Rembrandt Dramatic',
      desc: 'Classic 45° single key softbox with soft triangular cheek fill',
      icon: Moon,
      temp: 3400,
      intensity: 75,
      aperture: 2.0,
      overlayStyle: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, transparent 50%, rgba(0, 0, 0, 0.6) 100%)',
      filter: 'contrast(1.2) brightness(0.9) sepia(0.15)',
    },
    {
      id: 'golden' as LightingPreset,
      name: 'Outdoor Golden Hour',
      desc: 'Simulating warm 5:30 PM natural Ethiopian sunset illumination',
      icon: Sun,
      temp: 3200,
      intensity: 95,
      aperture: 1.2,
      overlayStyle: 'radial-gradient(circle at 10% 10%, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
      filter: 'contrast(1.05) brightness(1.08) saturate(1.3) sepia(0.2)',
    },
    {
      id: 'highkey' as LightingPreset,
      name: 'High-Key Fashion Clean',
      desc: 'Pristine, crisp magazine-cover lighting with soft wrap-around fill',
      icon: Sparkles,
      temp: 5600,
      intensity: 100,
      aperture: 2.8,
      overlayStyle: 'linear-gradient(to top, transparent 0%, rgba(255, 255, 255, 0.1) 100%)',
      filter: 'contrast(1.05) brightness(1.15) saturate(1.05)',
    },
    {
      id: 'noir' as LightingPreset,
      name: 'Fine-Art Noir Monolith',
      desc: 'Deep blacks, silver midtones, and striking high-contrast shadows',
      icon: Moon,
      temp: 5000,
      intensity: 80,
      aperture: 1.8,
      overlayStyle: 'linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.4) 100%)',
      filter: 'grayscale(1) contrast(1.4) brightness(0.9)',
    },
  ];

  const currentPresetData = presets.find((p) => p.id === preset) || presets[0];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setPreset(p.id);
    setAperture(p.aperture);
    setLightIntensity(p.intensity);
    setColorTemp(p.temp);
  };

  const handleTestShutter = () => {
    setFlashFired(true);
    shutterAudio.playShutterSound();
    triggerGlobalFlash();
    setTimeout(() => setFlashFired(false), 300);
  };

  // Calculate dynamic visual filter
  const brightnessVal = (lightIntensity / 100) * (currentPresetData.id === 'highkey' ? 1.15 : 1.0);
  const blurVal = Math.max(0, (2.8 - aperture) * 0.8);

  return (
    <section id="interactive-studio" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Experience</span>
            <span aria-hidden="true">·</span>
            <span>Alpha Studio Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Virtual Lighting & Backdrop Simulator
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Preview how our professional strobe lights, aperture settings, and color grading change the mood of your portrait before your session at Burayu Mariam.
          </p>

          {/* Subject Switcher */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-neutral-400 mr-1 flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5 text-red-500" />
              <span>Choose Portrait Subject:</span>
            </span>
            {SUBJECT_OPTIONS.map((subj) => (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSubject.id === subj.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {subj.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Step 1: Choose Studio Lighting Setup
                </span>
                <div className="grid grid-cols-1 gap-2 mt-3">
                  {presets.map((p) => {
                    const Icon = p.icon;
                    const isActive = preset === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleApplyPreset(p)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          isActive
                            ? 'bg-red-600/15 border-red-600/80 text-white shadow-lg shadow-red-600/10'
                            : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            isActive ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white tracking-tight truncate">
                              {p.name}
                            </h4>
                            {isActive && (
                              <span className="text-[10px] font-mono text-red-400 font-bold ml-2 shrink-0">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{p.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Step 2: Optical & Strobe Fine-Tuning
                </span>

                {/* Aperture Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-300 mb-1.5 font-medium">
                    <span>Aperture Bokeh</span>
                    <span className="font-mono text-red-400 font-bold tabular-nums">f/{aperture.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.2"
                    max="5.6"
                    step="0.1"
                    value={aperture}
                    onChange={(e) => setAperture(parseFloat(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>f/1.2 (Creamy Depth)</span>
                    <span>f/5.6 (Deep Sharpness)</span>
                  </div>
                </div>

                {/* Strobe Power Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-300 mb-1.5 font-medium">
                    <span>Key Light Strobe Power</span>
                    <span className="font-mono text-red-400 font-bold tabular-nums">{lightIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="5"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(parseInt(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Color Temp Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-300 mb-1.5 font-medium">
                    <span>Color Temperature</span>
                    <span className="font-mono text-red-400 font-bold tabular-nums">{colorTemp}K</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="6500"
                    step="100"
                    value={colorTemp}
                    onChange={(e) => setColorTemp(parseInt(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reset / Actions */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
              <button
                onClick={() => handleApplyPreset(presets[0])}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={onBookSession}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all"
              >
                Book This Look
              </button>
            </div>
          </motion.div>

          {/* Live Studio Monitor / Viewport */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-black shadow-2xl h-full flex flex-col">
              {/* Studio Camera Viewfinder Frame */}
              <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] overflow-hidden flex items-center justify-center">
                {/* Background Photo with dynamic styles */}
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    filter: `${currentPresetData.filter} blur(${blurVal}px) brightness(${brightnessVal})`,
                  }}
                >
                  <img
                    src={selectedSubject.image}
                    alt={selectedSubject.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Dynamic Lighting Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{ background: currentPresetData.overlayStyle }}
                />

                {/* Viewfinder Grid Crosshairs */}
                <div className="absolute inset-0 pointer-events-none border border-white/10 m-6 rounded-2xl flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start text-[11px] font-mono text-white/80 drop-shadow">
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                      ALPHA-CAM 01 · BURAYU
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur text-red-400 font-bold">
                      RAW 8K
                    </span>
                  </div>

                  {/* Center autofocus reticle */}
                  <div className="self-center flex items-center justify-center w-14 h-14 border border-white/30 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  </div>

                  {/* Bottom Viewfinder Telemetry */}
                  <div className="flex justify-between items-end text-[11px] font-mono text-white/90 drop-shadow">
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                      1/250s · f/{aperture.toFixed(1)} · ISO 100
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur text-amber-300">
                      {colorTemp}K
                    </span>
                  </div>
                </div>

                {/* Authentic Alpha Studio watermark in monitor */}
                <div className="absolute bottom-10 right-10 bg-black/70 backdrop-blur px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5 pointer-events-none">
                  <span className="text-[10px] font-bold text-white tracking-widest font-sans">
                    ALPHA STUDIO
                  </span>
                  <span className="text-[9px] font-mono text-red-400">0939390867</span>
                </div>

                {/* Flash fired visual overlay */}
                {flashFired && (
                  <div className="absolute inset-0 bg-white opacity-95 transition-opacity duration-200 pointer-events-none" />
                )}
              </div>

              {/* Bottom Control Strip */}
              <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-neutral-300">
                  <span className="font-bold text-white block">Preset: {currentPresetData.name}</span>
                  <span className="text-neutral-500 text-[11px]">Subject: {selectedSubject.label}</span>
                </div>

                <button
                  onClick={handleTestShutter}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>Test Shutter & Flash</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
