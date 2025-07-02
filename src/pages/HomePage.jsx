import { useRef, useEffect, useState } from 'react';
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

  const form = useRef();
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [formMessage, setFormMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = {
      name: form.current.name.value,
      email: form.current.email.value,
      message: form.current.message.value,
    };

    try {
      const response = await fetch('https://n8n.zephyrboost.com/webhook/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Webhook submission failed');
      }

      setFormStatus('success');
      setFormMessage('We received your message!');
      form.current.reset();

    } catch (error) {
      console.error('Error sending form data:', error);
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section id="hero" className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 animated-gradient"></div>
        <div id="hero-content" className="relative z-10 text-center px-6 pt-20">
          <h1 id="typewriter" className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4" style={{textShadow: '0 0 12px rgba(0, 169, 255, 0.4)'}}>
            <Typewriter
              options={{
                strings: ['AI-Powered Crypto Analysis', 'Automated Trading Cashback', 'Your All-in-One Crypto Hub'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p data-depth="0.03" className="hero-parallax text-lg md:text-xl max-w-3xl mx-auto text-white mb-8 scroll-animate" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Your all-in-one platform for crypto trading cashback, AI-driven analysis, and automated planning.</p>
          <Link to="/signup" data-depth="0.05" className="hero-parallax inline-block bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 scroll-animate">
            Explore Features & Sign Up
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" ref={featuresRef} className="py-20 md:py-32 bg-light-bg dark:bg-dark-bg features-motion-bg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-light-text dark:text-dark-text scroll-animate">A Single Platform for Peak Performance</h2>
          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Cashback */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50" style={{transitionDelay: '0ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 12v-1m-4-6H7m10 0h-1m-1 4v1m-6-2v1m2-2v1m2-2v1" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">Trading Fee Cashback</h3><p className="text-gray-600 dark:text-gray-400">Maximize your profits by getting a percentage of your trading fees back from major crypto exchanges.</p>
            </div>
            
            {/* Feature 2: AI Assistant */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50" style={{transitionDelay: '150ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-purple-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">On-Demand AI Analysis</h3><p className="text-gray-600 dark:text-gray-400">Leverage our AI assistant to analyze market trends and get data-driven insights without leaving the app.</p>
            </div>

            {/* Feature 3: Calendar Integration */}
            <div className="feature-card group p-8 rounded-lg text-center scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50" style={{transitionDelay: '300ms'}}>
              <div className="flex items-center justify-center mb-4 h-16 w-16 mx-auto bg-green-500/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div><h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">1-Stop-Shop Planner</h3><p className="text-gray-600 dark:text-gray-400">Connect your calendar to schedule trades, set reminders, and build a comprehensive trading plan.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* STATS SECTION */}
      <section id="stats" className="py-20 md:py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="stat-card p-8 scroll-animate">
              <div className="stat-glow"></div>
              <h3 className="text-4xl font-bold text-primary">500K+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">USD Trading Fee Saved</p>
            </div>
            <div className="stat-card p-8 scroll-animate">
              <div className="stat-glow"></div>
              <h3 className="text-4xl font-bold text-primary">12,873+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Happy Clients</p>
            </div>
            <div className="stat-card p-8 scroll-animate">
              <div className="stat-glow"></div>
              <h3 className="text-4xl font-bold text-primary">1M+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">AI-Supported Trading Orders</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-32 bg-light-bg dark:bg-dark-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-light-text dark:text-dark-text scroll-animate">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="testimonial-card p-8 rounded-lg scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50">
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"CryptoLabs revolutionized my trading strategy. The AI analysis is a game-changer, and the cashback on fees is just the cherry on top. Highly recommended!"</p>
              <div className="flex items-center">
                <div className="testimonial-author-img mr-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Johnson" className="w-12 h-12 rounded-full object-cover"/>
                </div>
                <div>
                  <p className="font-bold text-light-text dark:text-dark-text">Alex Johnson</p>
                  <p className="text-sm text-primary">Pro Trader</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="testimonial-card p-8 rounded-lg scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50" style={{transitionDelay: '150ms'}}>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"As someone new to crypto, the 1-Stop-Shop Planner was invaluable. It helped me organize my trades and stay on top of the market. The platform is incredibly user-friendly."</p>
              <div className="flex items-center">
                <div className="testimonial-author-img mr-4">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Samantha Lee" className="w-12 h-12 rounded-full object-cover"/>
                </div>
                <div>
                  <p className="font-bold text-light-text dark:text-dark-text">Samantha Lee</p>
                  <p className="text-sm text-primary">Crypto Enthusiast</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="testimonial-card p-8 rounded-lg scroll-animate bg-white/5 dark:bg-dark-surface/50 backdrop-blur-sm border border-white/10 dark:border-gray-800/50" style={{transitionDelay: '300ms'}}>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"The automated cashback system is seamless. I've saved a significant amount on trading fees without any extra effort. It's a must-have for any serious trader."</p>
              <div className="flex items-center">
                <div className="testimonial-author-img mr-4">
                  <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="David Chen" className="w-12 h-12 rounded-full object-cover"/>
                </div>
                <div>
                  <p className="font-bold text-light-text dark:text-dark-text">David Chen</p>
                  <p className="text-sm text-primary">Financial Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section id="cta" className="py-20 md:py-24 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-6 text-center scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">Revolutionize Your Trading</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">Join the waitlist and be the first to experience the future of automated, intelligent crypto trading.</p>
          <a href="mailto:your-email@example.com" className="group inline-flex items-center justify-center bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Early Access
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-20 md:py-24 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-light-text dark:text-dark-text">Contact Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-12">Have questions? We'd love to hear from you.</p>
          <form ref={form} onSubmit={sendEmail} className="max-w-xl mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input type="text" name="name" id="name" placeholder="Your Name" required className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Your Email</label>
              <input type="email" name="email" id="email" placeholder="Your Email" required className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea name="message" id="message" rows="4" placeholder="Your Message" required className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {formStatus === 'success' && <p className="mt-4 text-sm text-green-500 dark:text-green-400 text-center">{formMessage}</p>}
            {formStatus === 'error' && <p className="mt-4 text-sm text-red-600 dark:text-red-500 text-center">{formMessage}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
