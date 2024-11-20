import mongoose, { Schema, Document } from 'mongoose';

interface Note extends Document {
  userId: Schema.Types.ObjectId; // Reference to the User
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<Note>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // References the User model
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NoteModel = mongoose.model<Note>('Note', NoteSchema);
export default NoteModel;