import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  FaChartLine, 
  FaRobot, 
  FaBook, 
  FaEye, 
  FaGlobe, 
  FaNewspaper,
  FaBitcoin,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';

// Animated counter component
const AnimatedCounter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const current = Math.floor(progress * (to - from) + from);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

// Animated text reveal component
const AnimatedText = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ icon, title, description, delay = 0, partners = [] }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 group hover:border-cyan-500/50 transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.3 }}
        className="text-4xl text-cyan-400 mb-6 inline-block"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        {description}
      </p>
      {partners.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {partners.map((partner, index) => (
            <span
              key={index}
              className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30"
            >
              {partner}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Honor card component
const HonorCard = ({ title, description, icon, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay }}
      className="flex items-start space-x-6 p-8 bg-gradient-to-r from-gray-800/30 to-transparent border-l-4 border-cyan-500 rounded-r-2xl backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="text-3xl text-cyan-400 mt-2"
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Header />
      
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, window.innerHeight + 100],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-purple-900/20"
        />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              About Us
            </motion.h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Empowering traders and investors with cutting-edge technology, AI-driven insights, 
            and a comprehensive suite of tools designed for financial success.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <Link
              to="/signup"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              <span>Start Your Journey</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedText>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe that every trader and investor deserves access to professional-grade tools, 
              real-time data, and intelligent insights that were once exclusive to Wall Street institutions.
            </p>
          </AnimatedText>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedText delay={0.4}>
              <div className="text-center p-8">
                <div className="text-5xl font-bold text-cyan-400 mb-4">
                  <AnimatedCounter from={0} to={90} />%
                </div>
                <p className="text-gray-300">Trading Fee Cashback</p>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={0.6}>
              <div className="text-center p-8">
                <div className="text-5xl font-bold text-cyan-400 mb-4">
                  <AnimatedCounter from={0} to={4} />+
                </div>
                <p className="text-gray-300">Major Exchange Partners</p>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={0.8}>
              <div className="text-center p-8">
                <div className="text-5xl font-bold text-cyan-400 mb-4">
                  <AnimatedCounter from={0} to={24} />/7
                </div>
                <p className="text-gray-300">AI-Powered Support</p>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              What We Offer
            </h2>
          </AnimatedText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FaBitcoin />}
              title="Trading Fee Cashback"
              description="Get up to 90% cashback on trading fees from major exchanges. We've partnered with industry leaders to bring you the best deals."
              partners={['Binance', 'OKX', 'BingX', 'Bitget']}
              delay={0.1}
            />
            
            <ServiceCard
              icon={<FaChartLine />}
              title="Professional Charting"
              description="Advanced charting platform with drawing tools and technical analysis features. Built for serious traders who demand precision."
              delay={0.2}
            />
            
            <ServiceCard
              icon={<FaRobot />}
              title="AI Trading Assistant"
              description="Smart AI assistant powered by OpenAI, Google, and Grok models. Get deep insights and analysis for all financial markets."
              delay={0.3}
            />
            
            <ServiceCard
              icon={<FaBook />}
              title="Trading Diary"
              description="Notion-style trading journal with AI-powered analysis. Track your thoughts, strategies, and get daily reports to improve your trading."
              delay={0.4}
            />
            
            <ServiceCard
              icon={<FaEye />}
              title="Smart Watchlist"
              description="Keep track of your favorite symbols with intelligent alerts and real-time updates. Never miss an important market movement."
              delay={0.5}
            />
            
            <ServiceCard
              icon={<FaGlobe />}
              title="Economic Data"
              description="Access comprehensive macroeconomic indicators from the World Bank. Stay informed about global economic trends."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Code of Honor Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedText>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Our Code of Honor
            </h2>
          </AnimatedText>
          
          <div className="space-y-12">
            <HonorCard
              icon={<FaUsers />}
              title="Our users are our investors"
              description="We make most of our money through low-cost monthly subscriptions and ads. We don't care if you trade or not. For us, objectivity is excellence."
              delay={0.2}
            />
            
            <HonorCard
              icon={<FaLightbulb />}
              title="It's not charts, it's freedom"
              description="We never lose sight of the fact that millions of traders invest their hard-won capital based on what they see on our platform. The better we do, the better you can do."
              delay={0.4}
            />
            
            <HonorCard
              icon={<FaHeart />}
              title="Finance should be social"
              description="For us, open discussion and self-expression are the greatest keys to unlocking understanding, so we've set out to build the best finance platform with a strong social network at its core."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Your Trading?
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of traders who are already using our platform to make smarter, 
              more profitable decisions. Start your journey with us today.
            </p>
          </AnimatedText>
          
          <AnimatedText delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/signup"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <span>Get Started Free</span>
                <FaArrowRight />
              </Link>
              
              <Link
                to="/pricing"
                className="inline-flex items-center space-x-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>View Pricing</span>
                <FaStar />
              </Link>
            </div>
          </AnimatedText>
          
          <AnimatedText delay={0.6}>
            <p className="text-sm text-gray-400 mt-8">
              We're a small tech team developing with your support. 
              <br />
              We'd love to hear your requests about our services.
            </p>
          </AnimatedText>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
