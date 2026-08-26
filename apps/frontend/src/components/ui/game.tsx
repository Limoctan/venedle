import { useCallback, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import {
  useCharacterDirectory,
  useTodayCharacter,
} from '../../hooks/useCharacters';
import { Autocomplete } from './autocomplete';
import { GuessRow } from './guessRow';
import { Header } from './header';
import { ResultCard } from './resultCard';
import { categoryLabel } from '@/lib/categories';

const CATEGORY_ORDER = [
  'Field',
  'Gender',
  'Birth Year',
  'State of Origin',
  'Status',
  'International Reach',
  'Peak Era',
  'Discipline/Genre',
];

export function Game() {
  const { guesses, gameWon, gameLost, currentStreak, addGuess } =
    useGameState();
  const { imageByName } = useCharacterDirectory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameOver = gameWon || gameLost;
  const today = useTodayCharacter(gameOver);
  const answerName =
    (gameWon && guesses.length > 0 && guesses[guesses.length - 1].name) ||
    (today?.name ?? '');

  const handleGuess = useCallback(
    async (name: string) => {
      if (isSubmitting) return;
      if (gameOver) return;

      const alreadyGuessed = guesses.some(
        (g) => normalize(g.name) === normalize(name),
      );
      if (alreadyGuessed) {
        setError('Ya adivinaste ese nombre');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      const body = { guessedName: name };

      try {
        const res = await fetch('/api/game/guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Error del servidor');
        }

        const result = await res.json();
        addGuess({
          name,
          comparisons: result.response.comparisons,
          isCorrect: result.response.isCorrect,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Algo salió mal');
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, gameOver, guesses, addGuess],
  );

  return (
    <div className="w-full">
      <Header streak={currentStreak} />

      {!gameOver && (
        <div className="mt-6 mb-8">
          <Autocomplete
            onSelect={handleGuess}
            disabled={isSubmitting}
            excludedNames={guesses.map((g) => g.name)}
          />
          {isSubmitting && (
            <p className="mt-3 text-center text-sm text-ink-soft">
              Verificando…
            </p>
          )}
          {error && (
            <p className="mt-3 text-center text-sm font-semibold text-flag-red">
              {error}
            </p>
          )}
        </div>
      )}

      {guesses.length > 0 && (
        <div className="grid grid-cols-9 gap-1.5" aria-hidden="true">
          <div className="text-center text-[10px] font-bold tracking-wide text-ink-soft uppercase">
            Foto
          </div>
          {CATEGORY_ORDER.map((category) => (
            <div
              key={category}
              className="truncate text-center text-[10px] font-bold tracking-wide text-ink-soft uppercase"
            >
              {categoryLabel(category)}
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-col-reverse gap-2">
        {guesses.map((guess, i) => (
          <GuessRow
            key={i}
            name={guess.name}
            comparisons={guess.comparisons}
            imgUrl={imageByName.get(guess.name)}
          />
        ))}
      </div>

      {gameOver && answerName && today && (
        <ResultCard
          won={gameWon}
          name={answerName}
          imgUrl={today.imageUrl ?? ''}
          field={today.field}
          stateOfOrigin={today.stateOfOrigin}
          attempts={guesses.length}
          streak={currentStreak}
          guesses={guesses}
        />
      )}
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
