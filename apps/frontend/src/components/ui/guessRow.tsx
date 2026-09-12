import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Comparison } from '@venedle/shared/src/types/guesses';
import { cn } from '@/lib/utils';
import { shortValue } from '@/lib/categories';
import { Avatar } from './avatar';
import '../css/guessRow.css';

export function GuessRow({
  name,
  comparisons,
  imgUrl,
}: {
  name: string;
  comparisons: Comparison[];
  imgUrl?: string;
}) {
  return (
    <div className="grid grid-cols-9 gap-1.5">
      <div
        className="avatar-cell relative aspect-9/10 border-black shadow-lg/20"
        title={name}
      >
        <Avatar
          name={name}
          src={imgUrl}
          className="size-full rounded-xl text-sm"
        />
      </div>
      {comparisons.map((col) => (
        <div
          key={col.category}
          title={col.guessedValue}
          className={cn(
            `cell relative flex flex-col items-center justify-center border-2 px-2 border-black shadow-lg/20 text-shadow-lg/50 gap-0.5 rounded-xl aspect-9/10`,
            col.match
              ? 'bg-correct text-white shadow-sm'
              : 'bg-miss text-white',
          )}
        >
          <span className="w-full text-center text-[12px] font-bold leading-tight">
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
