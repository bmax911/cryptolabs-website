import React, { useState, useEffect } from 'react';

const FRED_API_KEY = import.meta.env.VITE_STLOUIS_FED_API;
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

// Helper to fetch from FRED API
async function fetchFred(endpoint, params = {}) {
  const url = new URL(`${FRED_BASE_URL}/${endpoint}`);
  url.searchParams.set('api_key', FRED_API_KEY);
  url.searchParams.set('file_type', 'json');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error('FRED API error');
  return res.json();
}

const FredDataPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [series, setSeries] = useState([]);
  const [seriesObservations, setSeriesObservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load root categories on mount
  useEffect(() => {
    setLoading(true);
    fetchFred('category/children', { category_id: 0 })
      .then(data => setCategories(data.categories || []))
      .catch(() => setError('Failed to load categories'))
      .finally(() => setLoading(false));
  }, []);

  // Load series when category selected
  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    fetchFred('category/series', { category_id: selectedCategory.id })
      .then(data => setSeries(data.series || []))
      .catch(() => setError('Failed to load series'))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // Load observations when a series is selected
  const handleSeriesClick = async (s) => {
    setLoading(true);
    setSeriesObservations(null);
    try {
      const data = await fetchFred('series/observations', { series_id: s.id });
      setSeriesObservations({
        series: s,
        observations: data.observations || []
      });
    } catch {
      setError('Failed to load observations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">FRED Economic Data Explorer</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          {loading && !categories.length ? <div>Loading...</div> : null}
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 ${selectedCategory?.id === cat.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Series */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Series</h2>
          {loading && selectedCategory && !series.length ? <div>Loading...</div> : null}
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {series.map(s => (
              <li key={s.id}>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 bg-white dark:bg-slate-800"
                  onClick={() => handleSeriesClick(s)}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Observations */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Observations</h2>
          {loading && seriesObservations ? <div>Loading...</div> : null}
          {seriesObservations ? (
            <div>
              <div className="font-bold mb-2">{seriesObservations.series.title}</div>
              <div className="overflow-x-auto max-h-96">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="px-2 py-1">Date</th>
                      <th className="px-2 py-1">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seriesObservations.observations.slice(-30).map(obs => (
                      <tr key={obs.date}>
                        <td className="px-2 py-1">{obs.date}</td>
                        <td className="px-2 py-1">{obs.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : <div className="text-slate-400">Select a series to view data.</div>}
        </div>
      </div>
    </div>
  );
};

export default FredDataPage;
