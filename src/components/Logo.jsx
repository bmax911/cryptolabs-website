const Logo = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    className={`h-8 w-auto text-gray-800 dark:text-white ${className}`}
    aria-label="CryptoLabs Logo"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgb(6, 182, 212)" />
        <stop offset="100%" stopColor="rgb(168, 85, 247)" />
      </linearGradient>
    </defs>
    <g fill="none" stroke="url(#logo-gradient)" strokeWidth="2">
      {/* "C" shape */}
      <path d="M45,5 A20,20 0 0 0 25,25 A20,20 0 0 0 45,45" />
      {/* "L" shape */}
      <path d="M55,5 L55,45 L70,45" />
    </g>
    <text
      x="80"
      y="32"
      fontFamily="Arial, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="currentColor"
    >
      CryptoLabs
    </text>
  </svg>
);

export default Logo;
