const admin = require("firebase-admin");
require('./auth');

admin.initializeApp();

// Export the auth api
exports.api = require("./auth").api;

const port = process.env.PORT || 3001;
