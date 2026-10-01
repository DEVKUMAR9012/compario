import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', iconClassName = "h-7 w-7", textClassName = "text-[22px]" }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90 ${className}`}>
      <BarChart3 className={`${iconClassName} stroke-[2.5] text-[#0f172a]`} />
      <span className={`${textClassName} font-bold tracking-[0.02em] text-[#0f172a]`} style={{ fontFamily: "'Inter', 'Montserrat', system-ui, sans-serif" }}>
        COMPARIO
      </span>
    </Link>
  );
}
