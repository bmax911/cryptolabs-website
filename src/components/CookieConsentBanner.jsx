import { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay appearance for a smoother entrance
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsExiting(true);
    localStorage.setItem('cookie_consent', 'true');
    // Wait for exit animation to finish before hiding the component
    setTimeout(() => {
      setIsVisible(false);
    }, 500); 
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      id="cookie-consent-banner" 
      className={`fixed bottom-0 inset-x-0 p-4 bg-gray-900/80 backdrop-blur-lg z-50 shadow-2xl transform transition-all duration-500 ease-in-out ${
        isVisible && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-gray-200">
          We use cookies to enhance your experience. By continuing to browse, you agree to our <a href="/cookie-policy" className="font-semibold text-cyan-400 hover:underline">Cookie Policy</a>.
        </p>
        <button 
          id="accept-cookies-btn" 
          onClick={handleAccept} 
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
