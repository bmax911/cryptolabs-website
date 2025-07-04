import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7');

  // Fetch coin details
  const fetchCoinDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`,
        {
          headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
        }
      );
      
      if (!response.ok) {
        throw new Error('Coin not found');
      }
      
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch price history
  const fetchPriceHistory = async (days = 7) => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${days <= 1 ? 'hourly' : 'daily'}`,
        {
          headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch price history');
      }
      
      const data = await response.json();
      setPriceHistory(data.prices);
    } catch (error) {
      console.error('Error fetching price history:', error);
    }
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCoinDetails(),
        fetchPriceHistory(selectedTimeframe)
      ]);
      setLoading(false);
    };

    if (id) {
      loadData();
    }
  }, [id, selectedTimeframe]);

  // Format helpers
  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 10) return `$${price.toFixed(3)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return '0.00%';
    const formatted = Math.abs(percentage).toFixed(2);
    return `${percentage >= 0 ? '+' : '-'}${formatted}%`;
  };

  const getPercentageColor = (percentage) => {
    if (!percentage) return 'text-gray-400';
    return percentage >= 0 ? 'text-green-400' : 'text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-gradient">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="pricing-card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading coin details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen animated-gradient">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="pricing-card p-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/overview')}
              className="pricing-cta primary"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!coinData) return null;

  return (
    <div className="min-h-screen animated-gradient">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/overview')}
            className="mb-6 flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>←</span>
            <span>Back to Overview</span>
          </button>

          {/* Coin Header */}
          <div className="crypto-trending-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={coinData.image?.large} 
                  alt={coinData.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{coinData.name}</h1>
                  <p className="text-xl text-gray-400 uppercase">{coinData.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white mb-2">
                  {formatPrice(coinData.market_data?.current_price?.usd || 0)}
                </p>
                <p className={`text-lg font-semibold ${getPercentageColor(coinData.market_data?.price_change_percentage_24h)}`}>
                  {formatPercentage(coinData.market_data?.price_change_percentage_24h)}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                <p className="text-lg font-semibold text-white">
                  {formatMarketCap(coinData.market_data?.market_cap?.usd || 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">24h Volume</p>
                <p className="text-lg font-semibold text-white">
                  {formatMarketCap(coinData.market_data?.total_volume?.usd || 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Market Rank</p>
                <p className="text-lg font-semibold text-white">
                  #{coinData.market_cap_rank || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Price Chart Timeframe Selector */}
          <div className="mb-6">
            <div className="flex justify-center space-x-2">
              {[
                { value: '1', label: '24H' },
                { value: '7', label: '7D' },
                { value: '30', label: '30D' },
                { value: '90', label: '90D' },
                { value: '365', label: '1Y' }
              ].map(timeframe => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`crypto-tab ${selectedTimeframe === timeframe.value ? 'active' : ''}`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Chart Placeholder */}
          <div className="crypto-trending-card mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Price Chart</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
              <p className="text-gray-400">Chart visualization would be implemented here</p>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Market Data */}
            <div className="crypto-trending-card">
              <h3 className="text-xl font-bold text-white mb-4">Market Data</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">All-Time High</span>
                  <span className="text-white font-semibold">
                    {formatPrice(coinData.market_data?.ath?.usd || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">All-Time Low</span>
                  <span className="text-white font-semibold">
                    {formatPrice(coinData.market_data?.atl?.usd || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="text-white font-semibold">
                    {(coinData.market_data?.circulating_supply || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="text-white font-semibold">
                    {(coinData.market_data?.total_supply || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Supply</span>
                  <span className="text-white font-semibold">
                    {coinData.market_data?.max_supply ? 
                      coinData.market_data.max_supply.toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Community & Developer Stats */}
            <div className="crypto-trending-card">
              <h3 className="text-xl font-bold text-white mb-4">Community & Development</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Community Score</span>
                  <span className="text-white font-semibold">
                    {coinData.community_score ? coinData.community_score.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Developer Score</span>
                  <span className="text-white font-semibold">
                    {coinData.developer_score ? coinData.developer_score.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GitHub Stars</span>
                  <span className="text-white font-semibold">
                    {coinData.developer_data?.stars || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GitHub Forks</span>
                  <span className="text-white font-semibold">
                    {coinData.developer_data?.forks || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sentiment Score</span>
                  <span className="text-white font-semibold">
                    {coinData.sentiment_votes_up_percentage ? 
                      `${coinData.sentiment_votes_up_percentage.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {coinData.description?.en && (
            <div className="crypto-trending-card mb-8">
              <h3 className="text-xl font-bold text-white mb-4">About {coinData.name}</h3>
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: coinData.description.en.split('. ')[0] + '.' 
                }}
              />
            </div>
          )}

          {/* Links */}
          <div className="crypto-trending-card">
            <h3 className="text-xl font-bold text-white mb-4">Links</h3>
            <div className="flex flex-wrap gap-4">
              {coinData.links?.homepage?.[0] && (
                <a 
                  href={coinData.links.homepage[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crypto-action-btn"
                >
                  🌐 Website
                </a>
              )}
              {coinData.links?.whitepaper && (
                <a 
                  href={coinData.links.whitepaper} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crypto-action-btn"
                >
                  📄 Whitepaper
                </a>
              )}
              {coinData.links?.blockchain_site?.[0] && (
                <a 
                  href={coinData.links.blockchain_site[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crypto-action-btn"
                >
                  🔗 Explorer
                </a>
              )}
              {coinData.links?.repos_url?.github?.[0] && (
                <a 
                  href={coinData.links.repos_url.github[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crypto-action-btn"
                >
                  📂 GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoinDetail;
