import React from 'react';

interface ApertureIrisProps {
  fStop?: number; // e.g. 1.2 to 16
  size?: number; // size in px
  className?: string;
  isSnapping?: boolean;
}

export const ApertureIris: React.FC<ApertureIrisProps> = ({
  fStop = 1.4,
  size = 48,
  className = '',
  isSnapping = false,
}) => {
  // Normalize aperture opening between 0.2 (closed f/16) and 0.85 (wide open f/1.2)
  // Lower fStop = bigger opening
  const clampedF = Math.max(1.2, Math.min(16, fStop));
  const normalized = 1 - (clampedF - 1.2) / (16 - 1.2);
  const openingRadius = isSnapping ? 6 : 14 + normalized * 18; // px in 100x100 viewBox
  const rotationAngle = (1 - normalized) * 45 + (isSnapping ? 90 : 0);

  // 8 aperture blade coordinates for realistic polygon iris
  const bladeCount = 8;
  const blades = Array.from({ length: bladeCount }).map((_, i) => {
    const angle = (i * 360) / bladeCount;
    return angle;
  });

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transform transition-transform duration-500 ease-out"
        style={{
          transform: `rotate(${rotationAngle}deg)`,
        }}
      >
        {/* Outer Lens Barrel Ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2.5"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="rgba(220, 38, 38, 0.4)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Dynamic Iris Blades */}
        <g className="transition-all duration-300">
          {blades.map((bladeAngle, index) => (
            <path
              key={index}
              d={`M 50 50 L ${50 + Math.cos((bladeAngle * Math.PI) / 180) * 44} ${
                50 + Math.sin((bladeAngle * Math.PI) / 180) * 44
              } A 44 44 0 0 1 ${
                50 + Math.cos(((bladeAngle + 45) * Math.PI) / 180) * 44
              } ${50 + Math.sin(((bladeAngle + 45) * Math.PI) / 180) * 44} Z`}
              fill={index % 2 === 0 ? '#18181b' : '#27272a'}
              stroke="#0a0a0a"
              strokeWidth="1"
              transform={`rotate(${bladeAngle + (1 - normalized) * 20} 50 50)`}
              className="transition-transform duration-300"
            />
          ))}
        </g>

        {/* Central Aperture Hole (Light Intake) */}
        <circle
          cx="50"
          cy="50"
          r={openingRadius}
          fill="rgba(220, 38, 38, 0.25)"
          className="transition-all duration-300 ease-out"
        />
        <circle
          cx="50"
          cy="50"
          r={Math.max(2, openingRadius - 3)}
          fill="#09090b"
          className="transition-all duration-300 ease-out"
        />
        <circle
          cx="50"
          cy="50"
          r={openingRadius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          className="transition-all duration-300 ease-out"
        />

        {/* Optical Glass Glint */}
        <path
          d="M 35 25 Q 50 35 65 25"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
