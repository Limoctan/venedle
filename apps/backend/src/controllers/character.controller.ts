import { Request, Response, NextFunction } from 'express';
import { Character } from '@venedle/shared/src/types/characters';
import { CharacterService } from '../services/character.service';

export class CharacterController {
  characterService: CharacterService = new CharacterService();

  getCharactersByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name } = req.params;
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          error: 'Name query parameter is required and must be a string.',
        });
      }
      const characters: Character | null =
        await this.characterService.getCharacterByName(name);
      if (!characters) {
        return res.status(404).json({
          error: `Character with name "${name}" not found.`,
        });
      }
      res.json(characters);
    } catch (error) {
      next(error);
    }
  };

  getAllCharacters = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const characters: Character[] =
        await this.characterService.getAllCharacters();
      res.status(200).json(characters);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      next(error);
    }
  };

  getAllCharacterNames = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const names: string[] =
        await this.characterService.getAllCharacterNames();
      res.status(200).json(names);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      next(error);
    }
  };
}
