const admin = require("firebase-admin");
const { app } = require('./auth');

admin.initializeApp();

// Export the auth api
exports.api = require("./auth").api;

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
