import { Link } from 'react-router-dom';
import Logo from './Logo';

const FooterLink = ({ to, children, external }) => (
  <li>
    {external ? (
      <a href={to} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
        {children}
      </a>
    ) : (
      <Link to={to} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
        {children}
      </Link>
    )}
  </li>
);

const Footer = () => {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center" aria-label="CryptoLabs Home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              AI-driven tools for a smarter financial future.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/pricing">Pricing</FooterLink>
                <FooterLink to="/fred">FRED Data</FooterLink>
                <FooterLink to="/dashboard">Dashboard</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Legal</h4>
              <ul className="mt-4 space-y-2">
                <FooterLink to="/terms-of-use">Terms of Use</FooterLink>
                <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
                <FooterLink to="/disclaimer">Disclaimer</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Connect</h4>
              <ul className="mt-4 space-y-2">
                <FooterLink to="https://twitter.com/cryptolabs" external>Twitter</FooterLink>
                <FooterLink to="https://t.me/cryptolabs" external>Telegram</FooterLink>
                <FooterLink to="mailto:support@cryptolabs.ai" external>Email</FooterLink>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="https://twitter.com/cryptolabs" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
                </a>
                <a href="https://t.me/cryptolabs" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.05 2.54c-.36-.3-.87-.36-1.3-.16L2.7 10.2c-.44.2-.7.66-.6 1.13.1.47.53.8 1 .8.07 0 .14-.01.21-.03l4.2-1.13 2.02 4.1c.18.36.54.59.94.59.04 0 .08 0 .12-.01.43-.05.78-.37.87-.79l1.1-5.13 4.6-2.1c.41-.19.66-.62.6-1.07-.06-.45-.44-.8-.89-.8-.09 0-.18.01-.27.04l-13.2 4.1c-.41.13-.67.56-.54.97.13.41.56.67.97.54l13.2-4.1c.41-.13.67-.56.54-.97-.13-.41-.56-.67-.97-.54z"/></svg>
                </a>
                <a href="mailto:support@cryptolabs.ai" aria-label="Email" className="hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-500 dark:text-slate-600">
          © {new Date().getFullYear()} CryptoLabs. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;