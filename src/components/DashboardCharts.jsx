import React, { useEffect, useState } from 'react';
import { fetchWorldBankData } from './WorldBankChartUtils';

const INDICATORS = [
  { value: 'NY.GDP.MKTP.CD', label: 'GDP (current US$)' },
  { value: 'SP.POP.TOTL', label: 'Population' },
  { value: 'FP.CPI.TOTL', label: 'Consumer Price Index' },
  { value: 'NE.EXP.GNFS.CD', label: 'Exports of goods and services (current US$)' },
  { value: 'NE.IMP.GNFS.CD', label: 'Imports of goods and services (current US$)' },
];
const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CN', label: 'China' },
  { value: 'JP', label: 'Japan' },
  { value: 'DE', label: 'Germany' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'FR', label: 'France' },
];


const DashboardCharts = () => {
  const [lineIndicator, setLineIndicator] = useState('NY.GDP.MKTP.CD');
  const [barIndicator, setBarIndicator] = useState('SP.POP.TOTL');
  const [country, setCountry] = useState('US');
  const [start, setStart] = useState(2012);
  const [end, setEnd] = useState(2022);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchWorldBankData({ indicator: lineIndicator, country, start, end }),
      fetchWorldBankData({ indicator: barIndicator, country, start, end })
    ])
      .then(([line, bar]) => {
        setLineData(line);
        setBarData(bar);
      })
      .catch(() => setError('Failed to load World Bank data'))
      .finally(() => setLoading(false));
  }, [lineIndicator, barIndicator, country, start, end]);

  return (
    <div className="dashboard-charts dashboard-charts-large">
      <div className="chart-controls glassmorphism-card">
        <div className="chart-control-group">
          <label htmlFor="country-select">Country:</label>
          <select id="country-select" value={country} onChange={e => setCountry(e.target.value)} aria-label="Select country">
            {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="chart-control-group">
          <label htmlFor="line-indicator-select">Line Chart:</label>
          <select id="line-indicator-select" value={lineIndicator} onChange={e => setLineIndicator(e.target.value)} aria-label="Select line chart indicator">
            {INDICATORS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </div>
        <div className="chart-control-group">
          <label htmlFor="bar-indicator-select">Bar Chart:</label>
          <select id="bar-indicator-select" value={barIndicator} onChange={e => setBarIndicator(e.target.value)} aria-label="Select bar chart indicator">
            {INDICATORS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </div>
        <div className="chart-control-group">
          <label htmlFor="year-range-start">Year Range:</label>
          <input id="year-range-start" type="number" min="1960" max={end} value={start} onChange={e => setStart(Number(e.target.value))} style={{ width: 70 }} aria-label="Start year" />
          <span> - </span>
          <input id="year-range-end" type="number" min={start} max={new Date().getFullYear()} value={end} onChange={e => setEnd(Number(e.target.value))} style={{ width: 70 }} aria-label="End year" />
        </div>
      </div>
      <div className="charts-row">
        <div className="chart-placeholder chart-large">
          {loading ? 'Loading Line Chart...' : error ? error : (
            <>
              <LineChart data={lineData} indicator={lineIndicator} country={country} />
              <div className="chart-alt-desc">
                <strong>{COUNTRIES.find(c => c.value === country)?.label} {INDICATORS.find(i => i.value === lineIndicator)?.label} ({start}–{end}):</strong>
                This line chart visualizes the selected indicator for the chosen country and year range, sourced from the World Bank. Each point represents the value for a given year.
              </div>
            </>
          )}
        </div>
        <div className="chart-placeholder chart-large">
          {loading ? 'Loading Bar Chart...' : error ? error : (
            <>
              <BarChart data={barData} indicator={barIndicator} country={country} />
              <div className="chart-alt-desc">
                <strong>{COUNTRIES.find(c => c.value === country)?.label} {INDICATORS.find(i => i.value === barIndicator)?.label} ({start}–{end}):</strong>
                This bar chart shows the selected indicator for the chosen country and year range, as reported by the World Bank.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function LineChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Responsive SVG line chart (wider on large screens)
  const w = window.innerWidth > 1200 ? 900 : 600, h = 340, pad = 64;
  const years = data.map(d => d.year);
  const values = data.map(d => d.value);
  const min = Math.min(...values), max = Math.max(...values);
  const points = values.map((v, i) => {
    const x = pad + (i * (w - 2 * pad)) / (values.length - 1);
    const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} aria-label="Line chart visualization">
      {/* Axes */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1.5" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1.5" />
      {/* Line */}
      <polyline fill="none" stroke="#00e6d6" strokeWidth="4" points={points} />
      {/* Dots */}
      {values.map((v, i) => {
        const x = pad + (i * (w - 2 * pad)) / (values.length - 1);
        const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
        return <circle key={i} cx={x} cy={y} r={7} fill="#00e6d6" stroke="#fff" strokeWidth="2" />;
      })}
      {/* Year labels */}
      {years.map((year, i) => (
        <text key={year} x={pad + (i * (w - 2 * pad)) / (years.length - 1)} y={h - 24} fontSize="17" textAnchor="middle" fill="#b5eaff">{year}</text>
      ))}
      {/* Value labels (min/max) */}
      <text x={pad - 16} y={h - pad} fontSize="15" textAnchor="end" fill="#b5eaff">{min.toLocaleString()}</text>
      <text x={pad - 16} y={pad + 8} fontSize="15" textAnchor="end" fill="#b5eaff">{max.toLocaleString()}</text>
    </svg>
  );
}

function BarChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Responsive SVG bar chart (wider on large screens)
  const w = window.innerWidth > 1200 ? 900 : 600, h = 340, pad = 64;
  const years = data.map(d => d.year);
  const values = data.map(d => d.value);
  const min = Math.min(...values), max = Math.max(...values);
  const barW = (w - 2 * pad) / values.length - 8;
  return (
    <svg width={w} height={h} aria-label="Bar chart visualization">
      {/* Axes */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1.5" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1.5" />
      {/* Bars */}
      {values.map((v, i) => {
        const x = pad + i * ((w - 2 * pad) / values.length);
        const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
        const barH = ((v - min) / (max - min)) * (h - 2 * pad);
        return (
          <g key={years[i]}>
            <rect x={x} y={y} width={barW} height={barH} fill="#00e6d6" rx="7" />
            <text x={x + barW / 2} y={h - 24} fontSize="17" textAnchor="middle" fill="#b5eaff">{years[i]}</text>
            <text x={x + barW / 2} y={y - 12} fontSize="15" textAnchor="middle" fill="#fff">{Math.round(v).toLocaleString()}</text>
          </g>
        );
      })}
      {/* Value labels (min/max) */}
      <text x={pad - 16} y={h - pad} fontSize="15" textAnchor="end" fill="#b5eaff">{min.toLocaleString()}</text>
      <text x={pad - 16} y={pad + 8} fontSize="15" textAnchor="end" fill="#b5eaff">{max.toLocaleString()}</text>
    </svg>
  );
}

export default DashboardCharts;
