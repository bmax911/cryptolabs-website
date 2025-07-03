import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
// import AuthPage from './pages/AuthPage'; // REMOVED - This file does not exist and is no longer needed.
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import CookieConsentBanner from './components/CookieConsentBanner';
import SignupForm from './components/SignupForm';
import LoginPage from './components/LoginPage'; // Assuming you have a login page component
import Dashboard from './components/Dashboard'; // Your main app dashboard
import NewsRedirect from './components/NewsRedirect'; // Import the new component
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import CashbackProgram from './components/CashbackProgram'; // Import the CashbackProgram component

function App() {
  useEffect(() => {
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;

      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
      element.classList.remove('is-visible');
    }

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      })
    }

    window.addEventListener('scroll', handleScrollAnimation);

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/cashback-program" element={<CashbackProgram />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/news" element={<NewsRedirect />} />
        </Routes>
        <CookieConsentBanner />
      </Router>
    </div>
  );
}

export default App;
