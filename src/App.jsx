import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
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

function App() {
  return (
    <div className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/auth" element={<AuthPage />} /> REMOVED - This route is no longer needed. */}
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<NewsRedirect />} />
        </Routes>
        <CookieConsentBanner />
      </Router>
    </div>
  );
}

export default App;
