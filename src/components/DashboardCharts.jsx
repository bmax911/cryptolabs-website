import React, { useEffect, useState } from 'react';
import { fetchWorldBankData } from './WorldBankChartUtils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
              <RechartsLineChart data={lineData} indicator={lineIndicator} />
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
              <RechartsBarChart data={barData} indicator={barIndicator} />
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', padding: '10px', border: '1px solid #00e6d6', borderRadius: '5px' }}>
        <p className="label">{`Year: ${label}`}</p>
        <p className="intro">{`Value: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

function RechartsLineChart({ data, indicator }) {
  if (!data || data.length === 0) return <span>No data available for the selected criteria.</span>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
        <XAxis dataKey="year" stroke="#b5eaff" />
        <YAxis stroke="#b5eaff" tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Line type="monotone" dataKey="value" name={INDICATORS.find(i => i.value === indicator)?.label || 'Value'} stroke="#00e6d6" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function RechartsBarChart({ data, indicator }) {
  if (!data || data.length === 0) return <span>No data available for the selected criteria.</span>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
        <XAxis dataKey="year" stroke="#b5eaff" />
        <YAxis stroke="#b5eaff" tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Bar dataKey="value" name={INDICATORS.find(i => i.value === indicator)?.label || 'Value'} fill="#00e6d6" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DashboardCharts;
