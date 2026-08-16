"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const character_controller_1 = require("../controllers/character.controller");
const characterRoutes = express_1.default.Router();
characterRoutes.get('/', new character_controller_1.CharacterController().getAllCharacters);
characterRoutes.get('/names', new character_controller_1.CharacterController().getAllCharacterNames);
characterRoutes.get('/:name', new character_controller_1.CharacterController().getCharactersByName);
exports.default = characterRoutes;
