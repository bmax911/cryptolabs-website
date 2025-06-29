import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import CookieConsentBanner from './components/CookieConsentBanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <CookieConsentBanner />
    </Router>
  );
}

export default App;
