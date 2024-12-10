"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
app.use(...middleware_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
