const admin = require("firebase-admin");
require('./auth');

admin.initializeApp();

// Export the auth api
exports.api = require("./auth").api;

const app = require('./auth'); // Import the express app from auth.js

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
