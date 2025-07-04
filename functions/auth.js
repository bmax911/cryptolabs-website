const express = require("express");
const cors = require("cors");
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
    'https://cryptolabs.icu', 
    'https://www.cryptolabs.cfd',
    'http://localhost:5173', // for local dev
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in our allowed list.
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Handle pre-flight requests across all routes
app.options('*', cors(corsOptions));

// Enable CORS for all other requests
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

// In-memory user store for demonstration (replace with DB in production)
const users = [];

// Placeholder for manual registration
authRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ error: "User already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store user (replace with DB insert in production)
    users.push({ email, password: hashedPassword });
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

// Login endpoint
// POST /api/auth/login
// Accepts: { email, password }
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
    }
    // Create JWT token
    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Use the router for /api/auth path
app.use('/api/auth', authRouter);

// The listen call is removed from here and moved to index.js
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//     console.log(`API listening on port ${port}`);
// });

module.exports = app;
