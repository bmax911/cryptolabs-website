const express = require("express");
const cors = require("cors");
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://app.netlify.com',
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const jwtSecret = process.env.JWT_SECRET;

if (!googleClientId) {
    console.error("FATAL ERROR: GOOGLE_CLIENT_ID is not defined in environment variables.");
}
if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
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

        // Here you would typically find or create a user in your own database.
        // For this example, we'll just create a JWT with the user's info.
        const user = {
            email,
            name,
            picture
        };

        const jwtToken = jwt.sign(user, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token: jwtToken });

    } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(401).json({ error: "Invalid Google token." });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

module.exports = { app };
