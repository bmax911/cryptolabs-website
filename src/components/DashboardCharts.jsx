
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
          <LineChart data={lineData} />
        )}
      </div>
      <div className="chart-placeholder">
        {loading ? 'Loading Bar Chart...' : error ? error : (
          <BarChart data={barData} />
        )}
      </div>
    </div>
  );
};

function LineChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Simple SVG line chart (GDP over years)
  const w = 320, h = 120, pad = 32;
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
      <polyline fill="none" stroke="#00e6d6" strokeWidth="3" points={points} />
      {years.map((year, i) => (
        <text key={year} x={pad + (i * (w - 2 * pad)) / (years.length - 1)} y={h - 8} fontSize="10" textAnchor="middle" fill="#b5eaff">{year}</text>
      ))}
    </svg>
  );
}

function BarChart({ data }) {
  if (!data.length) return <span>No data</span>;
  // Simple SVG bar chart (Population over years)
  const w = 320, h = 120, pad = 32;
  const years = data.map(d => d.year);
  const values = data.map(d => d.value);
  const min = Math.min(...values), max = Math.max(...values);
  const barW = (w - 2 * pad) / values.length - 4;
  return (
    <svg width={w} height={h}>
      {values.map((v, i) => {
        const x = pad + i * ((w - 2 * pad) / values.length);
        const y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
        const barH = ((v - min) / (max - min)) * (h - 2 * pad);
        return (
          <g key={years[i]}>
            <rect x={x} y={y} width={barW} height={barH} fill="#00e6d6" />
            <text x={x + barW / 2} y={h - 8} fontSize="10" textAnchor="middle" fill="#b5eaff">{years[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default DashboardCharts;
