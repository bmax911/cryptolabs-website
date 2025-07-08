import { Link } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaRobot, FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';

// A reusable Feature Card component with animation and hover effects
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-5 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{description}</p>
  </div>
);

// Newsletter Signup Form (Netlify compatible)
const NewsletterForm = () => {
  const [status, setStatus] = useState('');
  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      className="w-full max-w-2xl mx-auto mt-10 bg-white/80 dark:bg-slate-800/90 rounded-2xl shadow-2xl p-10 flex flex-col gap-6 animate-fade-in delay-300 border border-slate-200 dark:border-slate-700 backdrop-blur"
      onSubmit={() => setStatus('success')}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <label htmlFor="newsletter-email" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Join our newsletter</label>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-4">Get the latest updates, tips, and exclusive offers straight to your inbox.</p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="flex-1 min-w-0 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-lg min-w-[150px]"
        >
          Subscribe
        </button>
      </div>
      {status === 'success' && <p className="text-green-600 dark:text-green-400 mt-4 text-center text-lg">Thank you for subscribing!</p>}
    </form>
  );
};

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full text-center py-24 sm:py-32 relative overflow-hidden animate-fade-in bg-gradient-to-b from-blue-50/40 via-purple-50/30 to-white dark:from-blue-900/30 dark:via-purple-900/20 dark:to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full animate-pulse" />
          {/* Animated floating shapes */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-bounce-slow" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce-slower" />
        </div>
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in">AI-Powered Crypto Analysis</h1>
        <p className="relative z-10 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 animate-fade-in delay-100">
          Your all-in-one platform for crypto trading cashback, AI-driven analysis, and automated planning.
        </p>
        <Link 
          to="/signup" 
          className="relative z-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg animate-fade-in delay-200"
        >
          <span>Get Started</span>
          <FaArrowRight />
        </Link>
        {/* Social proof badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in delay-300">
          <span className="bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full shadow text-sm font-semibold">Trusted by 10,000+ traders</span>
          <span className="bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full shadow text-sm font-semibold">Backed by AI</span>
          <span className="bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 px-4 py-2 rounded-full shadow text-sm font-semibold">Secure & Private</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 animate-fade-in delay-200 bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/30 dark:to-purple-900/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold animate-fade-in">A Single Platform for Peak Performance</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 animate-fade-in delay-100">Everything you need to trade smarter.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
          <FeatureCard 
            icon={<FaMoneyBillWave className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Trading Fee Cashback"
            description="Maximize your profits by getting a percentage of your trading fees back from major crypto exchanges."
          />
          <FeatureCard 
            icon={<FaRobot className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="On-Demand AI Analysis"
            description="Leverage our AI assistant to analyze market trends and get data-driven insights without leaving the app."
          />
          <FeatureCard 
            icon={<FaChartLine className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="1-Stop-Shop Planner"
            description="Connect your calendar to schedule trades, set reminders, and build a comprehensive trading plan."
          />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full py-16 animate-fade-in delay-300 bg-gradient-to-b from-purple-50/30 to-white dark:from-purple-900/20 dark:to-slate-900 flex justify-center">
        <NewsletterForm />
      </section>

      {/* Call to Action Banner */}
      <section className="w-full py-12 animate-fade-in delay-400 flex justify-center bg-gradient-to-b from-white to-blue-50/40 dark:from-slate-900 dark:to-blue-900/30">
        <div className="w-full max-w-5xl bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between px-8 py-8 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
            <p className="text-lg">Sign up now and unlock your crypto edge with AI-powered tools and cashback.</p>
          </div>
          <Link to="/signup" className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition-colors duration-200 text-lg">Join Free</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;