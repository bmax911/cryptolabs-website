import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-24 flex justify-center">
        <div className="w-full max-w-md mt-16">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-light-text dark:text-dark-text">{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 dark:text-gray-400 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <button type="submit" className="w-full bg-primary hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-light-text dark:hover:text-dark-text">
              {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuthPage;
