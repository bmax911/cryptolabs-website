import React, { useEffect, useState } from 'react';
import { fetchWorldBankData } from './WorldBankChartUtils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const INDICATORS = [
  { value: 'NY.GDP.MKTP.CD', label: 'GDP (current US$)' },
  { value: 'SP.POP.TOTL', label: 'Population' },
  { value: 'FP.CPI.TOTL', label: 'Consumer Price Index' },
];
const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CN', label: 'China' },
  { value: 'JP', label: 'Japan' },
  { value: 'DE', label: 'Germany' },
];

const ChartContainer = ({ title, children, loading, error }) => (
  <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
    <h3 className="mb-4 font-semibold">{title}</h3>
    <div className="h-72">
      {loading ? <div className="flex h-full items-center justify-center text-slate-500">Loading...</div> :
       error ? <div className="flex h-full items-center justify-center text-red-500">{error}</div> :
       children
      }
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-white/80 p-2 text-sm shadow-lg backdrop-blur dark:bg-slate-900/80 dark:border-slate-700">
        <p className="font-bold">{label}</p>
        <p className="text-slate-600 dark:text-slate-400">{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const DashboardCharts = () => {
  const [lineIndicator, setLineIndicator] = useState('NY.GDP.MKTP.CD');
  const [barIndicator, setBarIndicator] = useState('SP.POP.TOTL');
  const [country, setCountry] = useState('US');
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [line, bar] = await Promise.all([
          fetchWorldBankData({ indicator: lineIndicator, country }),
          fetchWorldBankData({ indicator: barIndicator, country })
        ]);
        setLineData(line);
        setBarData(bar);
      } catch (err) {
        setError('Failed to load chart data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [lineIndicator, barIndicator, country]);

  const selectClass = "w-full rounded-md border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <h2 className="text-xl font-bold mb-4">Economic Indicators</h2>
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)} className={selectClass}>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Line Chart</label>
              <select value={lineIndicator} onChange={e => setLineIndicator(e.target.value)} className={selectClass}>
                {INDICATORS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bar Chart</label>
              <select value={barIndicator} onChange={e => setBarIndicator(e.target.value)} className={selectClass}>
                {INDICATORS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
          </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer title={INDICATORS.find(i => i.value === lineIndicator)?.label} loading={loading} error={error}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="year" stroke="hsl(var(--foreground) / 0.5)" fontSize={12} />
                <YAxis stroke="hsl(var(--foreground) / 0.5)" fontSize={12} tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name={INDICATORS.find(i => i.value === lineIndicator)?.label} stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
        
        <ChartContainer title={INDICATORS.find(i => i.value === barIndicator)?.label} loading={loading} error={error}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="year" stroke="hsl(var(--foreground) / 0.5)" fontSize={12} />
                <YAxis stroke="hsl(var(--foreground) / 0.5)" fontSize={12} tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name={INDICATORS.find(i => i.value === barIndicator)?.label} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;