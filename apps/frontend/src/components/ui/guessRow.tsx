import type { Comparison } from '@venedle/shared/src/types/guesses';
import '../css/guessRow.css';

export function GuessRow({ comparisons }: { comparisons: Comparison[] }) {
  return (
    <div className="guess-row">
      {comparisons.map((col) => (
        <div
          key={col.category}
          className={`cell ${col.match ? 'correct' : 'wrong'}`}
        >
          <span className="value">{col.guessedValue}</span>

          {/* Birth Year arrow */}
          {!col.match && col.direction && (
            <span className="arrow">
              {col.direction === 'higher' ? '↑' : '↓'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
