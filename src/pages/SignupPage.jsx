import Header from '../components/Header';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus('error');
      setMessage('Please complete the reCAPTCHA verification.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/.netlify/functions/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, 'g-recaptcha-response': recaptchaToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'A server error occurred.');
      }

      if (result.is_safe) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Could not connect to the service. Please check your connection and try again.');
      console.error('Submission Error:', error);
    } finally {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
    }
  };

  return (
    <div className="antialiased">
      <Header />

      {/* Main Sign-up Form Section */}
      <main className="min-h-screen flex items-center justify-center animated-gradient p-4">
        <div className="w-full max-w-md">
          <div className="feature-card p-8 md:p-10 rounded-xl">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Join the Waitlist</h1>
            <p className="text-gray-400 text-center mb-8">Access is limited to work domains. Enter your email below to request access.</p>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="email-input" className="sr-only">Email Address</label>
                <input 
                  id="email-input" 
                  type="email" 
                  placeholder="you@company.com" 
                  required 
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Le9ZHErAAAAAHAxdgOhoGOq_sAAkLytmkwo9-Om"
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                  theme="dark"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'sending' || status === 'success' || !recaptchaToken}
              >
                {status === 'sending' ? 'Verifying...' : status === 'success' ? 'Request Sent!' : 'Request Access'}
              </button>
            </form>
            
            {/* Messages for validation */}
            {status === 'error' && <p className="mt-4 text-sm text-red-500 text-center">{message}</p>}
            {status === 'success' && <p className="mt-4 text-sm text-green-400 text-center">{message}</p>}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">← Back to Home</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
