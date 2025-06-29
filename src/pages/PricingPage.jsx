import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const [currency, setCurrency] = useState('USD');

  const prices = {
    USD: { basic: 29, pro: 99, enterprise: 249 },
    EUR: { basic: 25, pro: 89, enterprise: 229 },
    USDT: { basic: 30, pro: 100, enterprise: 250 },
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    USDT: '₮',
  };

  return (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-2">Basic</h2>
              <p className="text-gray-400 mb-6">For individuals and hobbyists</p>
              <div className="text-4xl font-bold text-white mb-6">{currencySymbols[currency]}{prices[currency].basic}<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Trading Fee Cashback</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Basic AI Analysis</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Calendar Integration</li>
              </ul>
              <Link to="/signup" className="mt-auto w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-md transition-colors">Get Started</Link>
            </div>

            {/* Pro Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col border-2 border-cyan-500 relative">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
              <p className="text-gray-400 mb-6">For serious traders and professionals</p>
              <div className="text-4xl font-bold text-white mb-6">{currencySymbols[currency]}{prices[currency].pro}<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Everything in Basic</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Advanced AI Analysis &amp; Signals</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Priority Support</li>
              </ul>
              <Link to="/signup" className="mt-auto w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-colors">Choose Pro</Link>
            </div>

            {/* Enterprise Plan */}
            <div className="feature-card p-8 rounded-xl flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-2">Enterprise</h2>
              <p className="text-gray-400 mb-6">For teams and institutions</p>
              <div className="text-4xl font-bold text-white mb-6">{currencySymbols[currency]}{prices[currency].enterprise}<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Everything in Pro</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Team Accounts &amp; Management</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated API Access</li>
              </ul>
              <Link to="/signup" className="mt-auto w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-md transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
