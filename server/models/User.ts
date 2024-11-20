import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface extending Document
interface User extends Document {
    // email: string;
    username: string;
    nickname: string;
    password: string;
}

// Create the User schema
const UserSchema: Schema = new Schema({
    // email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    nickname: {type: String, required: true},
    password: { type: String, required: true },
});

// Add the comparePassword method to the UserSchema
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Hash the password before saving the user
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create the User model
const UserModel = mongoose.model<User>('User ', UserSchema);
export default UserModel;