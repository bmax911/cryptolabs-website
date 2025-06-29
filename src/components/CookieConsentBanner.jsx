import { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // The banner will be shown on every visit.
    setIsVisible(true);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div id="cookie-consent-banner" className="fixed bottom-0 inset-x-0 p-4 bg-gray-800/80 backdrop-blur-sm z-50 flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-300">This website uses cookies to ensure you get the best experience. By continuing to use this site, you agree to our <a href="/cookie-policy.html" className="text-cyan-400 hover:underline">Cookie Policy</a>.</p>
      <button id="accept-cookies-btn" onClick={handleAccept} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300">Accept</button>
    </div>
  );
};

export default CookieConsentBanner;
