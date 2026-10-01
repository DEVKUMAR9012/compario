import { Link } from 'react-router-dom';

function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-2 -2 104 104" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="compario-cutout">
          <rect x="-10" y="-10" width="120" height="120" fill="white" />
          <path d="M 12.5 74.5 L 45 42 L 60 57 L 85 32" stroke="black" strokeWidth="22" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
          <polygon points="74,21 100,17 96,43" fill="black" stroke="black" strokeWidth="8" strokeLinejoin="round" />
        </mask>
      </defs>

      {/* The masked circle */}
      <circle cx="50" cy="50" r="45" fill="currentColor" mask="url(#compario-cutout)" />

      {/* The solid arrow overlay */}
      <path d="M 12.5 74.5 L 45 42 L 60 57 L 85 32" stroke="currentColor" strokeWidth="14" strokeLinecap="butt" strokeLinejoin="miter" fill="none" />
      <polygon points="74,21 100,17 96,43" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ className = '', iconClassName = "h-7 w-7", textClassName = "text-[22px]" }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 text-[#0f172a] transition-opacity hover:opacity-90 ${className}`}>
      <LogoIcon className={iconClassName} />
      <span className={`${textClassName} font-extrabold tracking-[0.03em]`} style={{ fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif" }}>
        COMPARIO
      </span>
    </Link>
  );
}
