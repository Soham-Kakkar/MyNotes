import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const frontendURI = process.env.frontendURI || 'http://localhost:3000';

connectDB();

// CORS configuration
const corsOptions = {
  origin: frontendURI,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});