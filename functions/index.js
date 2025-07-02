// Import the configured Express app
const app = require('./auth'); 

// Set COOP header to allow popups for OAuth
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// Get the port from Heroku's environment variables, with a fallback for local testing
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
