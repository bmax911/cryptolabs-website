const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800/50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <a href="#hero" className="flex items-center mb-2" aria-label="CryptoLabs Home">
              <img src="/logo.svg" alt="CryptoLabs Logo" className="h-8 w-auto logo-glow" />
              <span className="ml-3 text-xl font-bold text-white">CryptoLabs</span>
            </a>
            <p className="text-gray-400 text-sm">Empowering traders with AI-driven tools for a smarter financial future.</p>
          </div>
          <div><h4 className="font-bold text-white mb-4">Quick Links</h4><ul className="space-y-2"><li><a href="#hero" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</a></li><li><a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</a></li><li><a href="#cta" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li></ul></div>
          <div><h4 className="font-bold text-white mb-4">Legal & Info</h4><ul className="space-y-2"><li><a href="/privacy-policy.html" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li><li><a href="/terms-of-use.html" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Use</a></li><li><a href="/cookie-policy.html" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookie Policy</a></li><li><a href="/disclaimer.html" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">Disclaimer</a></li></ul></div>
          <div><h4 className="font-bold text-white mb-4">Connect With Us</h4><div className="flex space-x-4 justify-center md:justify-start"><a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.523 3.379 4.74 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.058 0 14.01-7.502 14.01-14.01 0-.213 0-.425-.015-.634a9.935 9.935 0 002.409-2.501z"></path></svg></a></div></div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800/50">
          © 2025 CryptoLabs. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
