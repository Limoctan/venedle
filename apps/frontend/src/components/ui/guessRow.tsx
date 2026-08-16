import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Comparison } from '@venedle/shared/src/types/guesses';
import { cn } from '@/lib/utils';
import { shortValue } from '@/lib/categories';

export function GuessRow({ comparisons }: { comparisons: Comparison[] }) {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {comparisons.map((col) => (
        <div
          key={col.category}
          title={col.guessedValue}
          className={cn(
            'relative flex min-h-10 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5',
            col.match
              ? 'bg-correct text-white shadow-sm'
              : 'bg-miss text-miss-ink',
          )}
        >
          {col.match && <span className="flag-stripe" aria-hidden="true" />}
          <span className="w-full truncate text-center text-[11px] font-bold leading-tight">
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