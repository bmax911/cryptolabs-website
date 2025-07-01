import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// It's crucial to keep your client ID in an environment variable for security.
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const Checkout = ({ currency, plan, price }) => {
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
            alert(`Transaction completed by ${details.payer.name.given_name}!`);
            console.log('Payment successful:', details);
            // Here you would typically handle post-payment logic,
            // like updating user status in your database.
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

  const prices = {
    USD: { basic: '29.00', pro: '99.00', enterprise: '249.00' },
    EUR: { basic: '25.00', pro: '89.00', enterprise: '229.00' },
    // Note: PayPal does not directly support USDT. 
    // This would require a different integration or conversion process.
    // For this example, we will disable PayPal for USDT.
    USDT: { basic: '30.00', pro: '100.00', enterprise: '250.00' },
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
              <div className="mt-auto">
                {currency !== 'USDT' ? (
                    <Checkout currency={currency} plan="Basic" price={prices[currency].basic} />
                ) : (
                    <Link to="/signup" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-md transition-colors">Get Started with USDT</Link>
                )}
              </div>
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
              <div className="mt-auto">
                {currency !== 'USDT' ? (
                    <Checkout currency={currency} plan="Pro" price={prices[currency].pro} />
                ) : (
                    <Link to="/signup" className="w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-colors">Choose Pro with USDT</Link>
                )}
              </div>
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
    </PayPalScriptProvider>
  );
};

export default PricingPage;
