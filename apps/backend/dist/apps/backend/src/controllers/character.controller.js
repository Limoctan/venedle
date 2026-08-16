"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const character_service_1 = require("../services/character.service");
class CharacterController {
    characterService = new character_service_1.CharacterService();
    getCharactersByName = async (req, res, next) => {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({
                    error: 'Name query parameter is required and must be a string.',
                });
            }
            const characters = await this.characterService.getCharacterByName(name);
            if (!characters) {
                return res.status(404).json({
                    error: `Character with name "${name}" not found.`,
                });
            }
            res.json(characters);
        }
        catch (error) {
            next(error);
        }
    };
    getAllCharacters = async (req, res, next) => {
        try {
            const characters = await this.characterService.getAllCharacters();
            res.status(200).json(characters);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            next(error);
        }
    };
    getAllCharacterNames = async (req, res, next) => {
        try {
            const names = await this.characterService.getAllCharacterNames();
            res.status(200).json(names);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            next(error);
        }
    };
}
exports.CharacterController = CharacterController;
