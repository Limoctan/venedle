import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/character.routes';
import { errorHandler } from './middlewares/errorHandler';
import gameRoutes from './routes/game.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);
app.use('/api/characters', characterRoutes);
app.use('/api/game', gameRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
