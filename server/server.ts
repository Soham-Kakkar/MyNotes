import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import middleware from './middleware/middleware'

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(...middleware);

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});