const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const {OAuth2Client} = require('google-auth-library');

const app = express();
app.use(cors({ origin: true }));

// It's recommended to set the client ID in Firebase environment configuration
// firebase functions:config:set google.client_id="YOUR_GOOGLE_CLIENT_ID"
const googleClientId = process.env.GOOGLE_CLIENT_ID || functions.config().google.client_id;

if (!googleClientId) {
    console.error("FATAL ERROR: google.client_id is not defined in Firebase config. Please set it.");
}

const client = new OAuth2Client(googleClientId);

app.post("/google", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "ID token not provided." });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId, 
        });
        const payload = ticket.getPayload();
        const { email, name, picture, email_verified } = payload;

        if (!email_verified) {
            return res.status(401).json({ error: "Email not verified by Google." });
        }

        let user;
        try {
            user = await admin.auth().getUserByEmail(email);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // Create a new user if they don't exist
                user = await admin.auth().createUser({
                    email,
                    displayName: name,
                    photoURL: picture,
                    emailVerified: true,
                });
            } else {
                // For other errors, rethrow
                throw error;
            }
        }

        // Create a custom Firebase token for the user to sign in with on the client
        const customToken = await admin.auth().createCustomToken(user.uid);

        res.status(200).json({ token: customToken });

    } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(401).json({ error: "Invalid Google token." });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

// Base path for auth functions
exports.api = functions.https.onRequest(app);
