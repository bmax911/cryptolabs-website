import React, { useState, useEffect } from 'react';

// Helper to fetch from Netlify Function
async function fetchFred(endpoint, params = {}) {
  const url = new URL('/.netlify/functions/get-fred', window.location.origin);
  url.searchParams.set('endpoint', endpoint);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error('FRED API error');
  return res.json();
}


const FredDataPage = () => {
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [releaseSeries, setReleaseSeries] = useState([]);
  const [seriesObservations, setSeriesObservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load all releases on mount
  useEffect(() => {
    setLoading(true);
    fetchFred('releases')
      .then(data => {
        console.log('FRED releases response:', data);
        if (data.error) {
          setError(`FRED API error: ${data.error}`);
          setReleases([]);
        } else if (Array.isArray(data.releases)) {
          setReleases(data.releases);
        } else {
          setError('Unexpected response structure');
          setReleases([]);
        }
      })
      .catch(err => {
        setError('Failed to load releases: ' + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Load series for selected release
  useEffect(() => {
    if (!selectedRelease) return;
    setLoading(true);
    fetchFred('release/series', { release_id: selectedRelease.id })
      .then(data => setReleaseSeries(data.seriess || []))
      .catch(() => setError('Failed to load series for release'))
      .finally(() => setLoading(false));
  }, [selectedRelease]);

  // Load observations for a selected series
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
        {/* Releases */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Releases</h2>
          {loading && !releases.length ? <div>Loading...</div> : null}
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {releases.map(release => (
              <li key={release.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 ${selectedRelease?.id === release.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800'}`}
                  onClick={() => setSelectedRelease(release)}
                >
                  {release.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Series for Release */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Series</h2>
          {loading && selectedRelease && !releaseSeries.length ? <div>Loading...</div> : null}
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {releaseSeries.map(s => (
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
