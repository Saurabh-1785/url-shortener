// src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import shortUrlRoute from './routes/shortUrl.route.js';
import redirectRoute from './routes/redirect.route.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(globalErrorHandler);

// Connect Database
connectDB();

// Routes
app.use('/api/create', shortUrlRoute);  // POST /api/create
app.use('/', redirectRoute);            // GET /:id


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server is running'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});