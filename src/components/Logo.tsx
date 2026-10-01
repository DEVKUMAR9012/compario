import { Link } from 'react-router-dom';

function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.9) translate(5.5, 5.5)">
        <defs>
          <mask id="compario-cutout">
            <rect x="-20" y="-20" width="140" height="140" fill="white" />
            <path 
              d="M 14.5 77.5 L 45 47 L 58 60 L 83 35" 
              stroke="black" 
              strokeWidth="24" 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              fill="none" 
            />
            <polygon 
              points="70,22 98,20 96,48" 
              fill="black" 
              stroke="black" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
          </mask>
        </defs>

        {/* 1. Base Circle (Masked) */}
        <circle cx="50" cy="50" r="45" fill="currentColor" mask="url(#compario-cutout)" />

        {/* 2. Solid Arrow Line */}
        <path 
          d="M 14.5 77.5 L 45 47 L 58 60 L 83 35" 
          stroke="currentColor" 
          strokeWidth="18" 
          strokeLinecap="square" 
          strokeLinejoin="miter" 
          fill="none" 
        />

        {/* 3. Solid Arrowhead */}
        <polygon points="70,22 98,20 96,48" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function Logo({ 
  className = '', 
  iconClassName = "h-8 w-8", 
  textClassName = "text-[26px]" 
}: { 
  className?: string, 
  iconClassName?: string, 
  textClassName?: string 
}) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-3 text-[#0B132B] transition-opacity hover:opacity-90 ${className}`}>
      <LogoIcon className={iconClassName} />
      <span 
        className={`${textClassName} font-extrabold tracking-tight uppercase`} 
        style={{ fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif" }}
      >
        COMPARIO
      </span>
    </Link>
  );
}