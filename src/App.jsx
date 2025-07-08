import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext'; // <-- Import AuthProvider

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import Overview from './pages/Overview';
import CoinDetail from './pages/CoinDetail';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import SignupForm from './components/SignupForm';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import NewsRedirect from './components/NewsRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import CashbackProgram from './components/CashbackProgram';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* The app must be wrapped in AuthProvider */}
        <Router>     {/* The router must wrap the entire layout */}
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <Header />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/coin/:id" element={<CoinDetail />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/cashback-program" element={<CashbackProgram />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/news" element={<NewsRedirect />} />
                <Route path="*" element={
                  <div className='container mx-auto text-center py-20'>
                    <h1 className='text-3xl font-bold mb-4'>404 - Page Not Found</h1>
                    <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Go Home</a>
                  </div>} 
                />
              </Routes>
            </main>
            <CookieConsentBanner />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// The complex ScrollAnimationHandler has been removed for a simpler, more stable UI.
export default App;