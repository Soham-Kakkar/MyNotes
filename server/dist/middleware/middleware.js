"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const log_1 = __importDefault(require("../config/log"));
const frontendURI = (_a = process.env.frontendURI) !== null && _a !== void 0 ? _a : 'http://localhost:3000';
// CORS configuration
const corsOptions = {
    origin: frontendURI,
    credentials: true,
};
// Request logging middleware
const requestLogger = (req, res, next) => {
    log_1.default.info(`${req.method} ${req.url}`); // Log the request method and URL
    next();
};
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    log_1.default.error(err.message); // Log the error message
    res.status(500).send('Something went wrong!');
};
const middleware = [
    (0, cors_1.default)(corsOptions),
    express_1.default.json(),
    (0, cookie_parser_1.default)(),
    requestLogger,
    errorHandler
];
exports.default = middleware;
