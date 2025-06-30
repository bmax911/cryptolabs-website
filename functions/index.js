const admin = require("firebase-admin");

admin.initializeApp();

// Export the auth api
exports.api = require("./auth").api;
