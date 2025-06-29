import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Typewriter from 'typewriter-effect';

const HomePage = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const featuresSection = featuresRef.current;
    if (!featuresSection) return;

    const handleMouseMove = (e) => {
      const rect = featuresSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      featuresSection.style.setProperty('--mouse-x', `${x}px`);
      featuresSection.style.setProperty('--mouse-y', `${y}px`);
    };

    featuresSection.addEventListener('mousemove', handleMouseMove);

    return () => {
      featuresSection.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="antialiased">
      <Header />

      {/* HERO SECTION */}
      <section id="hero" className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 animated-gradient"></div>
        <div id="hero-content" className="relative z-10 text-center px-6 pt-20">
          <h1 id="typewriter" className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4" style={{textShadow: '0 0 8px rgba(0, 191, 255, 0.3)'}}>
            <Typewriter
              options={{
                strings: ['AI-Powered Crypto Analysis', 'Automated Trading Cashback', 'Your All-in-One Crypto Hub'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p data-depth="0.03" className="hero-parallax text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8 scroll-animate">Your all-in-one platform for crypto trading cashback, AI-driven analysis, and automated planning.</p>
          <Link to="/signup" data-depth="0.05" className="hero-parallax inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 scroll-animate">
            Explore Features & Sign Up
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" ref={featuresRef} className="py-20 md:py-32 bg-[#0a0a1a] features-motion-bg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white scroll-animate">A Single Platform for Peak Performance</h2>
          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Cashback */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate" style={{transitionDelay: '0ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-cyan-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 12v-1m-4-6H7m10 0h-1m-1 4v1m-6-2v1m2-2v1m2-2v1" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-white">Trading Fee Cashback</h3><p className="text-gray-400">Maximize your profits by getting a percentage of your trading fees back from major crypto exchanges.</p>
            </div>
            
            {/* Feature 2: AI Assistant */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate" style={{transitionDelay: '150ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-purple-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-white">On-Demand AI Analysis</h3><p className="text-gray-400">Leverage our AI assistant to analyze market trends and get data-driven insights without leaving the app.</p>
            </div>

            {/* Feature 3: Calendar Integration */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate" style={{transitionDelay: '300ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-green-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-white">1-Stop-Shop Planner</h3><p className="text-gray-400">Connect your calendar to schedule trades, set reminders, and build a comprehensive trading plan.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section id="cta" className="py-20 md:py-24">
        <div className="container mx-auto px-6 text-center scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Revolutionize Your Trading</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Join the waitlist and be the first to experience the future of automated, intelligent crypto trading.</p>
          <a href="mailto:your-email@example.com" className="group inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Early Access
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-20 md:py-24 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Contact Us</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-12">Have questions? We'd love to hear from you.</p>
          <form name="contact" method="POST" data-netlify="true" className="max-w-xl mx-auto">
            <input type="hidden" name="form-name" value="contact" />
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input type="text" name="name" id="name" placeholder="Your Name" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Your Email</label>
              <input type="email" name="email" id="email" placeholder="Your Email" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea name="message" id="message" rows="4" placeholder="Your Message" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
