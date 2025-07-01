const express = require("express");
const cors = require("cors");
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

const app = express();

// --- CORS Configuration ---
// Define the list of allowed origins (your frontend domains)
const allowedOrigins = [
    'https://cryptolabs.icu', 
    'http://localhost:5173', // for local dev
];

const corsOptions = {
    origin: (origin, callback) => {
        // Log every origin for debugging
        console.log(`Request from origin: ${origin}`);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in our allowed list.
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Important for cookies, authorization headers
};

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Use the CORS middleware for all other requests
app.use(cors(corsOptions));

app.use(express.json());

// Simple test route to check if the server is running
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Backend is running." });
});

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const jwtSecret = process.env.JWT_SECRET;

if (!googleClientId) {
    console.error("FATAL ERROR: GOOGLE_CLIENT_ID is not defined in environment variables.");
}
if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

const client = new OAuth2Client(googleClientId);

// Create a router for /api/auth
const authRouter = express.Router();

// Placeholder for manual registration
authRouter.post("/register", async (req, res) => {
    // In a real app, you would validate the email and password,
    // hash the password, and save the user to your database.
    const { email } = req.body;
    console.log(`Registration attempt for email: ${email}`);
    res.status(200).json({ message: "Registration successful! Please check your email for verification." });
});

authRouter.post("/google", async (req, res) => {
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

// Use the router for /api/auth path
app.use('/api/auth', authRouter);

// The listen call is removed from here and moved to index.js
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//     console.log(`API listening on port ${port}`);
// });

module.exports = app;
