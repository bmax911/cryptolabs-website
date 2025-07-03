import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
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
  const trustStatsRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (trustStatsRef.current) {
      observer.observe(trustStatsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      <main className="min-h-screen animated-gradient pricing-container pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="pricing-title text-5xl lg:text-6xl font-bold text-white mb-6">Choose Your Plan</h1>
            <p className="pricing-subtitle text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Simple, transparent pricing. No hidden fees. Cancel anytime.
            </p>
            <p className="text-cyan-400 font-medium">Join thousands of traders already using CryptoLabs</p>
          </div>

          {/* Currency Switcher */}
          <div className="flex justify-center mb-16">
            <div className="currency-switcher flex space-x-2">
              <button 
                onClick={() => setCurrency('USD')} 
                className={`currency-button ${currency === 'USD' ? 'active' : 'text-gray-300 hover:text-white'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setCurrency('EUR')} 
                className={`currency-button ${currency === 'EUR' ? 'active' : 'text-gray-300 hover:text-white'}`}
              >
                EUR
              </button>
              <button 
                onClick={() => setCurrency('USDT')} 
                className={`currency-button ${currency === 'USDT' ? 'active' : 'text-gray-300 hover:text-white'}`}
              >
                USDT
              </button>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <div className="pricing-card p-8 flex flex-col relative">
              <div className="mb-8">
                <h2 className="pricing-title text-3xl font-bold text-white mb-3">BASIC</h2>
                <p className="pricing-subtitle text-cyan-400 font-semibold mb-3 text-lg">Get Started, Stay Smart</p>
                <p className="text-gray-300 mb-6">Perfect for casual traders and curious learners.</p>
                
                <div className="price-display">
                  <div className="price-amount">
                    {currencySymbols[currency]}{prices[currency].basic}
                  </div>
                  <span className="price-period">/month</span>
                </div>
                
                <p className="text-sm text-gray-400 mt-2">(or Free with account)</p>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-200 mb-8 flex-grow">
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Up to 90% fee cashback (Binance, OKX, etc.)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Access to Lite Trading Charts</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>AI Assistant – Quick Mode (3 queries/day)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Trading Diary – Basic Canvas (Text, Notes, Daily Entry Limit)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Create Unlimited Custom Watchlist</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>View Top 5 Macroeconomic Indicators</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Email summary every 2 days</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Access to Community Forum</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-green-400">✅</span>
                  <span>Mobile-friendly Dashboard</span>
                </li>
              </ul>
              
              <div className="plan-highlight bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <p className="text-cyan-300"><span className="font-bold">🚀 Great for:</span> New traders, students, or passive investors who want insights without overwhelm.</p>
              </div>
              
              <div className="mt-auto">
                {isAuthenticated() ? (
                    currency !== 'USDT' ? (
                        <Checkout currency={currency} plan="Basic" price={prices[currency].basic} />
                    ) : (
                        <Link to="/signup" className="pricing-cta">Get Started with USDT</Link>
                    )
                ) : (
                    <Link to="/signup" className="pricing-cta">Login to Purchase</Link>
                )}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card p-8 flex flex-col border-2 border-cyan-500 relative scale-105 lg:scale-110">
              <div className="popular-badge absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-sm font-bold px-6 py-3 shadow-lg">
                MOST POPULAR
              </div>
              
              <div className="mb-8 pt-4">
                <h2 className="pricing-title text-3xl font-bold text-white mb-3">PRO</h2>
                <p className="pricing-subtitle text-cyan-400 font-semibold mb-3 text-lg">For the Daily Hustlers</p>
                <p className="text-gray-300 mb-6">Ideal for active traders and investors who want insights and automation.</p>
                
                <div className="price-display">
                  <div className="price-amount">
                    {currencySymbols[currency]}{prices[currency].pro}
                  </div>
                  <span className="price-period">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-200 mb-8 flex-grow">
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Up to 90% trading fee cashback</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Pro Chart Tools (multi-screen layout, drawing tools, auto pattern detection)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>AI Assistant – Smart Mode (50 queries/day, trade strategy generation)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Trading Diary – Smart Canvas (notes, uploads, AI auto-summarization)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Add up to 5 Watchlists with alerts</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Full World Bank Macro Dashboard (real-time indicators, trend alerts)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Email + App Daily Report</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Weekly Portfolio Review by AI</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Customize dashboard layout and theme</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-orange-400">🔥</span>
                  <span>Priority support</span>
                </li>
              </ul>
              
              <div className="plan-highlight bg-orange-500/10 border border-orange-500/20 mb-6">
                <p className="text-orange-300"><span className="font-bold">⚖️ Built for:</span> Swing traders, technical analysts, smart investors, and crypto explorers.</p>
              </div>
              
              <div className="mt-auto">
                 {isAuthenticated() ? (
                    currency !== 'USDT' ? (
                        <Checkout currency={currency} plan="Pro" price={prices[currency].pro} />
                    ) : (
                        <Link to="/signup" className="pricing-cta primary">Choose Pro with USDT</Link>
                    )
                ) : (
                    <Link to="/signup" className="pricing-cta primary">Login to Purchase</Link>
                )}
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card p-8 flex flex-col">
              <div className="mb-8">
                <h2 className="pricing-title text-3xl font-bold text-white mb-3">ENTERPRISE</h2>
                <p className="pricing-subtitle text-purple-400 font-semibold mb-3 text-lg">Your Trading Brain, Fully Upgraded</p>
                <p className="text-gray-300 mb-6">For professional traders, funds, or advanced users who demand it all.</p>
                
                <div className="price-display">
                  <div className="price-amount">
                    {currencySymbols[currency]}{prices[currency].enterprise}
                  </div>
                  <span className="price-period">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-200 mb-8 flex-grow">
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Up to 90% fee cashback across all supported exchanges</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Institutional-grade Chart Suite + advanced indicators</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>AI Assistant – Deep Dive Mode (unlimited queries, long-form reasoning, cross-market analysis)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Trading Diary – Pro Canvas (attachments, voice notes, visual markup, AI timeline tracking)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Unlimited Watchlists + Smart Alerts</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Macro Data AI Correlation Engine (see how macro shifts impact your trades)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>End-of-day Executive Summary Reports (PDF, dashboard)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Early access to Beta Tools & Features</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>Team Collaboration Tools (share diary, watchlists, notes)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>1-on-1 Strategy Session (monthly with AI or human analyst)</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon text-purple-400">💎</span>
                  <span>24/7 Premium Support</span>
                </li>
              </ul>
              
              <div className="plan-highlight bg-purple-500/10 border border-purple-500/20 mb-6">
                <p className="text-purple-300"><span className="font-bold">🧠 Designed for:</span> Professional traders, funds, crypto businesses, or any user serious about high-performance trading.</p>
              </div>
              
              <a href="mailto:support@zephyrboost.com" className="pricing-cta enterprise mt-auto">
                Contact Us
              </a>
            </div>

            {/* Test Plan - Only shows in development */}
            {import.meta.env.DEV && (
              <div className="lg:col-span-3 max-w-md mx-auto">
                <div className="pricing-card p-6 flex flex-col border-2 border-dashed border-yellow-500">
                  <h2 className="pricing-title text-xl font-bold text-yellow-500 mb-2">Test Plan</h2>
                  <p className="text-gray-400 mb-4 text-sm">For testing purposes only</p>
                  <div className="price-display">
                    <div className="price-amount text-2xl">
                      {currencySymbols[currency]}{prices[currency].test}
                    </div>
                    <span className="price-period text-sm">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6 flex-grow">
                    <li className="feature-item text-sm">
                      <span className="feature-icon text-cyan-400">✅</span>
                      <span>Full functionality</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    {isAuthenticated() ? (
                        currency !== 'USDT' ? (
                            <Checkout currency={currency} plan="Test" price={prices[currency].test} />
                        ) : (
                            <p className="text-yellow-500 text-center text-sm">USDT not available for test plan.</p>
                        )
                    ) : (
                        <Link to="/signup" className="pricing-cta text-sm">Login to Purchase</Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div ref={trustStatsRef} className="mt-20 text-center trust-stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="trust-indicator space-y-3">
                <div className="counter-number text-3xl font-bold">50K+</div>
                <p className="text-gray-300">Active Traders</p>
              </div>
              <div className="trust-indicator space-y-3">
                <div className="counter-number text-3xl font-bold">$2.5M+</div>
                <p className="text-gray-300">Trading Volume Analyzed</p>
              </div>
              <div className="trust-indicator space-y-3">
                <div className="counter-number text-3xl font-bold">99.9%</div>
                <p className="text-gray-300">Uptime Guarantee</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className="pricing-title text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="pricing-card faq-item p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Can I switch plans anytime?</h3>
                <p className="text-gray-300">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.</p>
              </div>
              <div className="pricing-card faq-item p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is there a free trial?</h3>
                <p className="text-gray-300">The Basic plan includes many features for free with account creation. You can explore our platform risk-free before upgrading.</p>
              </div>
              <div className="pricing-card faq-item p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-300">We accept PayPal, major credit cards, and cryptocurrency payments including USDT. All transactions are secured and encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </PayPalScriptProvider>
  );
};

export default PricingPage;
