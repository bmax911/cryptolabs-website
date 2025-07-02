
import React, { useEffect, useState } from 'react';
import { fetchWorldBankData } from './WorldBankChartUtils';

const DashboardCharts = () => {
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchWorldBankData({ indicator: 'NY.GDP.MKTP.CD', country: 'US', start: 2012, end: 2022 }),
      fetchWorldBankData({ indicator: 'SP.POP.TOTL', country: 'US', start: 2012, end: 2022 })
    ])
      .then(([gdp, pop]) => {
        setLineData(gdp);
        setBarData(pop);
      })
      .catch(() => setError('Failed to load World Bank data'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-charts">
      <div className="chart-placeholder">
        {loading ? 'Loading Line Chart...' : error ? error : (
          <>
            <LineChart data={lineData} />
            <div className="chart-alt-desc">
              <strong>US GDP (2012–2022):</strong> This line chart visualizes the United States Gross Domestic Product (GDP) in current US dollars, sourced from the World Bank. Each point represents the GDP for a given year.
            </div>
          </>
        )}
      </div>
      <div className="chart-placeholder">
        {loading ? 'Loading Bar Chart...' : error ? error : (
          <>
            <BarChart data={barData} />
            <div className="chart-alt-desc">
              <strong>US Population (2012–2022):</strong> This bar chart shows the total population of the United States for each year, as reported by the World Bank.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function LineChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Enhanced SVG line chart (GDP over years)
  const w = 340, h = 160, pad = 36;
  const years = data.map(d => d.year);
  const values = data.map(d => d.value);
  const min = Math.min(...values), max = Math.max(...values);
  const points = values.map((v, i) => {
    const x = pad + (i * (w - 2 * pad)) / (values.length - 1);
    const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h}>
      {/* Axes */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1" />
      {/* Line */}
      <polyline fill="none" stroke="#00e6d6" strokeWidth="3" points={points} />
      {/* Dots */}
      {values.map((v, i) => {
        const x = pad + (i * (w - 2 * pad)) / (values.length - 1);
        const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
        return <circle key={i} cx={x} cy={y} r={4} fill="#00e6d6" stroke="#fff" strokeWidth="1" />;
      })}
      {/* Year labels */}
      {years.map((year, i) => (
        <text key={year} x={pad + (i * (w - 2 * pad)) / (years.length - 1)} y={h - 12} fontSize="11" textAnchor="middle" fill="#b5eaff">{year}</text>
      ))}
      {/* Value labels (min/max) */}
      <text x={pad - 8} y={h - pad} fontSize="10" textAnchor="end" fill="#b5eaff">{min.toLocaleString()}</text>
      <text x={pad - 8} y={pad + 4} fontSize="10" textAnchor="end" fill="#b5eaff">{max.toLocaleString()}</text>
    </svg>
  );
}

function BarChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Enhanced SVG bar chart (Population over years)
  const w = 340, h = 160, pad = 36;
  const years = data.map(d => d.year);
  const values = data.map(d => d.value);
  const min = Math.min(...values), max = Math.max(...values);
  const barW = (w - 2 * pad) / values.length - 4;
  return (
    <svg width={w} height={h}>
      {/* Axes */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#b5eaff" strokeWidth="1" />
      {/* Bars */}
      {values.map((v, i) => {
        const x = pad + i * ((w - 2 * pad) / values.length);
        const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
        const barH = ((v - min) / (max - min)) * (h - 2 * pad);
        return (
          <g key={years[i]}>
            <rect x={x} y={y} width={barW} height={barH} fill="#00e6d6" rx="3" />
            <text x={x + barW / 2} y={h - 12} fontSize="11" textAnchor="middle" fill="#b5eaff">{years[i]}</text>
            <text x={x + barW / 2} y={y - 6} fontSize="10" textAnchor="middle" fill="#fff">{Math.round(v).toLocaleString()}</text>
          </g>
        );
      })}
      {/* Value labels (min/max) */}
      <text x={pad - 8} y={h - pad} fontSize="10" textAnchor="end" fill="#b5eaff">{min.toLocaleString()}</text>
      <text x={pad - 8} y={pad + 4} fontSize="10" textAnchor="end" fill="#b5eaff">{max.toLocaleString()}</text>
    </svg>
  );
}

export default DashboardCharts;
