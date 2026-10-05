import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = false,
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', sub: 'text-[10px]' },
    md: { icon: 44, text: 'text-xl', sub: 'text-xs' },
    lg: { icon: 56, text: 'text-2xl', sub: 'text-sm' },
    xl: { icon: 72, text: 'text-3xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon matching the 7 Clean Emblem from Facebook Cover */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform hover:scale-105 duration-300"
        >
          {/* Subtle Outer Glow Circle */}
          <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="3 3" />
          
          {/* Stylized House Roof & '7' Emblem */}
          <path
            d="M 24 38 L 48 18 L 74 18 L 46 82 L 32 82 L 56 38 Z"
            fill="url(#blueGradient)"
          />

          {/* Roof Ridge & Window on top of the 7 */}
          <polygon points="48,16 58,8 70,8 74,18 48,18" fill="#0369A1" />
          <rect x="54" y="22" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
          <rect x="62" y="22" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />

          {/* Cleaning Brush / Broom sweep */}
          <g transform="translate(36, 50) rotate(-22)">
            <rect x="0" y="0" width="4" height="24" rx="2" fill="#0284C7" />
            <path
              d="M -6 18 L 10 18 L 12 28 L -8 28 Z"
              fill="#38BDF8"
            />
            {/* Broom bristle cuts */}
            <line x1="-3" y1="21" x2="-3" y2="28" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="1" y1="21" x2="1" y2="28" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="5" y1="21" x2="5" y2="28" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="9" y1="21" x2="9" y2="28" stroke="#FFFFFF" strokeWidth="1" />
          </g>

          {/* Fresh Clean Bubbles */}
          <circle cx="28" cy="46" r="4.5" fill="#38BDF8" opacity="0.85" />
          <circle cx="26" cy="44.5" r="1.5" fill="#FFFFFF" />

          <circle cx="22" cy="58" r="3" fill="#0EA5E9" opacity="0.8" />
          <circle cx="21" cy="57" r="1" fill="#FFFFFF" />

          <circle cx="34" cy="74" r="5" fill="#0284C7" opacity="0.85" />
          <circle cx="32" cy="72" r="1.5" fill="#FFFFFF" />

          <circle cx="72" cy="42" r="3.5" fill="#38BDF8" opacity="0.75" />

          {/* Clean Sparkle Star */}
          <path
            d="M 68 28 Q 68 33 73 33 Q 68 33 68 38 Q 68 33 63 33 Q 68 33 68 28 Z"
            fill="#38BDF8"
          />
          <path
            d="M 30 26 Q 30 29 33 29 Q 30 29 30 32 Q 30 29 27 29 Q 30 29 30 26 Z"
            fill="#0EA5E9"
          />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="blueGradient" x1="20" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="0.55" stopColor="#0369A1" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <span
            className={`font-black tracking-tight ${currentSize.text} ${
              light ? 'text-white' : 'text-slate-900'
            }`}
          >
            سفن كلين
          </span>
          <span
            className={`font-extrabold tracking-wider font-mono ${currentSize.sub} ${
              light ? 'text-sky-300' : 'text-sky-600'
            }`}
          >
            7 CLEAN
          </span>
        </div>
      )}
    </div>
  );
};
