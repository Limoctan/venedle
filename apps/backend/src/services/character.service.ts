import { CharacterRepository } from '../repositories/character.repository';
import { getDailyCharacter } from '../utils/dailySeed';

export class CharacterService {
  characterRepository = new CharacterRepository();

  getCharacterByName = async (name: string) => {
    return await this.characterRepository.findByName(name);
  };

  getAllCharacterNames = async () => {
    return await this.characterRepository.getAllCharacterNames();
  };

  getAllCharacters = async () => {
    return await this.characterRepository.getAllCharacters();
  };

  getTodayCharacter = async () => {
    const allCharacters = await this.getAllCharacters();
    return getDailyCharacter(allCharacters);
  };
}
