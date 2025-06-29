import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import AuthPage from './pages/AuthPage'; // Import AuthPage
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import CookieConsentBanner from './components/CookieConsentBanner';

function App() {
  return (
    <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<AuthPage />} /> {/* Add AuthPage route */}
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
        </Routes>
        <CookieConsentBanner />
      </Router>
    </div>
  );
}

export default App;
