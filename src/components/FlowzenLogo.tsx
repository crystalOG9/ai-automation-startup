import React from "react";

interface FlowzenLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  animated?: boolean;
  className?: string;
  title?: string;
}

export function FlowzenLogo({
  size = 36,
  animated = true,
  className = "",
  title = "Flowzen Logo",
  ...props
}: FlowzenLogoProps) {
  // Center coordinates for the gear wheel
  const gearCx = 770;
  const gearCy = 500;

  // 10-tooth complete 360-degree gear path with centered circular cutout
  const gearPath =
    "M 935.5 457.7 L 980.7 447.8 L 980.7 416.2 L 935.5 406.3 L 903.0 348.6 L 936.5 315.1 L 914.1 292.8 L 880.7 326.2 L 814.7 304.7 L 824.6 259.5 L 793.0 259.5 L 783.1 304.7 L 717.1 326.2 L 683.7 292.8 L 661.4 315.1 L 694.8 348.6 L 662.3 406.3 L 617.1 416.2 L 617.1 447.8 L 662.3 457.7 L 694.8 515.4 L 661.4 548.9 L 683.7 571.2 L 717.1 537.8 L 783.1 559.3 L 793.0 604.5 L 824.6 604.5 L 814.7 559.3 L 880.7 537.8 L 914.1 571.2 L 936.5 548.9 L 903.0 515.4 Z M 882 500 A 112 112 0 1 0 658 500 A 112 112 0 1 0 882 500 Z";

  return (
    <svg
      viewBox="0 0 1050 780"
      width={size}
      height={typeof size === "number" ? Math.round((size * 780) / 1050) : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label={title}
      role="img"
      {...props}
    >
      <title>{title}</title>
      <defs>
        {/* Gradients */}
        <linearGradient id="flowzenBlueCyan" x1="140" y1="710" x2="450" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0055FF" />
          <stop offset="50%" stopColor="#00C8FF" />
          <stop offset="100%" stopColor="#00FFA3" />
        </linearGradient>

        <linearGradient id="flowzenArrow" x1="480" y1="620" x2="880" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C8FF" />
          <stop offset="60%" stopColor="#00F5A0" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        <linearGradient id="flowzenGearGrad" x1="617" y1="260" x2="980" y2="605" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#242e3f" />
          <stop offset="45%" stopColor="#151d2a" />
          <stop offset="100%" stopColor="#090d15" />
        </linearGradient>

        <linearGradient id="flowzenGearRim" x1="650" y1="380" x2="890" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0077FE" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="flowzenTraceGrad" x1="50" y1="360" x2="330" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B4FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>

        {/* Glow & Shadows */}
        <filter id="flowzenCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="flowzenShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
        </filter>

        <style>{`
          @keyframes flowzen-gear-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .flowzen-gear-anim {
            animation: flowzen-gear-spin 10s linear infinite;
            transform-origin: ${gearCx}px ${gearCy}px;
          }
          @media (prefers-reduced-motion: reduce) {
            .flowzen-gear-anim {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* 1. ROTATING GEAR (Layered behind/with the A) */}
      <g
        className={animated ? "flowzen-gear-anim" : undefined}
        style={{ transformOrigin: `${gearCx}px ${gearCy}px` }}
      >
        {/* Outer dark metallic gear with 3D bevel & stroke */}
        <path
          d={gearPath}
          fill="url(#flowzenGearGrad)"
          stroke="#334155"
          strokeWidth="3.5"
          strokeLinejoin="round"
          fillRule="evenodd"
          filter="url(#flowzenShadow)"
        />

        {/* Glowing cyan inner accent rim */}
        <circle
          cx={gearCx}
          cy={gearCy}
          r="124"
          stroke="url(#flowzenGearRim)"
          strokeWidth="6"
          fill="none"
          filter="url(#flowzenCyanGlow)"
        />

        {/* Dark inner hub opening ring */}
        <circle
          cx={gearCx}
          cy={gearCy}
          r="110"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
      </g>

      {/* 2. STATIC FOREGROUND (A-structure, Arrow, and Circuit Traces) */}
      <g>
        {/* Left Circuit Traces & Nodes */}
        <g stroke="url(#flowzenTraceGrad)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          {/* Trace 1 (Top) */}
          <path d="M 325 240 H 230" />
          <circle cx="215" cy="240" r="14" fill="#020b18" stroke="url(#flowzenTraceGrad)" strokeWidth="8" />

          {/* Trace 2 */}
          <path d="M 285 320 H 225 L 175 370 H 145" />
          <circle cx="130" cy="370" r="14" fill="#020b18" stroke="url(#flowzenTraceGrad)" strokeWidth="8" />

          {/* Trace 3 */}
          <path d="M 245 400 H 185 L 130 455 H 90" />
          <circle cx="75" cy="455" r="14" fill="#020b18" stroke="url(#flowzenTraceGrad)" strokeWidth="8" />

          {/* Trace 4 (Bottom) */}
          <path d="M 205 480 H 155 L 95 540 H 55" />
          <circle cx="40" cy="540" r="14" fill="#020b18" stroke="url(#flowzenTraceGrad)" strokeWidth="8" />
        </g>

        {/* Stylized "A" Triangular Frame */}
        <path
          d="M 450 35 L 140 715 L 305 715 L 450 200 L 595 530 L 710 445 Z"
          fill="url(#flowzenBlueCyan)"
          filter="url(#flowzenShadow)"
        />

        {/* Dynamic Curved Upward Arrow */}
        <path
          d="M 520 625 L 565 675 C 640 595 725 450 780 300 L 745 285 L 880 120 L 865 295 L 825 280 C 785 405 700 540 520 625 Z"
          fill="url(#flowzenArrow)"
          filter="url(#flowzenShadow)"
        />

        {/* Lower arrow stem accent for 3D depth */}
        <path
          d="M 570 680 L 610 635 L 670 705 L 630 750 Z"
          fill="url(#flowzenArrow)"
          opacity="0.95"
          filter="url(#flowzenShadow)"
        />
      </g>
    </svg>
  );
}
