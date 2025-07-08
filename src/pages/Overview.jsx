import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

const StatCard = ({ title, value, change }) => (
  <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-800">
    <h3 className="text-sm text-slate-500 dark:text-slate-400">{title}</h3>
    <p className="mt-1 text-2xl font-bold">{value}</p>
    {change && (
      <p className={`mt-1 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change.toFixed(2)}%
      </p>
    )}
  </div>
);

const CoinsTable = ({ coins, addToWatchlist }) => {
  const formatPrice = (price) => price != null ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : 'N/A';
  const formatMarketCap = (cap) => cap != null ? `$${(cap / 1_000_000_000).toFixed(2)}B` : 'N/A';
  
  return (
    <div className="overflow-x-auto rounded-lg border bg-white dark:bg-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Coin</th>
            <th className="p-4 text-right">Price</th>
            <th className="p-4 text-right">24h %</th>
            <th className="p-4 text-right">Market Cap</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="p-4 text-slate-500">{coin.market_cap_rank}</td>
              <td className="p-4">
                <Link to={`/coin/${coin.id}`} className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-xs text-slate-500">{coin.symbol.toUpperCase()}</div>
                  </div>
                </Link>
              </td>
              <td className="p-4 text-right font-medium">{formatPrice(coin.current_price)}</td>
              <td className={`p-4 text-right font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="p-4 text-right">{formatMarketCap(coin.market_cap)}</td>
              <td className="p-4 text-center">
                <button onClick={() => addToWatchlist(coin)} title="Add to Watchlist" className="text-lg">⭐</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Overview = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketData, setMarketData] = useState({ globalStats: null, topCoins: [] });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {};
        
        const [globalRes, coinsRes] = await Promise.all([
          fetch(`${BASE_URL}/global`, { headers }),
          fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`, { headers })
        ]);

        if (!globalRes.ok || !coinsRes.ok) throw new Error('Failed to fetch market data.');

        const globalData = await globalRes.json();
        const coinsData = await coinsRes.json();

        setMarketData({ globalStats: globalData.data, topCoins: coinsData });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToWatchlist = (coin) => {
    if (!watchlist.find(c => c.id === coin.id)) {
      const newWatchlist = [...watchlist, coin];
      setWatchlist(newWatchlist);
      if (isAuthenticated()) {
        localStorage.setItem('crypto_watchlist', JSON.stringify(newWatchlist));
      }
      alert(`${coin.name} added to watchlist!`);
    } else {
      alert(`${coin.name} is already in your watchlist.`);
    }
  };

  if (loading) return <div className="text-center p-12">Loading market data...</div>;
  if (error) return <div className="text-center p-12 text-red-500">{error}</div>;

  const { globalStats, topCoins } = marketData;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">Crypto Market Overview</h1>
      
      {globalStats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Market Cap"
            value={`$${(globalStats.total_market_cap.usd / 1_000_000_000_000).toFixed(2)}T`}
            change={globalStats.market_cap_change_percentage_24h_usd}
          />
          <StatCard title="24h Volume" value={`$${(globalStats.total_volume.usd / 1_000_000_000).toFixed(2)}B`} />
          <StatCard title="BTC Dominance" value={`${globalStats.market_cap_percentage.btc.toFixed(1)}%`} />
          <StatCard title="Active Cryptos" value={globalStats.active_cryptocurrencies.toLocaleString()} />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Top 50 Cryptocurrencies</h2>
      <CoinsTable coins={topCoins} addToWatchlist={addToWatchlist} />
    </div>
  );
};

export default Overview;