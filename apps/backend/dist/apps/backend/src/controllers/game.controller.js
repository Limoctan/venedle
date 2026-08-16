"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const character_service_1 = require("../services/character.service");
const dailySeed_1 = require("../utils/dailySeed");
const comparators_1 = require("../utils/comparators");
class GameController {
    characterService = new character_service_1.CharacterService();
    guessCharacter = async (req, res, next) => {
        try {
            console.log('Received guessCharacter request with body:', req.body);
            const { guessedName } = req.body;
            if (!guessedName || typeof guessedName !== 'string') {
                return res.status(400).json({
                    error: 'guessedName is required and must be a string.',
                });
            }
            const allCharacters = await this.characterService.getAllCharacters();
            const guessedCharacter = await this.characterService.getCharacterByName(guessedName);
            const todayCharacter = (0, dailySeed_1.getDailyCharacter)(allCharacters);
            console.log("Today's character:", todayCharacter);
            console.log('Guessed character:', guessedCharacter.stateOfOrigin);
            const result = (0, comparators_1.compareCharacters)(todayCharacter, guessedCharacter);
            const response = { ...result };
            if (result.isCorrect) {
                response.todayCharacter = todayCharacter;
            }
            res.status(200).json({
                response,
            });
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
exports.GameController = GameController;
