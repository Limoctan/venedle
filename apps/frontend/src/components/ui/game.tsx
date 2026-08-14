// components/Game.tsx
import { useState, useCallback } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Autocomplete } from './autocomplete';
import { GuessRow } from './guessRow';

export function Game() {
  const { guesses, gameWon, gameLost, addGuess } = useGameState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuess = useCallback(
    async (name: string) => {
      // 1. Guard clauses (prevent bad submissions)
      if (isSubmitting) return;
      if (gameWon || gameLost) return;

      const alreadyGuessed = guesses.some(
        (g) => normalize(g.name) === normalize(name),
      );
      if (alreadyGuessed) {
        setError('Ya adivinaste ese nombre');
        return;
      }

      // 2. Start loading
      setIsSubmitting(true);
      setError(null);

      const body = { guessedName: name };

      try {
        // 3. POST to backend
        const res = await fetch('http://localhost:3000/api/game/guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Error del servidor');
        }

        const result = await res.json();
        // 4. Update state (triggers re-render with new row)
        addGuess({
          name,
          comparisons: result.response.comparisons,
          isCorrect: result.response.isCorrect,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Algo salió mal');
      } finally {
        // 5. Always clear loading
        setIsSubmitting(false);
      }
    },
    [isSubmitting, gameWon, gameLost, guesses, addGuess],
  );

  return (
    <div className="game">
      {/* Previous guesses */}
      <div className="guess-grid">
        {guesses.map((guess, i) => (
          <GuessRow key={i} comparisons={guess.comparisons} />
        ))}
      </div>

      {/* Input (only if game is active) */}
      {!gameWon && !gameLost && (
        <>
          <Autocomplete
            onSelect={handleGuess}
            disabled={isSubmitting}
            excludedNames={guesses.map((g) => g.name)} // hide already guessed
          />
          {isSubmitting && <span className="loading">Verificando...</span>}
          {error && <span className="error">{error}</span>}
        </>
      )}

      {/* Win/Lose screens */}
      {/* {gameWon && <WinModal attempts={guesses.length} />}
      {gameLost && <LoseModal answer={todaysAnswer} />} */}
    </div>
  );
}

function normalize(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
