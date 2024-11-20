import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

export default connectDB;