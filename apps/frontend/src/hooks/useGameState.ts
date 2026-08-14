// hooks/useGameState.ts
import type { Comparison } from '@venedle/shared/src/types/guesses';
import { useLocalStorage } from './useLocalStorage';

const TODAY = new Date().toISOString().split('T')[0]; // "2026-08-13"

interface Guess {
  name: string;
  comparisons: Comparison[];
  isCorrect: boolean;
}

interface GameState {
  date: string;
  guesses: Guess[];
  gameWon: boolean;
  gameLost: boolean;
  currentStreak: number;
  maxStreak: number;
  stats: Record<string, number>;
}

const DEFAULT_STATE: GameState = {
  date: TODAY,
  guesses: [],
  gameWon: false,
  gameLost: false,
  currentStreak: 0,
  maxStreak: 0,
  stats: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, fail: 0 },
};

export function useGameState() {
  const [state, setState] = useLocalStorage<GameState>(
    'venedle-game',
    DEFAULT_STATE,
  );

  // If the stored date is NOT today, reset guesses but keep stats/streaks
  const isNewDay = state.date !== TODAY;

  const gameState = isNewDay
    ? {
        ...DEFAULT_STATE,
        currentStreak: 0,
        maxStreak: state.maxStreak,
        stats: state.stats,
      }
    : state;

  const addGuess = (guess: Guess) => {
    const newGuesses = [...gameState.guesses, guess];
    const won = guess.isCorrect;
    const lost = !won && newGuesses.length >= 8; // 8 max attempts

    const newState: GameState = {
      ...gameState,
      date: TODAY,
      guesses: newGuesses,
      gameWon: won,
      gameLost: lost,
    };

    if (won) {
      const attemptCount = newGuesses.length;
      newState.stats = {
        ...newState.stats,
        [attemptCount]: (newState.stats[attemptCount] || 0) + 1,
      };
      newState.currentStreak = gameState.currentStreak + 1;
      newState.maxStreak = Math.max(newState.maxStreak, newState.currentStreak);
    } else if (lost) {
      newState.stats = { ...newState.stats, fail: newState.stats.fail + 1 };
      newState.currentStreak = 0;
    }

    setState(newState);
  };

  return {
    guesses: gameState.guesses,
    gameWon: gameState.gameWon,
    gameLost: gameState.gameLost,
    currentStreak: gameState.currentStreak,
    maxStreak: gameState.maxStreak,
    stats: gameState.stats,
    addGuess,
    isNewDay,
  };
}
