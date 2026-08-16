"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const character_repository_1 = require("../repositories/character.repository");
class CharacterService {
    characterRepository = new character_repository_1.CharacterRepository();
    getCharacterByName = async (name) => {
        return await this.characterRepository.findByName(name);
    };
    getAllCharacterNames = async () => {
        return await this.characterRepository.getAllCharacterNames();
    };
    getAllCharacters = async () => {
        return await this.characterRepository.getAllCharacters();
    };
}
exports.CharacterService = CharacterService;
