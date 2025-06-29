import Header from '../components/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (emailToValidate) => {
    if (!emailToValidate) {
      setEmailError('Email address is required.');
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailToValidate)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setStatus('sending');
    setMessage('');

    if (typeof grecaptcha === 'undefined' || typeof grecaptcha.enterprise === 'undefined') {
        setStatus('error');
        setMessage('reCAPTCHA not loaded. Please check your connection or ad-blocker.');
        return;
    }

    try {
        const token = await grecaptcha.enterprise.execute('6LeEc3ErAAAAAC2Wux7iibC2yHU3EyXbIME9KSy0', { action: 'SIGNUP' });
        
        const functions = getFunctions();
        const verifyEmail = httpsCallable(functions, 'verifyEmail');
        
        const result = await verifyEmail({ email, 'g-recaptcha-response': token });

        if (result.data.is_safe) {
            setStatus('success');
            setMessage(result.data.message);
            setEmail('');
        } else {
            setStatus('error');
            setMessage(result.data.message);
        }
    } catch (error) {
        setStatus('error');
        setMessage('Could not connect to the service. Please check your connection and try again.');
        console.error('Submission Error:', error);
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
                  onChange={handleEmailChange}
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
              {emailError && <p className="mt-2 text-sm text-red-500 text-center">{emailError}</p>}
              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'sending' || status === 'success'}
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
