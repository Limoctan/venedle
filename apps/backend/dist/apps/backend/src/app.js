"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const character_routes_1 = __importDefault(require("./routes/character.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const game_routes_1 = __importDefault(require("./routes/game.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(errorHandler_1.errorHandler);
app.use('/api/characters', character_routes_1.default);
app.use('/api/game', game_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
exports.default = app;
