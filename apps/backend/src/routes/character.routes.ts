import express from 'express';
import { CharacterController } from '../controllers/character.controller';
const characterRoutes = express.Router();

characterRoutes.get('/', new CharacterController().getAllCharacters);
characterRoutes.get('/names', new CharacterController().getAllCharacterNames);
characterRoutes.get('/:name', new CharacterController().getCharactersByName);

export default characterRoutes;
