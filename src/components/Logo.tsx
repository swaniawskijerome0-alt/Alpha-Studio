import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark'; // dark: on dark bg (white alpha text); light: on white bg
  showPhone?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showPhone = true,
}) => {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#0F0F10';
  const redColor = '#DC2626';

  const scaleMap = {
    sm: 'h-9',
    md: 'h-13',
    lg: 'h-18',
    xl: 'h-24',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${scaleMap[size]} w-auto transition-transform duration-300 hover:scale-[1.02]`}
        aria-label="Alpha Studio Logo"
      >
        {/* Left Side: ALPHA STUDIO typography */}
        <g>
          {/* Main "ALPHA" Wordmark */}
          <text
            x="10"
            y="98"
            fill={textColor}
            fontFamily="'Playfair Display', 'Times New Roman', Georgia, serif"
            fontWeight="900"
            fontSize="88"
            letterSpacing="-2"
          >
            ALPHA
          </text>

          {/* Red "STUDIO" Wordmark */}
          <text
            x="125"
            y="142"
            fill={redColor}
            fontFamily="'Outfit', 'Impact', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="48"
            letterSpacing="2.5"
          >
            STUDIO
          </text>

          {/* Phone Number "0939390867" */}
          {showPhone && (
            <text
              x="128"
              y="172"
              fill={textColor}
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="700"
              fontSize="23"
              letterSpacing="3"
            >
              0939390867
            </text>
          )}
        </g>

        {/* Right Side: Iconic Camera Outline with Aperture Shutter */}
        <g transform="translate(350, 8)">
          {/* Camera Body Contour in Red */}
          <path
            d="M 52 38 
               C 56 22, 65 10, 82 10 
               L 115 10 
               C 125 10, 134 18, 140 28 
               L 146 38 
               C 152 40, 175 42, 175 56 
               L 175 142 
               C 175 152, 166 158, 155 158 
               L 12 158 
               C 35 156, 52 148, 52 148 
               M 52 38 
               L 20 62"
            stroke={redColor}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Camera Viewfinder / Hotshoe Top Accent */}
          <rect
            x="85"
            y="2"
            width="28"
            height="8"
            rx="2"
            fill={redColor}
          />

          {/* Camera Lens Outer Ring */}
          <circle
            cx="98"
            cy="102"
            r="45"
            fill="#0F0F10"
            stroke="#18181B"
            strokeWidth="4"
          />

          {/* Camera Lens White/Silver Bezel */}
          <circle
            cx="98"
            cy="102"
            r="38"
            fill="#000000"
            stroke={variant === 'dark' ? '#27272A' : '#E4E4E7'}
            strokeWidth="3"
          />

          {/* Aperture Shutter Blades in Red (Iconic multi-blade iris from logo) */}
          <g transform="translate(98, 102)">
            {/* 6 Triangular Shutter Blades with slight rotation */}
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d="M 0 -6 L 25 -25 L 29 -10 Z"
                  fill={redColor}
                  className="transition-transform duration-500 origin-center"
                />
                <circle cx="0" cy="0" r="8" fill="#18181B" />
              </g>
            ))}
            {/* Center aperture pupil */}
            <circle cx="0" cy="0" r="7" fill="#0A0A0A" />
            <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
};
