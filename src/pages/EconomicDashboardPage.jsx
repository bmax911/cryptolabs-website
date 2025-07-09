import React, { useState } from 'react';
import './EconomicDashboardPage.css';

// Configuration for our form fields
const INDICATORS = {
  REAL_GDP: 'Real GDP',
  REAL_GDP_PER_CAPITA: 'Real GDP Per Capita',
  TREASURY_YIELD: 'Treasury Yield',
  FEDERAL_FUNDS_RATE: 'Federal Funds Rate',
  CPI: 'Consumer Price Index (CPI)',
  INFLATION: 'Inflation',
  RETAIL_SALES: 'Retail Sales',
  DURABLES: 'Durable Goods Orders',
  UNEMPLOYMENT: 'Unemployment Rate',
  NONFARM_PAYROLL: 'Nonfarm Payroll',
};

function EconomicDashboardPage() {
  // State for form inputs
  const [selectedIndicator, setSelectedIndicator] = useState('REAL_GDP');
  const [yieldInterval, setYieldInterval] = useState('monthly');
  const [yieldMaturity, setYieldMaturity] = useState('10year');
  
  // State for API data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    // Build the query to our own serverless function
    const params = new URLSearchParams({
      indicator: selectedIndicator,
    });
    
    // Add specific params for Treasury Yield if selected
    if (selectedIndicator === 'TREASURY_YIELD') {
      params.append('interval', yieldInterval);
      params.append('maturity', yieldMaturity);
    }
    
    // The endpoint for our serverless function
    const endpoint = `/api/fetchEconomicData?${params.toString()}`;

    try {
      const response = await fetch(endpoint);
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      // The actual data points are in the 'data' property of the response
      setData(result.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>U.S. Macroeconomic Indicators</h1>
        <p>Powered by the Alpha Vantage API</p>
      </header>

      <form onSubmit={handleFetchData} className="controls-form">
        <div className="form-group">
          <label htmlFor="indicator-select">Select an Indicator:</label>
          <select
            id="indicator-select"
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
          >
            {Object.entries(INDICATORS).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Conditional fields for Treasury Yield */}
        {selectedIndicator === 'TREASURY_YIELD' && (
          <div className="conditional-fields">
            <div className="form-group">
              <label htmlFor="interval-select">Interval:</label>
              <select id="interval-select" value={yieldInterval} onChange={e => setYieldInterval(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maturity-select">Maturity:</label>
              <select id="maturity-select" value={yieldMaturity} onChange={e => setYieldMaturity(e.target.value)}>
                <option value="3month">3-Month</option>
                <option value="2year">2-Year</option>
                <option value="5year">5-Year</option>
                <option value="7year">7-Year</option>
                <option value="10year">10-Year</option>
                <option value="30year">30-Year</option>
              </select>
            </div>
          </div>
        )}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Get Data'}
        </button>
      </form>

      <div className="results-container">
        {loading && <div className="loading-spinner"></div>}
        {error && <div className="error-message">Error: {error}</div>}
        {data && (
          <div className="data-table-container">
            <h3>Results for: {INDICATORS[selectedIndicator]}</h3>
            {data.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 50).map((item, index) => ( // Show first 50 results
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data returned for this selection. This may be due to API limits or data availability.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EconomicDashboardPage;