import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-gray-800/50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center" aria-label="CryptoLabs Home">
          <img src="/logo.svg" alt="CryptoLabs Logo" className="h-8 w-auto logo-glow" />
          <span className="ml-3 text-xl font-bold text-white">CryptoLabs</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</Link>
          <a href="/#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
          <Link to="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">Pricing</Link>
          <Link to="/auth" className="text-gray-300 hover:text-cyan-400 transition-colors">Login</Link>
          <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300">Sign Up</Link>
        </div>
        <button id="menu-btn" className="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </nav>
      <div id="menu" className="hidden md:hidden">
        <Link to="/" className="block py-2 px-6 text-sm text-gray-300 hover:bg-gray-800">Home</Link>
        <a href="/#features" className="block py-2 px-6 text-sm text-gray-300 hover:bg-gray-800">Features</a>
        <Link to="/pricing" className="block py-2 px-6 text-sm text-gray-300 hover:bg-gray-800">Pricing</Link>
        <Link to="/auth" className="block py-2 px-6 text-sm text-gray-300 hover:bg-gray-800">Login</Link>
        <Link to="/signup" className="block py-2 px-6 text-sm text-gray-300 hover:bg-gray-800">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
