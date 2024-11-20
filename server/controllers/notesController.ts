import { Request, Response } from 'express';
import User from '../models/User'
import Note from '../models/Note';

export const createNote = async (req: Request, res: Response) => {
  const { username, title, content } = req.body;
  const user = await User.findOne({ username: username });
  const userId = user?._id;

  try {
    const note = new Note({
      userId,
      title,
      content,
    });

    await note.save();
    res.status(201).json(note);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
    return;
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const username = req.query.username; // Correctly access the username string
  const user = await User.findOne({ username: username });
  const userId = user?._id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
    return;
  }
};

export const modifyNote = async (req: Request, res: Response) => {
  const { id, title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    } else {
      res.status(200).json(note);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Error modifying note', error });
    return;
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    } else {
      res.status(200).json(note);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Error modifying note', error });
    return;
  }
};