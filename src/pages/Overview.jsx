import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

const Overview = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Market Data State
  const [marketData, setMarketData] = useState({
    globalStats: null,
    topCoins: [],
    trending: [],
    gainersLosers: { gainers: [], losers: [] }
  });
  
  // Filters and Settings
  const [filters, setFilters] = useState({
    category: 'all',
    timeFrame: '24h',
    sortBy: 'market_cap_desc',
    showCount: 50
  });
  
  // Watchlist State
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({
    coinId: '',
    amount: '',
    purchasePrice: ''
  });

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All', icon: '🌐' },
    { id: 'decentralized-finance-defi', name: 'DeFi', icon: '🏦' },
    { id: 'artificial-intelligence', name: 'AI', icon: '🤖' },
    { id: 'layer-1', name: 'Layer 1', icon: '⛓️' },
    { id: 'smart-contract-platform', name: 'Smart Contracts', icon: '📝' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'metaverse', name: 'Metaverse', icon: '🌐' },
    { id: 'meme-token', name: 'Meme', icon: '🐕' }
  ];

  // Fetch Global Market Data
  const fetchGlobalData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/global`, {
        headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching global data:', error);
      return null;
    }
  };

  // Fetch Top Coins
  const fetchTopCoins = async () => {
    try {
      const categoryParam = filters.category !== 'all' ? `&category=${filters.category}` : '';
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=${filters.sortBy}&per_page=${filters.showCount}&page=1&sparkline=true&price_change_percentage=1h,24h,7d${categoryParam}`,
        {
          headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top coins:', error);
      return [];
    }
  };

  // Fetch Trending Coins
  const fetchTrending = async () => {
    try {
      const response = await fetch(`${BASE_URL}/search/trending`, {
        headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
      });
      const data = await response.json();
      return data.coins || [];
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      return [];
    }
  };

  // Fetch Gainers and Losers with volume analysis
  const fetchGainersLosers = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h,7d`,
        {
          headers: COINGECKO_API_KEY ? { 'x-cg-demo-api-key': COINGECKO_API_KEY } : {}
        }
      );
      const data = await response.json();
      
      const gainers = data
        .filter(coin => coin.price_change_percentage_24h > 0)
        .slice(0, 10);
      
      const losers = data
        .filter(coin => coin.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 10);

      // Calculate volume spikes (coins with volume > 2x their typical volume)
      const volumeSpikes = data
        .filter(coin => {
          const avgVolume = coin.market_cap * 0.1; // Rough estimate
          return coin.total_volume > avgVolume * 2;
        })
        .sort((a, b) => (b.total_volume / (b.market_cap * 0.1)) - (a.total_volume / (a.market_cap * 0.1)))
        .slice(0, 10);
      
      return { gainers, losers, volumeSpikes };
    } catch (error) {
      console.error('Error fetching gainers/losers:', error);
      return { gainers: [], losers: [], volumeSpikes: [] };
    }
  };

  // Load all data
  const loadData = async () => {
    setLoading(true);
    try {
      const [globalStats, topCoins, trending, gainersLosers] = await Promise.all([
        fetchGlobalData(),
        fetchTopCoins(),
        fetchTrending(),
        fetchGainersLosers()
      ]);

      setMarketData({
        globalStats,
        topCoins,
        trending,
        gainersLosers
      });
    } catch (error) {
      setError('Failed to load market data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Watchlist Functions
  const addToWatchlist = (coin) => {
    if (!watchlist.find(item => item.id === coin.id)) {
      const newWatchlist = [...watchlist, coin];
      setWatchlist(newWatchlist);
      if (isAuthenticated()) {
        localStorage.setItem('crypto_watchlist', JSON.stringify(newWatchlist));
      }
    }
  };

  const removeFromWatchlist = (coinId) => {
    const newWatchlist = watchlist.filter(item => item.id !== coinId);
    setWatchlist(newWatchlist);
    if (isAuthenticated()) {
      localStorage.setItem('crypto_watchlist', JSON.stringify(newWatchlist));
    }
  };

  // Portfolio Functions
  const addToPortfolio = (coin, amount, purchasePrice) => {
    const portfolioItem = {
      ...coin,
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice),
      purchaseValue: parseFloat(amount) * parseFloat(purchasePrice),
      addedAt: new Date().toISOString()
    };
    
    const newPortfolio = [...portfolio, portfolioItem];
    setPortfolio(newPortfolio);
    if (isAuthenticated()) {
      localStorage.setItem('crypto_portfolio', JSON.stringify(newPortfolio));
    }
  };

  const removeFromPortfolio = (coinId) => {
    const newPortfolio = portfolio.filter(item => item.id !== coinId);
    setPortfolio(newPortfolio);
    if (isAuthenticated()) {
      localStorage.setItem('crypto_portfolio', JSON.stringify(newPortfolio));
    }
  };

  const calculatePortfolioStats = () => {
    let totalValue = 0;
    let totalCost = 0;
    let totalPnL = 0;

    portfolio.forEach(item => {
      const currentValue = item.amount * (item.current_price || 0);
      const cost = item.purchaseValue;
      totalValue += currentValue;
      totalCost += cost;
      totalPnL += (currentValue - cost);
    });

    return {
      totalValue,
      totalCost,
      totalPnL,
      totalPnLPercentage: totalCost > 0 ? ((totalPnL / totalCost) * 100) : 0
    };
  };

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

  const getTrendIcon = (percentage) => {
    if (!percentage) return '→';
    return percentage >= 0 ? '↗️' : '↘️';
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    loadData();
  }, [filters.category, filters.sortBy, filters.showCount]);

  // Load saved watchlist and portfolio
  useEffect(() => {
    if (isAuthenticated()) {
      const savedWatchlist = localStorage.getItem('crypto_watchlist');
      const savedPortfolio = localStorage.getItem('crypto_portfolio');
      
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
      if (savedPortfolio) {
        setPortfolio(JSON.parse(savedPortfolio));
      }
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen animated-gradient">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="pricing-card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading market data...</p>
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
              onClick={loadData}
              className="pricing-cta primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-gradient">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="pricing-title text-5xl font-bold text-white mb-4">
              Crypto Market Overview
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time cryptocurrency market data, trends, and portfolio tracking
            </p>
          </div>

          {/* Global Market Stats */}
          {marketData.globalStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="stat-card p-6">
                <div className="stat-glow"></div>
                <div className="text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Total Market Cap</h3>
                  <p className="text-2xl font-bold text-white">
                    {formatMarketCap(marketData.globalStats.total_market_cap.usd)}
                  </p>
                  <p className={`text-sm ${getPercentageColor(marketData.globalStats.market_cap_change_percentage_24h_usd)}`}>
                    {formatPercentage(marketData.globalStats.market_cap_change_percentage_24h_usd)}
                  </p>
                </div>
              </div>

              <div className="stat-card p-6">
                <div className="stat-glow"></div>
                <div className="text-center">
                  <h3 className="text-gray-400 text-sm mb-2">24h Volume</h3>
                  <p className="text-2xl font-bold text-white">
                    {formatMarketCap(marketData.globalStats.total_volume.usd)}
                  </p>
                </div>
              </div>

              <div className="stat-card p-6">
                <div className="stat-glow"></div>
                <div className="text-center">
                  <h3 className="text-gray-400 text-sm mb-2">BTC Dominance</h3>
                  <p className="text-2xl font-bold text-white">
                    {marketData.globalStats.market_cap_percentage.btc.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="stat-card p-6">
                <div className="stat-glow"></div>
                <div className="text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Active Cryptocurrencies</h3>
                  <p className="text-2xl font-bold text-white">
                    {marketData.globalStats.active_cryptocurrencies.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="crypto-tabs mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'overview', name: 'Market Overview', icon: '📊' },
                { id: 'trending', name: 'Trending', icon: '🔥' },
                { id: 'gainers', name: 'Gainers & Losers', icon: '📈' },
                { id: 'volume', name: 'Volume Spikes', icon: '🐋' },
                { id: 'watchlist', name: 'Watchlist', icon: '⭐' },
                { id: 'portfolio', name: 'Portfolio', icon: '💼' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`crypto-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div>
              {/* Filters */}
              <div className="crypto-filters mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="crypto-select"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="crypto-select"
                    >
                      <option value="market_cap_desc">Market Cap</option>
                      <option value="volume_desc">Volume</option>
                      <option value="price_change_percentage_24h_desc">24h Change</option>
                      <option value="price_desc">Price</option>
                    </select>
                  </div>

                  {/* Show Count */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Show</label>
                    <select
                      value={filters.showCount}
                      onChange={(e) => setFilters({...filters, showCount: parseInt(e.target.value)})}
                      className="crypto-select"
                    >
                      <option value={25}>Top 25</option>
                      <option value={50}>Top 50</option>
                      <option value={100}>Top 100</option>
                    </select>
                  </div>

                  {/* Search */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search coins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="crypto-search"
                    />
                  </div>
                </div>
              </div>

              {/* Coins Table */}
              <div className="crypto-table-container">
                <div className="crypto-table">
                  <div className="crypto-table-header">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-3">Coin</div>
                      <div className="col-span-2 text-right">Price</div>
                      <div className="col-span-2 text-right">24h Change</div>
                      <div className="col-span-2 text-right">Market Cap</div>
                      <div className="col-span-1 text-right">Volume</div>
                      <div className="col-span-1 text-center">Actions</div>
                    </div>
                  </div>

                  <div className="crypto-table-body">
                    {marketData.topCoins
                      .filter(coin => 
                        searchTerm === '' || 
                        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((coin, index) => (
                        <div key={coin.id} className="crypto-table-row">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 text-center text-gray-400">
                              {coin.market_cap_rank}
                            </div>
                            
                            <Link 
                              to={`/coin/${coin.id}`} 
                              className="col-span-3 flex items-center space-x-3 hover:text-cyan-400 transition-colors"
                            >
                              <img 
                                src={coin.image} 
                                alt={coin.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-semibold text-white">{coin.name}</p>
                                <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                              </div>
                            </Link>
                            
                            <div className="col-span-2 text-right">
                              <p className="font-semibold text-white">{formatPrice(coin.current_price)}</p>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <p className={`font-semibold ${getPercentageColor(coin.price_change_percentage_24h)}`}>
                                {getTrendIcon(coin.price_change_percentage_24h)} {formatPercentage(coin.price_change_percentage_24h)}
                              </p>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <p className="text-gray-300">{formatMarketCap(coin.market_cap)}</p>
                            </div>
                            
                            <div className="col-span-1 text-right">
                              <p className="text-gray-300 text-sm">{formatMarketCap(coin.total_volume)}</p>
                            </div>
                            
                            <div className="col-span-1 text-center">
                              <button
                                onClick={() => addToWatchlist(coin)}
                                className="crypto-action-btn"
                                title="Add to Watchlist"
                              >
                                ⭐
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.trending.map((item, index) => (
                <div key={item.item.id} className="crypto-trending-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-cyan-400">#{index + 1}</span>
                      <img 
                        src={item.item.large} 
                        alt={item.item.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.item.name}</p>
                        <p className="text-sm text-gray-400 uppercase">{item.item.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Rank</p>
                      <p className="font-semibold text-white">#{item.item.market_cap_rank}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Price (BTC)</p>
                      <p className="font-semibold text-white">{item.item.price_btc.toFixed(8)}</p>
                    </div>
                    <button
                      onClick={() => addToWatchlist({
                        id: item.item.id,
                        name: item.item.name,
                        symbol: item.item.symbol,
                        image: item.item.large,
                        current_price: 0,
                        market_cap_rank: item.item.market_cap_rank
                      })}
                      className="crypto-action-btn"
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gainers & Losers Tab */}
          {activeTab === 'gainers' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Gainers */}
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                  📈 Top Gainers (24h)
                </h3>
                <div className="space-y-4">
                  {marketData.gainersLosers.gainers.map((coin, index) => (
                    <div key={coin.id} className="crypto-gainer-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-green-400">#{index + 1}</span>
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-semibold text-white">{coin.name}</p>
                            <p className="text-sm text-gray-400">{formatPrice(coin.current_price)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">
                            +{formatPercentage(coin.price_change_percentage_24h)}
                          </p>
                          <p className="text-xs text-gray-400">
                            1h: {formatPercentage(coin.price_change_percentage_1h_in_currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Losers */}
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
                  📉 Top Losers (24h)
                </h3>
                <div className="space-y-4">
                  {marketData.gainersLosers.losers.map((coin, index) => (
                    <div key={coin.id} className="crypto-loser-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-red-400">#{index + 1}</span>
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-semibold text-white">{coin.name}</p>
                            <p className="text-sm text-gray-400">{formatPrice(coin.current_price)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-400">
                            {formatPercentage(coin.price_change_percentage_24h)}
                          </p>
                          <p className="text-xs text-gray-400">
                            1h: {formatPercentage(coin.price_change_percentage_1h_in_currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Volume Spikes Tab */}
          {activeTab === 'volume' && (
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                🐋 Volume Spikes (Whale Activity)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketData.gainersLosers.volumeSpikes?.map((coin, index) => (
                  <div key={coin.id} className="crypto-trending-card border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-white">{coin.name}</p>
                          <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Volume</p>
                        <p className="font-semibold text-purple-400">{formatMarketCap(coin.total_volume)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Price</p>
                        <p className="font-semibold text-white">{formatPrice(coin.current_price)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">24h Change</p>
                        <p className={`font-semibold ${getPercentageColor(coin.price_change_percentage_24h)}`}>
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-purple-900/20 rounded-lg">
                      <p className="text-xs text-purple-300">
                        🚨 High volume activity detected - potential whale movement
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && (
            <div>
              {!isAuthenticated() ? (
                <div className="text-center py-12">
                  <div className="pricing-card p-8 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">Login Required</h3>
                    <p className="text-gray-300 mb-6">
                      Please login to save and access your watchlist across devices.
                    </p>
                    <Link to="/login" className="pricing-cta primary">
                      Login to Continue
                    </Link>
                  </div>
                </div>
              ) : watchlist.length === 0 ? (
                <div className="text-center py-12">
                  <div className="pricing-card p-8 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">Empty Watchlist</h3>
                    <p className="text-gray-300 mb-6">
                      Add cryptocurrencies to your watchlist to track their performance.
                    </p>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className="pricing-cta primary"
                    >
                      Browse Cryptocurrencies
                    </button>
                  </div>
                </div>
              ) : (
                <div className="crypto-table-container">
                  <div className="crypto-table">
                    <div className="crypto-table-header">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-4">Coin</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-2 text-right">24h Change</div>
                        <div className="col-span-2 text-right">Market Cap</div>
                        <div className="col-span-1 text-center">Actions</div>
                      </div>
                    </div>

                    <div className="crypto-table-body">
                      {watchlist.map((coin, index) => (
                        <div key={coin.id} className="crypto-table-row">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 text-center text-gray-400">
                              {index + 1}
                            </div>
                            
                            <div className="col-span-4 flex items-center space-x-3">
                              <img 
                                src={coin.image} 
                                alt={coin.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-semibold text-white">{coin.name}</p>
                                <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                              </div>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <p className="font-semibold text-white">
                                {coin.current_price ? formatPrice(coin.current_price) : 'N/A'}
                              </p>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <p className={`font-semibold ${getPercentageColor(coin.price_change_percentage_24h)}`}>
                                {coin.price_change_percentage_24h ? formatPercentage(coin.price_change_percentage_24h) : 'N/A'}
                              </p>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <p className="text-gray-300">
                                {coin.market_cap ? formatMarketCap(coin.market_cap) : 'N/A'}
                              </p>
                            </div>
                            
                            <div className="col-span-1 text-center">
                              <button
                                onClick={() => removeFromWatchlist(coin.id)}
                                className="crypto-action-btn text-red-400 hover:text-red-300"
                                title="Remove from Watchlist"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div>
              {!isAuthenticated() ? (
                <div className="text-center py-12">
                  <div className="pricing-card p-8 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">Login Required</h3>
                    <p className="text-gray-300 mb-6">
                      Please login to save and access your portfolio across devices.
                    </p>
                    <Link to="/login" className="pricing-cta primary">
                      Login to Continue
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Portfolio Stats */}
                  {portfolio.length > 0 && (
                    <div className="portfolio-summary mb-8">
                      <div className="portfolio-card">
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Value</h3>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(calculatePortfolioStats().totalValue)}
                        </p>
                      </div>
                      <div className="portfolio-card">
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Cost</h3>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(calculatePortfolioStats().totalCost)}
                        </p>
                      </div>
                      <div className="portfolio-card">
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">Total P&L</h3>
                        <p className={`text-2xl font-bold ${getPercentageColor(calculatePortfolioStats().totalPnL)}`}>
                          {formatPrice(calculatePortfolioStats().totalPnL)}
                        </p>
                        <p className={`text-sm ${getPercentageColor(calculatePortfolioStats().totalPnL)}`}>
                          {formatPercentage(calculatePortfolioStats().totalPnLPercentage)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Add to Portfolio Button */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                      className="pricing-cta primary"
                    >
                      {showAddPortfolio ? 'Cancel' : 'Add to Portfolio'}
                    </button>
                  </div>

                  {/* Add Portfolio Form */}
                  {showAddPortfolio && (
                    <div className="crypto-trending-card mb-8">
                      <h3 className="text-xl font-bold text-white mb-4">Add to Portfolio</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Select Coin</label>
                          <select
                            value={portfolioForm.coinId}
                            onChange={(e) => setPortfolioForm({...portfolioForm, coinId: e.target.value})}
                            className="crypto-select"
                          >
                            <option value="">Select a coin</option>
                            {marketData.topCoins.map(coin => (
                              <option key={coin.id} value={coin.id}>
                                {coin.name} ({coin.symbol.toUpperCase()})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Amount</label>
                          <input
                            type="number"
                            step="0.00000001"
                            placeholder="0.00"
                            value={portfolioForm.amount}
                            onChange={(e) => setPortfolioForm({...portfolioForm, amount: e.target.value})}
                            className="crypto-search"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Purchase Price</label>
                          <input
                            type="number"
                            step="0.00000001"
                            placeholder="0.00"
                            value={portfolioForm.purchasePrice}
                            onChange={(e) => setPortfolioForm({...portfolioForm, purchasePrice: e.target.value})}
                            className="crypto-search"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const selectedCoin = marketData.topCoins.find(coin => coin.id === portfolioForm.coinId);
                          if (selectedCoin && portfolioForm.amount && portfolioForm.purchasePrice) {
                            addToPortfolio(selectedCoin, portfolioForm.amount, portfolioForm.purchasePrice);
                            setPortfolioForm({ coinId: '', amount: '', purchasePrice: '' });
                            setShowAddPortfolio(false);
                          }
                        }}
                        className="mt-4 pricing-cta primary"
                        disabled={!portfolioForm.coinId || !portfolioForm.amount || !portfolioForm.purchasePrice}
                      >
                        Add to Portfolio
                      </button>
                    </div>
                  )}

                  {/* Portfolio List */}
                  {portfolio.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="pricing-card p-8 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Empty Portfolio</h3>
                        <p className="text-gray-300 mb-6">
                          Add cryptocurrencies to your portfolio to track your investments.
                        </p>
                        <button
                          onClick={() => setShowAddPortfolio(true)}
                          className="pricing-cta primary"
                        >
                          Add First Investment
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="crypto-table-container">
                      <div className="crypto-table">
                        <div className="crypto-table-header">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">Coin</div>
                            <div className="col-span-2 text-right">Amount</div>
                            <div className="col-span-2 text-right">Avg Price</div>
                            <div className="col-span-2 text-right">Current Price</div>
                            <div className="col-span-2 text-right">P&L</div>
                            <div className="col-span-1 text-center">Actions</div>
                          </div>
                        </div>

                        <div className="crypto-table-body">
                          {portfolio.map((item, index) => {
                            const currentValue = item.amount * (item.current_price || 0);
                            const costValue = item.purchaseValue;
                            const pnl = currentValue - costValue;
                            const pnlPercentage = costValue > 0 ? ((pnl / costValue) * 100) : 0;

                            return (
                              <div key={`${item.id}-${index}`} className="crypto-table-row">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                  <div className="col-span-3 flex items-center space-x-3">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                      <p className="font-semibold text-white">{item.name}</p>
                                      <p className="text-sm text-gray-400 uppercase">{item.symbol}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="col-span-2 text-right">
                                    <p className="font-semibold text-white">{item.amount.toFixed(8)}</p>
                                  </div>
                                  
                                  <div className="col-span-2 text-right">
                                    <p className="text-gray-300">{formatPrice(item.purchasePrice)}</p>
                                  </div>
                                  
                                  <div className="col-span-2 text-right">
                                    <p className="font-semibold text-white">
                                      {item.current_price ? formatPrice(item.current_price) : 'N/A'}
                                    </p>
                                  </div>
                                  
                                  <div className="col-span-2 text-right">
                                    <p className={`font-semibold ${getPercentageColor(pnl)}`}>
                                      {formatPrice(pnl)}
                                    </p>
                                    <p className={`text-sm ${getPercentageColor(pnl)}`}>
                                      {formatPercentage(pnlPercentage)}
                                    </p>
                                  </div>
                                  
                                  <div className="col-span-1 text-center">
                                    <button
                                      onClick={() => removeFromPortfolio(item.id)}
                                      className="crypto-action-btn text-red-400 hover:text-red-300"
                                      title="Remove from Portfolio"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;
