import Header from '../components/Header';

const SignupPage = () => {
  return (
    <div className="antialiased">
      <Header />

      {/* Main Sign-up Form Section */}
      <main className="min-h-screen flex items-center justify-center animated-gradient p-4">
        <div className="w-full max-w-md">
          <div className="feature-card p-8 md:p-10 rounded-xl">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Join the Waitlist</h1>
            <p className="text-gray-400 text-center mb-8">Access is limited to work domains. Enter your email below to request access.</p>
            
            <form id="signup-form" noValidate>
              <div className="mb-4">
                <label htmlFor="email-input" className="sr-only">Email Address</label>
                <input id="email-input" type="email" placeholder="you@company.com" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-5 rounded-md transition-all duration-300">Request Access</button>
            </form>
            
            {/* Messages for validation */}
            <p id="error-message" className="hidden mt-4 text-sm text-red-500 text-center"></p>
            <p id="success-message" className="hidden mt-4 text-sm text-green-400 text-center"></p>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            <a href="/" className="hover:text-gray-300 transition-colors">← Back to Home</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
