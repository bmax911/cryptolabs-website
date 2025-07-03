import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// It's crucial to keep your client ID in an environment variable for security.
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const Checkout = ({ currency, plan, price }) => {
    const navigate = useNavigate();
    if (!PAYPAL_CLIENT_ID) {
        console.error("PayPal Client ID is not defined. Please set VITE_PAYPAL_CLIENT_ID in your .env file.");
        return <div className="text-red-500 text-center">PayPal is not configured.</div>;
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `CryptoLabs ${plan} Plan`,
                    amount: {
                        currency_code: currency,
                        value: price,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}! You will now be redirected.`);
            console.log('Payment successful:', details);
            // Redirect to the main app URL after successful payment
            window.location.href = 'https://www.cryptolabs.cfd';
        });
    };

    const onError = (err) => {
        console.error("PayPal Checkout Error:", err);
        alert("An error occurred during the PayPal checkout. Please try again.");
    };

    return (
        <PayPalButtons
            style={{ layout: "vertical", color: 'blue', shape: 'rect', label: 'paypal' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
    );
};


const PricingPage = () => {
  const [currency, setCurrency] = useState('USD');
  const { isAuthenticated } = useAuth(); // Get authentication state

  // Base prices in USD with auto-calculated exchange rates
  const basePrice = {
    basic: 9.00,
    pro: 29.00,
    enterprise: 99.00,
    test: 0.01
  };

  // Exchange rates (these would typically come from an API)
  const exchangeRates = {
    USD: 1,
    EUR: 0.85, // 1 USD = 0.85 EUR
    USDT: 1.00 // 1 USD = 1.00 USDT (stable)
  };

  // Calculate prices based on exchange rates
  const prices = {
    USD: {
      basic: basePrice.basic.toFixed(2),
      pro: basePrice.pro.toFixed(2),
      enterprise: basePrice.enterprise.toFixed(2),
      test: basePrice.test.toFixed(2)
    },
    EUR: {
      basic: (basePrice.basic * exchangeRates.EUR).toFixed(2),
      pro: (basePrice.pro * exchangeRates.EUR).toFixed(2),
      enterprise: (basePrice.enterprise * exchangeRates.EUR).toFixed(2),
      test: (basePrice.test * exchangeRates.EUR).toFixed(2)
    },
    USDT: {
      basic: (basePrice.basic * exchangeRates.USDT).toFixed(2),
      pro: (basePrice.pro * exchangeRates.USDT).toFixed(2),
      enterprise: (basePrice.enterprise * exchangeRates.USDT).toFixed(2),
      test: (basePrice.test * exchangeRates.USDT).toFixed(2)
    }
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    USDT: '₮',
  };

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: currency }}>
        <div className="antialiased">
        <Header />

      {/* PRICING SECTION */}
      <main className="min-h-screen animated-gradient pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">Simple, transparent pricing. No hidden fees. Cancel anytime.</p>

          {/* Currency Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 rounded-full p-1 flex space-x-1">
              <button onClick={() => setCurrency('USD')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${currency === 'USD' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>USD</button>
              <button onClick={() => setCurrency('EUR')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${currency === 'EUR' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>EUR</button>
              <button onClick={() => setCurrency('USDT')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${currency === 'USDT' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>USDT</button>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col relative">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">BASIC</h2>
                <p className="text-cyan-400 font-semibold mb-2">Get Started, Stay Smart</p>
                <p className="text-gray-400 text-sm mb-4">Perfect for casual traders and curious learners.</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {currencySymbols[currency]}{prices[currency].basic}
                  <span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <p className="text-xs text-gray-500">(or Free with account)</p>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-grow">
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Up to 90% fee cashback (Binance, OKX, etc.)</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Access to Lite Trading Charts</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>AI Assistant – Quick Mode (3 queries/day)</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Trading Diary – Basic Canvas (Text, Notes, Daily Entry Limit)</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Create Unlimited Custom Watchlist</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>View Top 5 Macroeconomic Indicators</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Email summary every 2 days</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Access to Community Forum</span></li>
                <li className="flex items-start"><span className="text-green-400 mr-3 mt-0.5">✅</span><span>Mobile-friendly Dashboard</span></li>
              </ul>
              
              <div className="mb-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-cyan-300 text-sm"><span className="font-bold">🚀 Great for:</span> New traders, students, or passive investors who want insights without overwhelm.</p>
              </div>
              
              <div className="mt-auto">
                {isAuthenticated() ? (
                    currency !== 'USDT' ? (
                        <Checkout currency={currency} plan="Basic" price={prices[currency].basic} />
                    ) : (
                        <Link to="/signup" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-md transition-colors block">Get Started with USDT</Link>
                    )
                ) : (
                    <Link to="/signup" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-md transition-colors block">Login to Purchase</Link>
                )}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col border-2 border-cyan-500 relative scale-105 lg:scale-110">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">MOST POPULAR</div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">PRO</h2>
                <p className="text-cyan-400 font-semibold mb-2">For the Daily Hustlers</p>
                <p className="text-gray-400 text-sm mb-4">Ideal for active traders and investors who want insights and automation.</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {currencySymbols[currency]}{prices[currency].pro}
                  <span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-grow">
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Up to 90% trading fee cashback</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Pro Chart Tools (multi-screen layout, drawing tools, auto pattern detection)</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>AI Assistant – Smart Mode (50 queries/day, trade strategy generation)</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Trading Diary – Smart Canvas (notes, uploads, AI auto-summarization)</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Add up to 5 Watchlists with alerts</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Full World Bank Macro Dashboard (real-time indicators, trend alerts)</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Email + App Daily Report</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Weekly Portfolio Review by AI</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Customize dashboard layout and theme</span></li>
                <li className="flex items-start"><span className="text-orange-400 mr-3 mt-0.5">🔥</span><span>Priority support</span></li>
              </ul>
              
              <div className="mb-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <p className="text-orange-300 text-sm"><span className="font-bold">⚖️ Built for:</span> Swing traders, technical analysts, smart investors, and crypto explorers.</p>
              </div>
              
              <div className="mt-auto">
                 {isAuthenticated() ? (
                    currency !== 'USDT' ? (
                        <Checkout currency={currency} plan="Pro" price={prices[currency].pro} />
                    ) : (
                        <Link to="/signup" className="w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-5 rounded-md transition-colors block">Choose Pro with USDT</Link>
                    )
                ) : (
                    <Link to="/signup" className="w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-5 rounded-md transition-colors block">Login to Purchase</Link>
                )}
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">ENTERPRISE</h2>
                <p className="text-purple-400 font-semibold mb-2">Your Trading Brain, Fully Upgraded</p>
                <p className="text-gray-400 text-sm mb-4">For professional traders, funds, or advanced users who demand it all.</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {currencySymbols[currency]}{prices[currency].enterprise}
                  <span className="text-lg font-normal text-gray-400">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-grow">
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Up to 90% fee cashback across all supported exchanges</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Institutional-grade Chart Suite + advanced indicators</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>AI Assistant – Deep Dive Mode (unlimited queries, long-form reasoning, cross-market analysis)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Trading Diary – Pro Canvas (attachments, voice notes, visual markup, AI timeline tracking)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Unlimited Watchlists + Smart Alerts</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Macro Data AI Correlation Engine (see how macro shifts impact your trades)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>End-of-day Executive Summary Reports (PDF, dashboard)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Early access to Beta Tools & Features</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>Team Collaboration Tools (share diary, watchlists, notes)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>1-on-1 Strategy Session (monthly with AI or human analyst)</span></li>
                <li className="flex items-start"><span className="text-purple-400 mr-3 mt-0.5">💎</span><span>24/7 Premium Support</span></li>
              </ul>
              
              <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-purple-300 text-sm"><span className="font-bold">🧠 Designed for:</span> Professional traders, funds, crypto businesses, or any user serious about high-performance trading.</p>
              </div>
              
              <a href="mailto:support@zephyrboost.com" className="mt-auto w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-5 rounded-md transition-colors block">Contact Us</a>
            </div>

            {/* Test Plan - Only shows in development */}
            {import.meta.env.DEV && (
              <div className="lg:col-span-3 max-w-md mx-auto">
                <div className="feature-card p-6 rounded-xl flex flex-col border-2 border-dashed border-yellow-500">
                  <h2 className="text-xl font-bold text-yellow-500 mb-2">Test Plan</h2>
                  <p className="text-gray-400 mb-4 text-sm">For testing purposes only</p>
                  <div className="text-3xl font-bold text-white mb-4">{currencySymbols[currency]}{prices[currency].test}<span className="text-sm font-normal text-gray-400">/month</span></div>
                  <ul className="space-y-2 text-gray-300 mb-6 flex-grow">
                    <li className="flex items-center text-sm"><svg className="w-4 h-4 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Full functionality</li>
                  </ul>
                  <div className="mt-auto">
                    {isAuthenticated() ? (
                        currency !== 'USDT' ? (
                            <Checkout currency={currency} plan="Test" price={prices[currency].test} />
                        ) : (
                            <p className="text-yellow-500 text-center text-sm">USDT not available for test plan.</p>
                        )
                    ) : (
                        <Link to="/signup" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors block text-sm">Login to Purchase</Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </PayPalScriptProvider>
  );
};

export default PricingPage;
