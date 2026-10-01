import { useState, useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface PriceChartProps {
  currentPrice?: number;
  avgPrice90D?: number;
}

const generateData = (days: number, targetPrice: number, avgPrice: number) => {
  const data = [];
  const startRatio = avgPrice > 0 ? avgPrice / targetPrice : 1.05;
  let running = targetPrice * startRatio;

  for (let i = days; i >= 0; i--) {
    const fraction = (days - i) / Math.max(1, days);
    // Drift gradually toward targetPrice at i=0 with some noise
    const expected = avgPrice + (targetPrice - avgPrice) * fraction;
    const noise = (Math.random() - 0.5) * (targetPrice * 0.03);
    running = Math.round(expected + noise);

    // ensure at i=0 it exactly matches targetPrice
    if (i === 0) {
      running = targetPrice;
    }

    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.max(100, running)
    });
  }
  return data;
};

export default function PriceChart({ currentPrice = 68499, avgPrice90D = 72100 }: PriceChartProps) {
  const [range, setRange] = useState<'7D' | '30D' | '90D' | '6M' | '1Y'>('90D');

  const daysMap = {
    '7D': 7,
    '30D': 30,
    '90D': 90,
    '6M': 180,
    '1Y': 365,
  };

  const data = useMemo(() => {
    return generateData(daysMap[range], currentPrice, avgPrice90D);
  }, [range, currentPrice, avgPrice90D]);

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const padding = Math.max(200, Math.round((maxPrice - minPrice) * 0.2));

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="flex bg-background border border-border p-1 rounded-lg">
          {(['7D', '30D', '90D', '6M', '1Y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${range === r ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4338CA" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4338CA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              minTickGap={30}
            />
            <YAxis 
              domain={[Math.max(0, minPrice - padding), maxPrice + padding]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(val) => val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`}
              width={55}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#111318', color: '#FFFFFF', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#FFFFFF' }}
              formatter={(value: any) => [`₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, 'Price']}
              labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#4338CA" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
