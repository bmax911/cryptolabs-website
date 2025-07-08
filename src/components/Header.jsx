import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggleButton from './ThemeToggleButton';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/overview', label: 'Overview' },
    { href: '/pricing', label: 'Pricing' },
    { href: 'https://cryptolabs.zephyrboost.com/', label: 'News', external: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-900/80">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" aria-label="CryptoLabs Home">
          <Logo />
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <ThemeToggleButton />
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container space-y-4 py-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-600 dark:text-slate-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-slate-600 dark:text-slate-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="flex flex-col space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
              <Link to="/login" className="text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="rounded-md bg-blue-600 px-4 py-2 text-center text-white" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              <div className="self-start">
                 <ThemeToggleButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;