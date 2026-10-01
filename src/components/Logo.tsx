import { Link } from 'react-router-dom';

function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="compario-cutout">
          <rect width="100" height="100" fill="white" />
          <path d="M 15 70 L 40 45 L 55 60 L 75 40" stroke="black" strokeWidth="20" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
          <polygon points="65,30 90,25 85,50" fill="black" stroke="black" strokeWidth="8" strokeLinejoin="round" />
        </mask>
      </defs>

      {/* The masked circle */}
      <circle cx="50" cy="50" r="46" fill="currentColor" mask="url(#compario-cutout)" />

      {/* The solid arrow overlay */}
      <path d="M 15 70 L 40 45 L 55 60 L 75 40" stroke="currentColor" strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <polygon points="65,30 90,25 85,50" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ className = '', iconClassName = "h-7 w-7", textClassName = "text-[22px]" }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 text-[#0f172a] transition-opacity hover:opacity-90 ${className}`}>
      <LogoIcon className={iconClassName} />
      <span className={`${textClassName} font-bold tracking-[0.02em]`} style={{ fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif" }}>
        COMPARIO
      </span>
    </Link>
  );
}
