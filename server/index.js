import express from 'express';
import cors from 'cors';
import testRouter from './routes/testRoute.js';
import { configDotenv } from "dotenv";
import firebaseRouter from './routes/firebaseRoutes.js';
import { auth } from 'express-oauth2-jwt-bearer';

const dotenv = configDotenv();

const app = express();
app.use(cors());

// JWT Authentication Middleware
const checkJwt = auth({
    audience: dotenv.parsed.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${dotenv.parsed.AUTH0_DOMAIN}/`,
});

// Error handler for invalid or expired JWT
const jwtErrorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // JWT token is missing, expired, or invalid
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing token. Please provide a valid JWT token.'
        });
    }
    next(err); // If the error is not related to JWT, pass it to the next handler
};

// Use the checkJwt middleware to protect routes
app.use(checkJwt);

// Middleware for handling invalid JWT token errors
app.use(jwtErrorHandler);

app.use(express.json());

// Your route handlers
app.use('/passwords', firebaseRouter);

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
