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
exports.deleteUser = exports.logout = exports.isLoggedIn = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Note_1 = __importDefault(require("../models/Note"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, nickname, password } = req.body;
    const existingUser = yield User_1.default.findOne({ username: username });
    if (existingUser) {
        res.status(409).json({ message: 'User  already exists' });
        return;
    }
    try {
        const user = new User_1.default({ username: username, nickname: nickname || username, password: password });
        yield user.save();
        const note = new Note_1.default({
            userId: user._id,
            title: "Welcome",
            content: "Your first note!",
        });
        yield note.save();
        res.status(201).json({ message: 'User registered successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username: username });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    try {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
        });
        res.json({ message: 'Logged in successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
        return;
    }
});
exports.login = login;
const isLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.authToken;
    if (!token) {
        res.json({ authenticated: false });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            res.json({ authenticated: false });
            return;
        }
        res.status(200).json({ authenticated: true, username: user.username, nickname: user.nickname });
        return;
    }
    catch (error) {
        res.status(401).json({ authenticated: false });
        return;
    }
});
exports.isLoggedIn = isLoggedIn;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('authToken', {
            httpOnly: true
        });
        res.json({ message: 'Logged out successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
        return;
    }
});
exports.logout = logout;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        const user = yield User_1.default.findOneAndDelete({ username: username });
        if (!user) {
            res.status(404).json({ message: 'User  not found' });
            return;
        }
        yield Note_1.default.deleteMany({ userId: user._id });
        res.clearCookie('authToken', {
            httpOnly: true
        });
        res.json({ message: 'User  deleted successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error}` });
        return;
    }
});
exports.deleteUser = deleteUser;
