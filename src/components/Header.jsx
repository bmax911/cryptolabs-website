import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-bg/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800/50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center" aria-label="CryptoLabs Home">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/about" className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-cyan-400 transition-colors">About</Link>
          <Link to="/pricing" className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-cyan-400 transition-colors">Pricing</Link>
          <Link to="https://cryptolabs.zephyrboost.com/" className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-cyan-400 transition-colors">News</Link>
          <Link to="/login" className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-cyan-400 transition-colors">Login</Link>
          <Link to="/signup" className="bg-primary hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300">Sign Up</Link>
          <ThemeToggleButton />
        </div>
        <button id="menu-btn" className="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-text dark:text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </nav>
      <div id="menu" className="hidden md:hidden bg-light-bg dark:bg-dark-surface">
        <Link to="/" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">Home</Link>
        <Link to="/about" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">About</Link>
        <Link to="/pricing" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">Pricing</Link>
        <Link to="https://cryptolabs.zephyrboost.com/" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">News</Link>
        <Link to="/login" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">Login</Link>
        <Link to="/signup" className="block py-2 px-6 text-sm text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800">Sign Up</Link>
        <div className="px-6 py-2">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
