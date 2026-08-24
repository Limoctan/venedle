import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Comparison } from '@venedle/shared/src/types/guesses';
import { cn } from '@/lib/utils';
import { shortValue } from '@/lib/categories';
import '../css/guessRow.css';

export function GuessRow({ comparisons }: { comparisons: Comparison[] }) {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {comparisons.map((col) => (
        <div
          key={col.category}
          title={col.guessedValue}
          className={cn(
            `cell relative flex min-h-10 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 aspect-9/10`,
            col.match
              ? 'bg-correct text-white shadow-sm'
              : 'bg-miss text-white',
          )}
        >
          <span className="w-full text-center text-[11px] font-bold leading-tight">
            {shortValue(col.guessedValue)}
          </span>
          {!col.match && col.direction && (
            <span className="text-[9px] leading-none" aria-label="pista">
              {col.direction === 'higher' ? (
                <ArrowUp className="size-3" />
              ) : (
                <ArrowDown className="size-3" />
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
