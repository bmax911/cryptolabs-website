// Import the configured Express app
const app = require('./auth'); 

// Get the port from Heroku's environment variables, with a fallback for local testing
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
