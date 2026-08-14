import express from 'express';
import { GameController } from '../controllers/game.controller';
const gameRoutes = express.Router();

gameRoutes.post('/guess', new GameController().guessCharacter);

export default gameRoutes;
