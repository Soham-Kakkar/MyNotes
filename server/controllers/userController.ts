import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Note from '../models/Note';

export const register = async (req: Request, res: Response) => {
  const { username, nickname, password } = req.body;
  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    res.status(409).json({ message: 'User  already exists' });
    return;
  }

  try {
    const user = new User({ username: username, nickname: nickname || username, password: password });
    await user.save();
    const note = new Note({
      userId: user._id,
      title: "Welcome",
      content: "Your first note!",
    });
    await note.save();
    res.status(201).json({ message: 'User registered successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '5d' });
    res.cookie('authToken', token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });
    res.json({ message: 'Logged in successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};

export const isLoggedIn = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;

  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.json({ authenticated: false });
      return;
    }

    res.status(200).json({ authenticated: true, username: user.username, nickname: user.nickname });
    return;

  } catch (error) {
    res.status(401).json({ authenticated: false });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true
    });
    res.json({ message: 'Logged out successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}`  });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await User.findOneAndDelete({ username: username });

    if (!user) {
      res.status(404).json({ message: 'User  not found' });
      return;
    }

    await Note.deleteMany({ userId: user._id });

    res.clearCookie('authToken', {
      httpOnly: true
    });

    res.json({ message: 'User  deleted successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
    return;
  }
};