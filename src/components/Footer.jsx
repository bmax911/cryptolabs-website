import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800/50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center mb-2" aria-label="CryptoLabs Home">
              <Logo />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Empowering traders with AI-driven tools for a smarter financial future.</p>
          </div>
          <div><h4 className="font-bold text-light-text dark:text-dark-text mb-4">Quick Links</h4><ul className="space-y-2"><li><a href="#hero" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Home</a></li><li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Features</a></li><li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Contact</a></li></ul></div>
          <div><h4 className="font-bold text-light-text dark:text-dark-text mb-4">Legal & Info</h4><ul className="space-y-2"><li><Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link></li><li><Link to="/terms-of-use" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Terms of Use</Link></li><li><Link to="/cookie-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Cookie Policy</Link></li><li><Link to="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">Disclaimer</Link></li></ul></div>
          <div>
            <h4 className="font-bold text-light-text dark:text-dark-text mb-4">Connect With Us</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" aria-label="Twitter" className="text-gray-600 dark:text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.523 3.379 4.74 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.058 0 14.01-7.502 14.01-14.01 0-.213 0-.425-.015-.634a9.935 9.935 0 002.409-2.501z"></path></svg>
              </a>
              <a href="#" aria-label="Telegram" className="text-gray-600 dark:text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.17.9-.502 1.202-.82 1.23-.696.065-1.225-.46-1.9-1.088-1.055-.975-1.637-1.574-2.6-2.544-.994-.99-2.807-2.756-1.14-4.371.59-1.623 3.825-3.485 3.825-3.485s.447-.273.402-.49c-.044-.217-.34-.134-.34-.134s-3.145 2.235-5.214 4.022c-.38.32-.66.486-.93.472-.27-.015-.747-.153-1.05-.27-.374-.143-.682-.22-.682-.22s-.02-.002 0-.002c-.14-.04-.28-.08-.41-.12-.28-.09-.49-.15-.49-.15s-.21-.06-.28-.08c-.02-.01-.04-.01-.06-.02s-.03-.01-.03-.01a.333.333 0 0 1-.04-.02.51.51 0 0 1-.03-.02.403.403 0 0 1-.04-.03.33.33 0 0 1-.02-.02.13.13 0 0 1-.01-.01c-.01 0-.01-.01-.02-.01s-.01-.01-.01-.01l-.01-.01c-.03-.03-.06-.06-.08-.09a.486.486 0 0 1-.04-.05.28.28 0 0 1-.02-.03c-.01-.01-.01-.02-.02-.03a.488.488 0 0 1-.03-.05.29.29 0 0 1-.01-.02c-.01-.02-.01-.03-.02-.04a.477.477 0 0 1-.02-.06.18.18 0 0 1 0-.02c-.01-.02-.01-.04-.01-.06a.46.46 0 0 1 0-.07c0-.02 0-.03.01-.05a.43.43 0 0 1 .02-.09.49.49 0 0 1 .03-.08.44.44 0 0 1 .04-.08.48.48 0 0 1 .05-.08.42.42 0 0 1 .06-.07.51.51 0 0 1 .07-.07.44.44 0 0 1 .08-.06.5.5 0 0 1 .09-.06.4.4 0 0 1 .1-.05l.1-.04.12-.04.13-.04.14-.03.14-.03c.05-.01.1-.02.15-.02h.16c.06 0 .11.01.17.01.3.03.54.15.54.15l.01.01.01.01.01.01.01.01s3.69-2.35 3.73-2.37h.01z"></path></svg>
              </a>
              <a href="mailto:support@cryptolabs.ai" aria-label="Mail" className="text-gray-600 dark:text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-600 dark:text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.81L2 22l5.29-1.38c1.37.72 2.93 1.15 4.59 1.15h.11c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM12.04 20.15h-.1c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.81.83-3.04-.2-.32a8.03 8.03 0 0 1-1.21-4.29c0-4.46 3.63-8.1 8.1-8.1 4.46 0 8.1 3.63 8.1 8.1 0 4.47-3.64 8.1-8.1 8.1zm4.49-5.89c-.25-.12-1.47-.72-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72s-.02-.38.11-.51c.11-.11.25-.29.37-.44s.17-.25.25-.41.04-.3-.02-.42c-.06-.12-.56-1.34-.76-1.84s-.4-.43-.55-.43-.3-.01-.46-.01h-.28c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.76 2.67 4.26 3.76 2.5 1.08 2.5.72 2.95.69.45-.03 1.47-.6 1.67-1.18s.21-1.08.15-1.18c-.07-.1-.23-.16-.48-.28z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-600 text-sm mt-8 pt-8 border-t border-gray-200 dark:border-gray-800/50">
          © 2025 CryptoLabs. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
