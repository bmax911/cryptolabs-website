import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../contexts/AuthContext';
import { FaCheck } from 'react-icons/fa';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const Checkout = ({ currency, plan, price }) => {
  if (!PAYPAL_CLIENT_ID) {
    return <div className="text-red-500 text-center text-sm">PayPal is not configured.</div>;
  }

  return (
    <PayPalButtons
      style={{ layout: "vertical", color: 'blue', shape: 'rect', label: 'paypal' }}
      createOrder={(data, actions) => actions.order.create({
        purchase_units: [{
          description: `CryptoLabs ${plan} Plan`,
          amount: { currency_code: currency, value: price },
        }],
      })}
      onApprove={(data, actions) => actions.order.capture().then((details) => {
        alert(`Transaction completed by ${details.payer.name.given_name}!`);
        window.location.href = 'https://www.cryptolabs.cfd';
      })}
      onError={(err) => {
        console.error("PayPal Checkout Error:", err);
        alert("An error occurred during checkout. Please try again.");
      }}
    />
  );
};

const PricingCard = ({ plan, popular = false }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`rounded-xl border bg-white p-8 shadow-lg dark:bg-slate-800 ${popular ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
      {popular && (
        <div className="mb-4 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">MOST POPULAR</div>
      )}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{plan.description}</p>
      <div className="mt-6 flex items-baseline">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="ml-2 text-slate-500">/month</span>
      </div>
      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FaCheck className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {isAuthenticated() ? (
          plan.priceValue > 0 ? (
            <Checkout currency="USD" plan={plan.name} price={plan.priceValue} />
          ) : (
            <Link to="/signup" className="flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700">
              Get Started
            </Link>
          )
        ) : (
          <Link to="/login" className="flex h-10 w-full items-center justify-center rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-700">
            Login to Purchase
          </Link>
        )}
      </div>
    </div>
  );
};


const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      description: 'For casual traders and curious learners.',
      price: '$9',
      priceValue: '9.00',
      features: [
        'Up to 90% fee cashback',
        'Lite Trading Charts',
        'AI Assistant (3 queries/day)',
        'Basic Trading Diary',
        'Unlimited Watchlists',
      ],
    },
    {
      name: 'Pro',
      description: 'For active traders who want insights.',
      price: '$29',
      priceValue: '29.00',
      popular: true,
      features: [
        'All Basic features',
        'Pro Charting Tools',
        'AI Assistant (50 queries/day)',
        'Smart Trading Diary with AI',
        'Full Macro Dashboard',
        'Priority Support',
      ],
    },
    {
      name: 'Enterprise',
      description: 'For professionals who demand it all.',
      price: '$99',
      priceValue: '99.00',
      features: [
        'All Pro features',
        'Institutional-grade Chart Suite',
        'Unlimited AI Assistant',
        'Pro Trading Diary with Voice Notes',
        'AI Correlation Engine',
        '1-on-1 Strategy Session',
      ],
    },
  ];

  // Trial Request Form
  const [trialStatus, setTrialStatus] = useState('');
  const [trialLoading, setTrialLoading] = useState(false);
  const [trialEmail, setTrialEmail] = useState('');
  const [trialName, setTrialName] = useState('');
  const [trialReason, setTrialReason] = useState('');

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setTrialLoading(true);
    setTrialStatus('');
    try {
      // You can replace this with your backend endpoint or Netlify Forms
      const res = await fetch('https://n8n.zephyrboost.com/webhook/trial-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trialName, email: trialEmail, reason: trialReason }),
      });
      if (!res.ok) throw new Error('Failed to submit trial request');
      setTrialStatus('success');
      setTrialName('');
      setTrialEmail('');
      setTrialReason('');
    } catch (err) {
      setTrialStatus('error');
    } finally {
      setTrialLoading(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: 'USD' }}>
      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Simple, transparent pricing. No hidden fees. Cancel anytime.
          </p>
        </div>
        {/* Trial Request Form */}
        <div className="container mx-auto mt-12 max-w-xl">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-2 text-center">Request a Free Trial</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Try CryptoLabs Pro for free! Fill out the form below and our team will review your request.</p>
            <form onSubmit={handleTrialSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={trialName}
                onChange={e => setTrialName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={trialEmail}
                onChange={e => setTrialEmail(e.target.value)}
              />
              <textarea
                name="reason"
                required
                placeholder="Why do you want to try CryptoLabs Pro?"
                className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                value={trialReason}
                onChange={e => setTrialReason(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-lg mt-2"
                onClick={() => window.location.href = '/signup'}
              >
                Request Free Trial
              </button>
            </form>
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="container mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} popular={plan.popular} />
          ))}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PricingPage;