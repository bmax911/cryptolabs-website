import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

const DetailItem = ({ label, value, format }) => (
  <div className="flex justify-between border-b py-3 dark:border-slate-700">
    <span className="text-slate-500 dark:text-slate-400">{label}</span>
    <span className="font-semibold">{format ? format(value) : value || 'N/A'}</span>
  </div>
);

const formatPrice = (price) => price != null ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : 'N/A';
const formatLargeNumber = (num) => num != null ? num.toLocaleString() : 'N/A';
const formatMarketCap = (cap) => cap != null ? `$${cap.toLocaleString()}` : 'N/A';

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
          { headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {} }
        );
        if (!response.ok) throw new Error('Coin not found');
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCoinDetails();
  }, [id]);

  if (loading) return <div className="text-center p-12">Loading coin details...</div>;
  if (error) return (
      <div className="text-center p-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate('/overview')} className="rounded-md bg-blue-600 px-4 py-2 text-white">Back to Overview</button>
      </div>
  );

  if (!coinData) return null;

  const { market_data: md } = coinData;

  return (
    <div className="container mx-auto px-6 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline">
        ← Back to Overview
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <img src={coinData.image?.large} alt={coinData.name} className="h-16 w-16 rounded-full" />
        <div>
          <h1 className="text-3xl font-bold">{coinData.name} <span className="text-slate-500">{coinData.symbol.toUpperCase()}</span></h1>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold">{formatPrice(md?.current_price?.usd)}</span>
            <span className={`font-semibold ${md?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {md?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Market Data */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-white p-6 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Market Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <DetailItem label="Market Cap" value={md?.market_cap?.usd} format={formatMarketCap} />
              <DetailItem label="24h Volume" value={md?.total_volume?.usd} format={formatMarketCap} />
              <DetailItem label="Market Cap Rank" value={`#${coinData.market_cap_rank}`} />
              <DetailItem label="Circulating Supply" value={md?.circulating_supply} format={formatLargeNumber} />
              <DetailItem label="Total Supply" value={md?.total_supply} format={formatLargeNumber} />
              <DetailItem label="Max Supply" value={md?.max_supply} format={formatLargeNumber} />
              <DetailItem label="All-Time High" value={md?.ath?.usd} format={formatPrice} />
              <DetailItem label="All-Time Low" value={md?.atl?.usd} format={formatPrice} />
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">About {coinData.name}</h2>
            {coinData.description?.en ? (
              <div
                className="prose prose-sm dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: coinData.description.en.split('. ').slice(0, 3).join('. ') + '.' }}
              />
            ) : (
              <p>No description available.</p>
            )}
             {coinData.links?.homepage?.[0] && (
                <a 
                  href={coinData.links.homepage[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Visit Website →
                </a>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;