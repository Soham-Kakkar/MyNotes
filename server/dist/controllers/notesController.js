"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.modifyNote = exports.getNotes = exports.createNote = void 0;
const User_1 = __importDefault(require("../models/User"));
const Note_1 = __importDefault(require("../models/Note"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, title, content } = req.body;
    const user = yield User_1.default.findOne({ username: username });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    try {
        const note = new Note_1.default({
            userId,
            title,
            content,
        });
        yield note.save();
        res.status(201).json(note);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
        return;
    }
});
exports.createNote = createNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username; // Correctly access the username string
    const user = yield User_1.default.findOne({ username: username });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    try {
        const notes = yield Note_1.default.find({ userId });
        res.status(200).json(notes);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
        return;
    }
});
exports.getNotes = getNotes;
const modifyNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, content } = req.body;
    try {
        const note = yield Note_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        else {
            res.status(200).json(note);
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error modifying note', error });
        return;
    }
});
exports.modifyNote = modifyNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const note = yield Note_1.default.findByIdAndDelete(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        else {
            res.status(200).json(note);
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error modifying note', error });
        return;
    }
});
exports.deleteNote = deleteNote;
