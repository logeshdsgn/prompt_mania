import React from 'react';

/**
 * Deterministic AI Robot Avatar Generator.
 * Generates a unique, minimal, geometric futuristic AI robot SVG based on a seed string.
 * Features rounded edges, glowing eyes, clean outlines, and subtle neon accents.
 * No initials or human faces.
 */
export default function RobotAvatar({ seed = 'default', size = 40, className = '' }) {
  // Simple deterministic string hash
  const getHash = (str) => {
    let hash = 0;
    const s = String(str || 'default');
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const hash = getHash(seed);

  // Strictly Harmonized Luxury Color Schemes (British Racing Green, Liquid Brass & Obsidian)
  const colorThemes = [
    { primary: '#00E887', glow: 'rgba(0, 232, 135, 0.6)', darkBg: '#0F1620', stroke: '#00874E' }, // Racing Green
    { primary: '#D4AF37', glow: 'rgba(212, 175, 55, 0.6)', darkBg: '#18140B', stroke: '#8C701B' }, // Liquid Gold Brass
    { primary: '#00FF94', glow: 'rgba(0, 255, 148, 0.6)', darkBg: '#0C181E', stroke: '#00C875' }, // Neon Emerald Mint
    { primary: '#00E887', glow: 'rgba(0, 232, 135, 0.6)', darkBg: '#121824', stroke: '#00A35C' }, // Obsidian Racing Green
  ];

  const theme = colorThemes[hash % colorThemes.length];
  const headType = (hash >> 3) % 4;
  const eyesType = (hash >> 5) % 4;
  const antennaType = (hash >> 7) % 4;
  const mouthType = (hash >> 9) % 4;

  const filterId = `robotGlow-${hash}`;
  const gradientId = `robotGrad-${hash}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`robot-avatar-svg ${className}`}
      style={{ display: 'block', borderRadius: '50%' }}
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.darkBg} />
          <stop offset="100%" stopColor="#06070A" />
        </linearGradient>
      </defs>

      {/* ANTENNA / HEAD TOP ACCESSORY */}
      {antennaType === 0 && (
        // Central Stem Probe with Orb
        <g>
          <line x1="32" y1="16" x2="32" y2="8" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="6" r="3" fill={theme.primary} filter={`url(#${filterId})`} />
        </g>
      )}
      {antennaType === 1 && (
        // Dual Side Antennas
        <g>
          <line x1="20" y1="18" x2="15" y2="10" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="18" x2="49" y2="10" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
          <circle cx="14" cy="9" r="2" fill={theme.primary} />
          <circle cx="50" cy="9" r="2" fill={theme.primary} />
        </g>
      )}
      {antennaType === 2 && (
        // Floating Halo Arc
        <path d="M 22 10 A 12 6 0 0 1 42 10" stroke={theme.primary} strokeWidth="2" fill="none" filter={`url(#${filterId})`} />
      )}
      {antennaType === 3 && (
        // Crown Nodes
        <g>
          <rect x="28" y="10" width="8" height="4" rx="2" fill={theme.primary} />
          <line x1="32" y1="10" x2="32" y2="6" stroke={theme.primary} strokeWidth="2" />
          <circle cx="32" cy="5" r="2" fill="#FFFFFF" />
        </g>
      )}

      {/* SIDE EARS / BOLTS */}
      <rect x="11" y="27" width="4" height="10" rx="2" fill={theme.primary} opacity="0.8" />
      <rect x="49" y="27" width="4" height="10" rx="2" fill={theme.primary} opacity="0.8" />

      {/* HEAD SHAPE */}
      {headType === 0 && (
        // Rounded Square
        <rect x="15" y="16" width="34" height="32" rx="10" fill={theme.darkBg} stroke={theme.primary} strokeWidth="2" />
      )}
      {headType === 1 && (
        // Arch / Dome Head
        <path d="M 15 26 C 15 16 49 16 49 26 L 49 42 C 49 46 45 48 41 48 L 23 48 C 19 48 15 46 15 42 Z" fill={theme.darkBg} stroke={theme.primary} strokeWidth="2" />
      )}
      {headType === 2 && (
        // Chamfered Octagon
        <path d="M 22 16 L 42 16 L 49 23 L 49 41 L 42 48 L 22 48 L 15 41 L 15 23 Z" fill={theme.darkBg} stroke={theme.primary} strokeWidth="2" />
      )}
      {headType === 3 && (
        // Soft Pill Head
        <rect x="14" y="17" width="36" height="30" rx="14" fill={theme.darkBg} stroke={theme.primary} strokeWidth="2" />
      )}

      {/* EYES */}
      {eyesType === 0 && (
        // Dual Circular Glowing Neon Lenses
        <g filter={`url(#${filterId})`}>
          <circle cx="25" cy="29" r="4.5" fill={theme.primary} />
          <circle cx="39" cy="29" r="4.5" fill={theme.primary} />
          <circle cx="26" cy="28" r="1.5" fill="#FFFFFF" />
          <circle cx="40" cy="28" r="1.5" fill="#FFFFFF" />
        </g>
      )}
      {eyesType === 1 && (
        // Futuristic Visor Bar
        <g>
          <rect x="20" y="25" width="24" height="8" rx="4" fill="#04060A" stroke={theme.primary} strokeWidth="1.5" />
          <rect x="22" y="27" width="20" height="4" rx="2" fill={theme.primary} filter={`url(#${filterId})`} />
        </g>
      )}
      {eyesType === 2 && (
        // Dual Rounded Square Glasses/Lenses
        <g filter={`url(#${filterId})`}>
          <rect x="21" y="25" width="8" height="8" rx="3" fill={theme.primary} />
          <rect x="35" y="25" width="8" height="8" rx="3" fill={theme.primary} />
          <line x1="29" y1="29" x2="35" y2="29" stroke={theme.primary} strokeWidth="1.5" />
        </g>
      )}
      {eyesType === 3 && (
        // Central Cyclops Lens + Accents
        <g>
          <circle cx="32" cy="28" r="6" fill="#04060A" stroke={theme.primary} strokeWidth="1.5" />
          <circle cx="32" cy="28" r="4" fill={theme.primary} filter={`url(#${filterId})`} />
          <circle cx="33" cy="27" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* MOUTH / LOWER FACE TECH ACCENT */}
      {mouthType === 0 && (
        // Speaker Grille Lines
        <g opacity="0.8">
          <line x1="26" y1="40" x2="38" y2="40" stroke={theme.primary} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="43" x2="36" y2="43" stroke={theme.primary} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {mouthType === 1 && (
        // Glowing Digital Bar
        <rect x="25" y="40" width="14" height="3" rx="1.5" fill={theme.primary} opacity="0.9" filter={`url(#${filterId})`} />
      )}
      {mouthType === 2 && (
        // Tech Dot Grid
        <g fill={theme.primary} opacity="0.85">
          <circle cx="26" cy="41" r="1.2" />
          <circle cx="30" cy="41" r="1.2" />
          <circle cx="34" cy="41" r="1.2" />
          <circle cx="38" cy="41" r="1.2" />
        </g>
      )}
      {mouthType === 3 && (
        // Minimal Seam Notch
        <path d="M 28 41 L 32 43 L 36 41" stroke={theme.primary} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
