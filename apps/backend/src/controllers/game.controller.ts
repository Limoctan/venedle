import { Request, Response, NextFunction } from 'express';
import { Character } from '@venedle/shared/src/types/characters';
import { CharacterService } from '../services/character.service';
import { getDailyCharacter } from '../utils/dailySeed';
import { compareCharacters } from '../utils/comparators';
import { Comparison } from '@venedle/shared/src/types/guesses';

interface GuessResponse {
  isCorrect: boolean;
  comparisons: Comparison[];
  todayCharacter?: Character;
}

export class GameController {
  characterService: CharacterService = new CharacterService();

  guessCharacter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Received guessCharacter request with body:', req.body);
      const { guessedName } = req.body;
      if (!guessedName || typeof guessedName !== 'string') {
        return res.status(400).json({
          error: 'guessedName is required and must be a string.',
        });
      }

      const guessedCharacter =
        await this.characterService.getCharacterByName(guessedName);
      const todayCharacter = await this.characterService.getTodayCharacter();
      const result = compareCharacters(guessedCharacter, todayCharacter);
      const response: GuessResponse = { ...result };
      if (result.isCorrect) {
        response.todayCharacter = todayCharacter;
      }
      res.status(200).json({
        response,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      next(error);
    }
  };

  getTodayCharacter = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const todayCharacter = await this.characterService.getTodayCharacter();
      res.status(200).json({
        response: todayCharacter,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      next(error);
    }
  };
}
