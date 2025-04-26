import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import middleware from './middleware/middleware';
import { userApiLimiter, NotesApiLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.set('trust proxy', true);

app.use(...middleware);

app.use('/api/users', userApiLimiter, userRoutes);
app.use('/api/notes', NotesApiLimiter, noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});