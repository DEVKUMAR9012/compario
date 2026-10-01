import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Check, Eye, EyeOff, Heart, Loader2, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════════════ */
type Focus = 'none' | 'email' | 'password';
type Phase = 'idle' | 'loading';

// Logical canvas for the price network. Everything is positioned as an
// offset from the hub (the canvas centre) and the whole thing is scaled
// to fit the viewport.
const CW = 760;
const CH = 640;
const CX = CW / 2;
const CY = CH / 2;

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const POS_T = { duration: 0.8, ease: EASE };
const PANEL_T = { duration: 0.85, ease: EASE };

const DISPLAY = "'Jost', 'Inter', system-ui, sans-serif";
const BODY = "'Inter', system-ui, sans-serif";
const PANEL_BG = '#f0f2f5'; // right panel — the floating input labels reuse it

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ═══════════════════════════════════════════════════════════════════════
   NETWORK DATA
═══════════════════════════════════════════════════════════════════════ */
type ArtKey = 'phone' | 'phone2' | 'tablet' | 'tv' | 'watch' | 'laptop' | 'console' | 'earbuds' | 'pen';
type StoreKey = 'amazon' | 'flipkart' | 'croma';
type Kind = 'reliance' | 'store' | 'seller' | 'product' | 'bare' | 'ghost';
type Tone = 'green' | 'orange' | 'blue';

interface NodeDef {
  id: string;
  kind: Kind;
  /** offset from hub centre */
  x: number;
  y: number;
  /** 0.35 (far, blurred) → 1.3 (near, crisp). Drives parallax, blur, z-order */
  depth: number;
  w: number;
  store?: StoreKey;
  price?: string;
  stars?: number;
  chips?: { t: string; tone: Tone }[];
  chart?: boolean;
  mini?: boolean;
  art?: ArtKey;
  heart?: boolean;
  note?: string;
  // float animation (filled in by seed())
  dur: number;
  delay: number;
  amt: number;
}

type NodeSeed = Omit<NodeDef, 'dur' | 'delay' | 'amt'>;

const seed = (list: NodeSeed[]): NodeDef[] =>
  list.map((n, i) => ({
    ...n,
    dur: 2.6 + ((i * 37) % 12) / 10,
    delay: (i * 0.37) % 1.6,
    amt: Math.round(4 + n.depth * 5),
  }));

const NODES: NodeDef[] = seed([
  /* ── Front layer ── */
  { id: 'reliance', kind: 'reliance', x: 96, y: -14, depth: 1.3, w: 146, price: '₹61,999' },
  {
    id: 'amazon', kind: 'store', store: 'amazon', x: -140, y: -126, depth: 1.1, w: 104,
    price: '₹64,999',
    chips: [{ t: '₹1,000 off', tone: 'orange' }, { t: 'Free delivery', tone: 'green' }],
  },
  {
    id: 'flipkart-chart', kind: 'store', store: 'flipkart', x: 128, y: -160, depth: 1.0, w: 88,
    chart: true, stars: 4, chips: [{ t: '↓ 4.2%', tone: 'green' }],
  },
  {
    id: 'croma', kind: 'store', store: 'croma', x: 228, y: -92, depth: 1.05, w: 92,
    price: '₹63,999', stars: 4, chips: [{ t: 'In stock', tone: 'green' }],
  },
  {
    id: 'flipkart', kind: 'store', store: 'flipkart', x: -156, y: 4, depth: 1.15, w: 98,
    price: '₹62,490', stars: 4, chips: [{ t: 'Free delivery', tone: 'green' }],
  },
  { id: 'seller', kind: 'seller', x: 178, y: 118, depth: 1.1, w: 90, art: 'watch', stars: 4, note: '3.9k' },
  { id: 'phone-heart', kind: 'product', x: -134, y: 186, depth: 1.0, w: 72, art: 'phone', heart: true, stars: 4 },
  { id: 'tv-front', kind: 'product', x: 172, y: 226, depth: 0.95, w: 76, art: 'tv', stars: 4 },

  /* ── Mid layer ── */
  { id: 'amazon-mini', kind: 'store', store: 'amazon', mini: true, x: -128, y: -222, depth: 0.7, w: 68, price: '₹64,999' },
  { id: 'phone-top', kind: 'product', x: 124, y: -238, depth: 0.7, w: 46, art: 'phone' },
  { id: 'laptop-top', kind: 'product', x: 4, y: -208, depth: 0.65, w: 54, art: 'laptop' },
  { id: 'coral', kind: 'product', x: 258, y: 130, depth: 0.8, w: 56, art: 'phone2', stars: 4 },
  { id: 'phone-bare', kind: 'bare', x: 296, y: 2, depth: 0.9, w: 46, art: 'phone' },
  { id: 'phone-left', kind: 'product', x: -276, y: -44, depth: 0.8, w: 48, art: 'phone' },
  { id: 'tablet-left', kind: 'product', x: -264, y: 74, depth: 0.85, w: 56, art: 'tablet', stars: 4 },
  { id: 'watch-left', kind: 'product', x: -206, y: 134, depth: 0.7, w: 44, art: 'watch' },
  { id: 'tv-small', kind: 'product', x: -2, y: 212, depth: 0.65, w: 58, art: 'tv', stars: 3 },
  { id: 'console', kind: 'product', x: -30, y: 262, depth: 0.55, w: 48, art: 'console' },

  /* ── Far layer (blurred, parallax depth) ── */
  { id: 'g-earbuds', kind: 'ghost', art: 'earbuds', x: 236, y: -170, depth: 0.45, w: 36 },
  { id: 'g-pen', kind: 'ghost', art: 'pen', x: -262, y: -166, depth: 0.4, w: 32 },
  { id: 'g-1', kind: 'ghost', price: '₹11,990', x: -84, y: 106, depth: 0.4, w: 46 },
  { id: 'g-2', kind: 'ghost', price: '₹41,885', x: 100, y: 288, depth: 0.4, w: 48 },
  { id: 'g-3', kind: 'ghost', price: '₹23,490', x: 318, y: -192, depth: 0.35, w: 48 },
  { id: 'g-4', kind: 'ghost', price: '₹21,990', x: -300, y: 206, depth: 0.35, w: 50 },
  { id: 'g-5', kind: 'ghost', price: '₹18,500', x: 312, y: 216, depth: 0.35, w: 46 },
]);

/** Where a node sits: compressed while typing, flung outward while loading. */
function place(n: NodeDef, compress: number, loading: boolean, sx: number, sy: number) {
  if (loading) return n.kind === 'reliance' ? { x: 0, y: 0 } : { x: n.x * sx, y: n.y * sy };
  return { x: n.x * compress, y: n.y * compress };
}

/* Radial "charge" rays that burst out of the hub while the password is active */
const rnd = (i: number) => {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};
const RAYS = Array.from({ length: 76 }, (_, i) => {
  const a = (i / 76) * Math.PI * 2;
  const r1 = 38 + (i % 3) * 3;
  const r2 = 80 + rnd(i) * 92;
  return {
    x1: Math.cos(a) * r1, y1: Math.sin(a) * r1,
    x2: Math.cos(a) * r2, y2: Math.sin(a) * r2,
    o: 0.3 + rnd(i + 99) * 0.6,
  };
});

/* ═══════════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════════ */
/** Scale for the fixed-size canvas + how far the nodes spread while loading. */
function useCanvasMetrics() {
  const [m, setM] = useState({ scale: 1, sx: 2.1, sy: 1.55 });
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = clamp(Math.min((vw * 0.57) / CW, vh / CH), 0.5, 1.12);
      setM({
        scale,
        sx: clamp((vw / 2) / (300 * scale), 1.6, 3),
        sy: clamp((vh / 2) / (250 * scale), 1.3, 2.4),
      });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return m;
}

function useIsDesktop() {
  const q = '(min-width: 768px)';
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return v;
}

/* ═══════════════════════════════════════════════════════════════════════
   SMALL VISUAL PIECES
═══════════════════════════════════════════════════════════════════════ */
function HexMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="hex-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4658" />
          <stop offset="1" stopColor="#0b1220" />
        </linearGradient>
      </defs>
      <polygon
        points="16,2 28.5,9 28.5,23 16,30 3.5,23 3.5,9"
        fill="url(#hex-fill)"
        stroke="url(#hex-fill)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10.5 16.4l3.9 3.9 7.2-7.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Product illustrations (pure SVG — no image assets needed) ── */
function Art({ kind }: { kind: ArtKey }) {
  return (
    <svg viewBox="0 0 48 56" className="w-full h-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="art-coral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fda4af" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="art-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.55" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {kind === 'phone' && (
        <>
          <rect x="12" y="3" width="24" height="50" rx="5.5" fill="#0f172a" />
          <rect x="14" y="5" width="20" height="46" rx="4" fill="#1e293b" />
          <rect x="16" y="7.5" width="10" height="10" rx="3" fill="#020617" />
          <circle cx="19.2" cy="10.8" r="1.7" fill="#64748b" />
          <circle cx="23" cy="14.2" r="1.3" fill="#64748b" />
        </>
      )}
      {kind === 'phone2' && (
        <>
          <rect x="12" y="3" width="24" height="50" rx="5.5" fill="url(#art-coral)" />
          <rect x="14.5" y="5.5" width="19" height="45" rx="3.5" fill="#fff" fillOpacity=".85" />
          <rect x="17" y="10" width="14" height="3" rx="1.5" fill="#fb7185" />
          <rect x="17" y="16" width="9" height="2.4" rx="1.2" fill="#fdba74" />
          <rect x="17" y="30" width="14" height="14" rx="3" fill="url(#art-coral)" fillOpacity=".7" />
        </>
      )}
      {kind === 'tablet' && (
        <>
          <rect x="6" y="7" width="36" height="42" rx="4.5" fill="#0f172a" />
          <rect x="8.5" y="9.5" width="31" height="37" rx="2.5" fill="url(#art-screen)" />
          <circle cx="24" cy="8.3" r=".8" fill="#475569" />
        </>
      )}
      {kind === 'tv' && (
        <>
          <rect x="2.5" y="11" width="43" height="27" rx="2.5" fill="#0f172a" />
          <rect x="4.2" y="12.7" width="39.6" height="23.6" rx="1.5" fill="url(#art-screen)" />
          <path d="M4.2 30c8-6 14-2 20-6s12-6 19.8-2v14.3H4.2z" fill="#0f172a" fillOpacity=".25" />
          <rect x="21" y="38" width="6" height="5" fill="#1e293b" />
          <rect x="14" y="43" width="20" height="2.4" rx="1.2" fill="#334155" />
        </>
      )}
      {kind === 'watch' && (
        <>
          <rect x="17" y="2" width="14" height="14" rx="3" fill="#1e293b" />
          <rect x="17" y="40" width="14" height="14" rx="3" fill="#1e293b" />
          <rect x="11" y="13" width="26" height="30" rx="8" fill="#0f172a" />
          <rect x="13.5" y="15.5" width="21" height="25" rx="6" fill="#020617" />
          <rect x="17" y="21" width="14" height="2.6" rx="1.3" fill="#e2e8f0" />
          <rect x="17" y="26" width="9" height="2.6" rx="1.3" fill="#38bdf8" />
          <circle cx="29" cy="34" r="2.6" fill="none" stroke="#22c55e" strokeWidth="1.4" />
          <rect x="37" y="23" width="2" height="5" rx="1" fill="#334155" />
        </>
      )}
      {kind === 'laptop' && (
        <>
          <rect x="8" y="10" width="32" height="23" rx="2.5" fill="#1e293b" />
          <rect x="10" y="12" width="28" height="19" rx="1.5" fill="url(#art-screen)" />
          <path d="M3 35h42l-3 6H6z" fill="#94a3b8" />
          <rect x="19" y="35.5" width="10" height="1.6" rx=".8" fill="#64748b" />
        </>
      )}
      {kind === 'console' && (
        <>
          <rect x="3" y="20" width="42" height="15" rx="3.5" fill="#1e293b" />
          <rect x="3" y="20" width="42" height="5" rx="2.5" fill="#334155" />
          <circle cx="10" cy="30" r="1.4" fill="#22c55e" />
          <rect x="30" y="29" width="11" height="2" rx="1" fill="#475569" />
        </>
      )}
      {kind === 'earbuds' && (
        <>
          <rect x="9" y="12" width="11" height="26" rx="5.5" fill="#f8fafc" stroke="#cbd5e1" />
          <circle cx="14.5" cy="15" r="6" fill="#f8fafc" stroke="#cbd5e1" />
          <rect x="28" y="12" width="11" height="26" rx="5.5" fill="#f8fafc" stroke="#cbd5e1" />
          <circle cx="33.5" cy="15" r="6" fill="#f8fafc" stroke="#cbd5e1" />
        </>
      )}
      {kind === 'pen' && (
        <>
          <rect x="21" y="3" width="6" height="42" rx="3" fill="#cbd5e1" transform="rotate(28 24 28)" />
          <rect x="21" y="3" width="6" height="9" rx="3" fill="#94a3b8" transform="rotate(28 24 28)" />
        </>
      )}
    </svg>
  );
}

function Stars({ n, size = 7 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-px" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < n ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
        />
      ))}
    </span>
  );
}

const TONES: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700',
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-sky-50 text-sky-700',
};
function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded px-1 py-[2px] text-[7px] font-semibold leading-none whitespace-nowrap ${TONES[tone]}`}>
      {children}
    </span>
  );
}

function MiniChart() {
  const bars = [38, 62, 46, 74, 54, 90, 64, 50, 72];
  return (
    <div className="flex items-end gap-[2px] h-[20px] my-1.5" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-[1px]"
          style={{ height: `${h}%`, backgroundColor: i === 5 ? '#2874f0' : '#93c5fd' }}
        />
      ))}
    </div>
  );
}

/* ── Store wordmarks (text + CSS, no brand image files) ── */
function StoreMark({ store, mini }: { store: StoreKey; mini?: boolean }) {
  const sz = mini ? 'text-[10px]' : 'text-[14px]';
  if (store === 'amazon')
    return (
      <span className={`relative inline-block font-bold lowercase leading-none tracking-tight text-slate-900 ${sz}`} style={{ fontFamily: BODY }}>
        amazon
        <svg viewBox="0 0 40 8" className="absolute left-[16%] -bottom-[5px] w-[62%] h-2" aria-hidden>
          <path d="M2 2 Q20 9 38 2" stroke="#f59e0b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
      </span>
    );
  if (store === 'flipkart')
    return (
      <span className="inline-flex items-center gap-1">
        <span className={`font-bold italic leading-none tracking-tight text-[#2874f0] ${sz}`}>Flipkart</span>
        <span className="grid place-items-center w-[13px] h-[13px] rounded-[3px] bg-[#f9c513] text-[#2874f0] text-[9px] font-black italic leading-none">f</span>
      </span>
    );
  return (
    <span className={`font-medium lowercase leading-none tracking-tight text-slate-800 ${sz}`} style={{ fontFamily: DISPLAY }}>
      croma<i className="inline-block w-1 h-1 rounded-full bg-emerald-500 ml-0.5 align-baseline" />
    </span>
  );
}

/* ── Node cards ── */
const CARD = 'bg-white rounded-[10px] border border-slate-200/80 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.22)]';

function RelianceCard({ n }: { n: NodeDef }) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-[0_22px_44px_-14px_rgba(15,23,42,0.38)]"
      style={{ width: n.w }}
    >
      <div className="rounded-md bg-[#d9251d] text-white text-center py-2 leading-none" style={{ fontFamily: DISPLAY }}>
        <span className="text-[15px] font-semibold tracking-tight">Reliance</span>
        <span className="text-[15px] font-light">Digital</span>
      </div>
      <p className="mt-2.5 text-[8px] font-medium uppercase tracking-[0.1em] text-slate-500">Best current price</p>
      <p className="mt-1 text-[27px] font-bold leading-none tracking-tight text-slate-900 tabular-nums">{n.price}</p>
      <div className="mt-2.5 flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1.5 text-[8.5px] font-semibold text-emerald-700">
        <Check size={10} strokeWidth={3} /> Lowest of 12 stores
      </div>
    </div>
  );
}

function StoreCard({ n }: { n: NodeDef }) {
  return (
    <div className={CARD} style={{ width: n.w }}>
      <div className={n.mini ? 'p-1.5' : 'p-2'}>
        <div className="mb-1.5">
          <StoreMark store={n.store!} mini={n.mini} />
        </div>
        {n.chart && <MiniChart />}
        {n.price && (
          <p
            className="font-bold leading-none tracking-tight text-slate-900 tabular-nums"
            style={{ fontSize: n.mini ? 10 : 15 }}
          >
            {n.price}
          </p>
        )}
        {n.stars && (
          <div className="mt-1">
            <Stars n={n.stars} />
          </div>
        )}
        {n.chips && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {n.chips.map((c) => (
              <Chip key={c.t} tone={c.tone}>{c.t}</Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SellerCard({ n }: { n: NodeDef }) {
  return (
    <div className={`${CARD} overflow-hidden`} style={{ width: n.w }}>
      <div className="bg-emerald-600 px-2 py-1 text-[8px] font-semibold tracking-wide text-white">Top seller</div>
      <div className="px-2 pt-1.5 pb-2">
        <div style={{ height: 56 }}>
          <Art kind={n.art!} />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <Stars n={n.stars ?? 4} />
          <span className="text-[7px] text-slate-400">{n.note}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ n }: { n: NodeDef }) {
  return (
    <div className={`${CARD} relative p-1.5`} style={{ width: n.w }}>
      {n.heart && <Heart size={8} className="absolute right-1.5 top-1.5 text-slate-400" />}
      <div style={{ height: Math.round(n.w * 0.86) }}>
        <Art kind={n.art!} />
      </div>
      <div className="mt-1 h-[3px] w-4/5 rounded bg-slate-200" />
      {n.stars && (
        <div className="mt-1">
          <Stars n={n.stars} size={6} />
        </div>
      )}
    </div>
  );
}

function GhostCard({ n }: { n: NodeDef }) {
  if (n.art)
    return (
      <div className="rounded-lg border border-slate-200/70 bg-white/80 p-1" style={{ width: n.w }}>
        <div style={{ height: Math.round(n.w * 0.9) }}>
          <Art kind={n.art} />
        </div>
      </div>
    );
  return (
    <div className="rounded-md border border-slate-200/70 bg-white/85 px-1.5 py-1" style={{ width: n.w }}>
      <div className="mb-1 h-[2.5px] w-1/2 rounded bg-slate-300" />
      <p className="text-[8px] font-semibold text-slate-500 tabular-nums">{n.price}</p>
    </div>
  );
}

function NodeCard({ n }: { n: NodeDef }) {
  switch (n.kind) {
    case 'reliance': return <RelianceCard n={n} />;
    case 'store': return <StoreCard n={n} />;
    case 'seller': return <SellerCard n={n} />;
    case 'product': return <ProductCard n={n} />;
    case 'ghost': return <GhostCard n={n} />;
    case 'bare':
      return (
        <div style={{ width: n.w, height: Math.round(n.w * 1.1) }} className="drop-shadow-[0_12px_14px_rgba(15,23,42,0.30)]">
          <Art kind={n.art!} />
        </div>
      );
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   SATELLITE — one floating card (position · parallax · float · blur)
═══════════════════════════════════════════════════════════════════════ */
interface SatProps {
  n: NodeDef;
  index: number;
  compress: number;
  loading: boolean;
  sx: number;
  sy: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduce: boolean;
}

function Satellite({ n, index, compress, loading, sx, sy, px, py, reduce }: SatProps) {
  // Micro-parallax: nearer cards travel further with the pointer
  const dx = useTransform(px, (v) => (reduce ? 0 : v * n.depth * 16));
  const dy = useTransform(py, (v) => (reduce ? 0 : v * n.depth * 11));

  const { x, y } = place(n, compress, loading, sx, sy);
  const far = n.depth < 0.5;
  const mid = n.depth < 0.75;
  const blur = loading ? (mid ? 3.5 : n.depth < 1 ? 1.8 : 0) : far ? 1.6 : mid ? 0.7 : 0;
  const opacity = far ? 0.62 : mid ? 0.9 : 1;
  const hero = n.kind === 'reliance';
  const enter = { duration: 0.55, delay: 0.15 + index * 0.04 };

  return (
    <motion.div
      className="absolute"
      style={{ left: CX, top: CY, zIndex: Math.round(n.depth * 10) }}
      animate={{ x, y, opacity, filter: `blur(${blur}px)` }}
      transition={POS_T}
    >
      <motion.div className="relative" style={{ x: dx, y: dy }}>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            reduce
              ? { opacity: 1, scale: hero && loading ? 1.2 : 1 }
              : { y: [0, -n.amt, 0], opacity: 1, scale: hero && loading ? 1.2 : 1 }
          }
          transition={
            reduce
              ? { duration: 0.2 }
              : {
                y: { repeat: Infinity, duration: n.dur, delay: n.delay, ease: 'easeInOut' },
                opacity: enter,
                scale: hero ? POS_T : enter,
              }
          }
        >
          <div className="absolute -translate-x-1/2 -translate-y-1/2">
            <NodeCard n={n} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FORM FIELD — floating label that sits on the border
═══════════════════════════════════════════════════════════════════════ */
interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  trailing?: ReactNode;
}

function Field({ id, label, type, value, autoComplete, onChange, onFocus, onBlur, trailing }: FieldProps) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="absolute -top-[9px] left-3 z-10 px-1.5 text-[11.5px] font-medium text-slate-500 transition-colors group-focus-within:text-slate-900"
        style={{ backgroundColor: PANEL_BG }}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`h-[52px] w-full rounded-lg border border-slate-300 bg-transparent pl-4 text-[14.5px] text-slate-900 transition-colors placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 ${trailing ? 'pr-12' : 'pr-4'}`}
      />
      {trailing}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function Login() {
  const navigate = useNavigate();
  const reduce = !!useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scale: canvasScale, sx, sy } = useCanvasMetrics();
  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  const [focus, setFocus] = useState<Focus>('none');
  const [phase, setPhase] = useState<Phase>('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const loading = phase === 'loading';
  // "Charged" = password field active, or both fields filled → green burst
  const charged = !loading && (focus === 'password' || (email.length > 0 && password.length > 0));
  const compress = charged ? 0.86 : focus === 'email' ? 0.94 : 1;

  /* ── Pointer: spotlight + parallax ── */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 55, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 20 });
  const px = useTransform(springX, (v) => (v - 0.5) * 2);
  const py = useTransform(springY, (v) => (v - 0.5) * 2);
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(720px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.65) 0%, transparent 62%)`
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      rawX.set((e.clientX - r.left) / r.width);
      rawY.set((e.clientY - r.top) / r.height);
    },
    [rawX, rawY]
  );

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setPhase('loading');
    setFocus('none');
    // TODO: replace with your real sign-in call, then navigate on success.
    timer.current = window.setTimeout(() => navigate('/'), 3600);
  };

  const slideOut = loading && isDesktop;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative h-screen w-screen overflow-hidden"
      style={{ fontFamily: BODY, backgroundColor: '#e8ecf0' }}
    >
      <p role="status" className="sr-only">{loading ? 'Verifying your session' : ''}</p>

      {/* Micro-grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* Pointer spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

      {/* ═════════════ LEFT — price network ═════════════ */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 z-10 hidden h-full items-center justify-center overflow-hidden md:flex"
        initial={false}
        animate={{ width: slideOut ? '100%' : '57%' }}
        transition={PANEL_T}
      >
        {/* Pill */}
        <div className="absolute left-1/2 top-[6.5%] -translate-x-1/2">
          <motion.div
            animate={{ opacity: loading ? 0 : 1, y: loading ? -6 : 0 }}
            transition={{ duration: 0.4 }}
            className="whitespace-nowrap rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur"
          >
            Price Intelligence Engine
          </motion.div>
        </div>

        <div className="relative flex-shrink-0" style={{ width: CW, height: CH, transform: `scale(${canvasScale})` }}>
          {/* Spokes */}
          <svg className="pointer-events-none absolute inset-0" width={CW} height={CH} style={{ overflow: 'visible' }}>
            {NODES.map((n) => {
              const { x, y } = place(n, compress, loading, sx, sy);
              const tx = CX + x;
              const ty = CY + y;
              const d = Math.min(n.depth, 1.2);
              return (
                <g key={n.id}>
                  <motion.line
                    x1={CX} y1={CY}
                    animate={{ x2: tx, y2: ty } as any}
                    transition={POS_T}
                    stroke="#64748b"
                    strokeOpacity={0.14 + d * 0.2}
                    strokeWidth={0.7 + d * 0.5}
                  />
                  {!reduce && (
                    <motion.line
                      className="flow-line"
                      x1={CX} y1={CY}
                      animate={{ x2: tx, y2: ty, stroke: charged ? '#22c55e' : '#475569' } as any}
                      transition={POS_T}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="0.1 38"
                      strokeOpacity={0.55}
                      style={{ animationDuration: `${n.dur * 1.6}s`, animationDelay: `${n.delay}s` }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Green glow + ray burst (password active) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: CX - 170, top: CY - 170, width: 340, height: 340,
              background: 'radial-gradient(circle, rgba(34,197,94,0.28) 0%, rgba(34,197,94,0.08) 45%, transparent 70%)',
            }}
            initial={false}
            animate={{ opacity: charged ? 1 : 0, scale: charged ? 1 : 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: CX - 180, top: CY - 180, width: 360, height: 360 }}
            initial={false}
            animate={{ opacity: charged ? 1 : 0, scale: charged ? 1 : 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <svg viewBox="-180 -180 360 360" width="360" height="360">
              <defs>
                <radialGradient id="ray-fade" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="175">
                  <stop offset="0.2" stopColor="#fff" />
                  <stop offset="1" stopColor="#000" />
                </radialGradient>
                <mask id="ray-mask" maskUnits="userSpaceOnUse" x="-180" y="-180" width="360" height="360">
                  <rect x="-180" y="-180" width="360" height="360" fill="url(#ray-fade)" />
                </mask>
              </defs>
              <g mask="url(#ray-mask)" stroke="#22c55e" strokeWidth="1" strokeLinecap="round">
                {RAYS.map((r, i) => (
                  <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} strokeOpacity={r.o} />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* Hub */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: CX, top: CY, zIndex: 5 }}>
            <motion.div
              animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.6 : 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              className={`grid h-[92px] w-[92px] place-items-center rounded-full border bg-white/85 shadow-[0_14px_34px_-10px_rgba(15,23,42,0.35)] backdrop-blur transition-colors duration-500 ${charged ? 'border-emerald-200' : 'border-white'
                }`}
            >
              <HexMark size={56} />
            </motion.div>
          </div>

          {/* Satellites */}
          {NODES.map((n, i) => (
            <Satellite
              key={n.id} n={n} index={i}
              compress={compress} loading={loading} sx={sx} sy={sy}
              px={px} py={py} reduce={reduce}
            />
          ))}

          {/* Verifying: orbit rings + caption */}
          <motion.div
            className="pointer-events-none absolute"
            style={{ left: CX - 150, top: CY - 150, width: 300, height: 300, zIndex: 20 }}
            initial={false}
            animate={{ opacity: loading ? 1 : 0, scale: loading ? 1 : 0.7 }}
            transition={{ duration: 0.6, delay: loading ? 0.35 : 0 }}
          >
            <motion.svg
              viewBox="-150 -150 300 300"
              className="h-full w-full"
              animate={loading && !reduce ? { rotate: 360 } : { rotate: 0 }}
              transition={loading && !reduce ? { repeat: Infinity, duration: 9, ease: 'linear' } : { duration: 0 }}
            >
              <ellipse rx="140" ry="64" transform="rotate(-24)" fill="none" stroke="#334155" strokeOpacity=".75" strokeWidth="1.4" />
              <ellipse rx="130" ry="88" transform="rotate(34)" fill="none" stroke="#64748b" strokeOpacity=".5" strokeWidth="1" />
              <circle r="132" fill="none" stroke="#94a3b8" strokeOpacity=".25" />
            </motion.svg>
          </motion.div>

          <div className="absolute -translate-x-1/2" style={{ left: CX, top: CY - 128, zIndex: 30 }}>
            <motion.div
              initial={false}
              animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : 8 }}
              transition={{ duration: 0.45, delay: loading ? 0.5 : 0 }}
              className="flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-800"
            >
              <Loader2 size={15} className="animate-spin" />
              Verifying your session…
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ═════════════ RIGHT — sign-in form ═════════════ */}
      <motion.div
        className="absolute right-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-y-auto border-slate-200 md:w-[43%] md:border-l"
        style={{ backgroundColor: PANEL_BG }}
        initial={false}
        animate={slideOut ? { x: '100%', opacity: 0 } : { x: '0%', opacity: 1 }}
        transition={PANEL_T}
      >
        <div className="w-full max-w-[372px] px-7 py-10">
          {/* Logo */}
          <div className="mb-7 flex items-center justify-center gap-2" style={{ fontFamily: DISPLAY }}>
            <HexMark size={34} />
            <span className="relative text-[36px] font-semibold leading-none tracking-[0.01em] text-slate-900">
              COMPARIO
              <ShieldCheck
                size={17}
                strokeWidth={2.4}
                className="absolute -right-5 -top-1.5 fill-slate-500 text-white"
                aria-hidden
              />
            </span>
          </div>

          {/* Headline */}
          <div className="mx-auto mb-9 max-w-[300px] text-center text-[22px] font-normal leading-[1.3] text-slate-700" style={{ fontFamily: DISPLAY }}>
            <h1 className="font-normal">Welcome back.</h1>
            <p className="text-slate-600">Your smarter shopping decisions start here.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-[26px]" noValidate={false}>
            <Field
              id="email" label="Email address" type="email" autoComplete="email"
              value={email} onChange={setEmail}
              onFocus={() => setFocus('email')} onBlur={() => setFocus('none')}
            />

            <div>
              <Field
                id="password" label="Password" type={showPw ? 'text' : 'password'} autoComplete="current-password"
                value={password} onChange={setPassword}
                onFocus={() => setFocus('password')} onBlur={() => setFocus('none')}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    aria-pressed={showPw}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="rounded text-[12.5px] text-slate-600 underline underline-offset-2 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={reduce ? undefined : { scale: 1.012 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-neutral-950 text-[14.5px] font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80"
                style={{ outlineColor: 'transparent' }}
              >
                {loading ? (<><Loader2 size={16} className="animate-spin" /> Verifying…</>) : 'Continue'}
              </motion.button>

              <motion.button
                type="button"
                disabled={loading}
                whileHover={reduce ? undefined : { scale: 1.012 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                // TODO: hook up Google OAuth here
                className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-slate-400/80 bg-transparent text-[14.5px] font-medium text-slate-800 transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:opacity-60"
              >
                <GoogleIcon />
                Continue with Google
              </motion.button>
            </div>
          </form>

          <p className="mt-6 text-center text-[12.5px] text-slate-500">
            No account?{' '}
            {/* TODO: point this at your sign-up route */}
            <button type="button" className="rounded font-semibold text-slate-800 underline underline-offset-2 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20">
              Create one free
            </button>
          </p>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes dash-flow { to { stroke-dashoffset: -38.1; } }
        .flow-line { animation-name: dash-flow; animation-timing-function: linear; animation-iteration-count: infinite; }
        @media (prefers-reduced-motion: reduce) { .flow-line { animation: none; } }
      `}</style>
    </div>
  );
}