import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import resumeRoute from './Routes/resume.js'; 
import aiRoute from './Routes/ai.js';
import paymentRoutes from './Routes/payment.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,  // Allowing cross-origin requests from any origin
};

// Simple health check endpoint
app.get('/', (req, res) => {
    res.send('API is working');
});

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database is connected');
    } catch (err) {
        console.log('MongoDB database connection failed', err);
    }
};

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/auth', authRoute);  // Authentication routes (login, register)
app.use('/api/v1/users', userRoute); // User routes (get, update, delete users)
app.use('/api/v1/resumes', resumeRoute); // Resume routes (create, get, update, delete resumes)
app.use('/api/v1/ai', aiRoute); // AI routes (generate resume, etc.)
app.use("/api/v1/payment", paymentRoutes);

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port ' + port);
});
