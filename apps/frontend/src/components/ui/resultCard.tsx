import { useState } from 'react';
import type { Comparison } from '@venedle/shared/src/types/guesses';

interface ResultCardProps {
  won: boolean;
  name: string;
  field: string;
  stateOfOrigin: string;
  attempts: number;
  streak: number;
  guesses: { comparisons: Comparison[] }[];
}

function buildShareText(won: boolean, attempts: number, guesses: { comparisons: Comparison[] }[]) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const rows = guesses
    .map((g) => g.comparisons.map((c) => (c.match ? '🟩' : '⬜')).join(''))
    .join('\n');
  return `Venedle ${day}/${month} · ${won ? 'Ganado' : 'Perdido'} en ${attempts}/8\n\n${rows}`;
}

export function ResultCard({
  won,
  name,
  field,
  stateOfOrigin,
  attempts,
  streak,
  guesses,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = buildShareText(won, attempts, guesses);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mt-6 flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-sm">
      <div
        className="flex size-16 items-center justify-center rounded-full bg-flag-blue font-display text-3xl font-bold text-white"
        aria-hidden="true"
      >
        {name.charAt(0)}
      </div>

      <h2 className="mt-4 font-display text-2xl font-bold text-ink">
        {won ? '¡Lo lograste!' : '¡Se acabaron los intentos!'}
      </h2>

      <p className="mt-1 text-sm text-ink-soft">
        {won
          ? `Adivinaste a ${name} en ${attempts} ${attempts === 1 ? 'intento' : 'intentos'}.`
          : `El personaje era ${name}.`}
      </p>

      <p className="mt-2 text-sm font-semibold text-ink">
        {name}
        <span className="font-normal text-ink-soft">
          {' '}
          · {field} · {stateOfOrigin}
        </span>
      </p>

      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-miss px-3 py-1 text-xs font-bold text-miss-ink">
          🎯 {attempts}/8
        </span>
        {streak > 0 && (
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ink">
            🔥 Racha de {streak}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-flag-blue px-5 text-sm font-bold text-white transition hover:bg-flag-blue/90 focus-visible:ring-3 focus-visible:ring-ring/40 active:translate-y-px"
      >
        {copied ? '¡Copiado!' : 'Compartir resultado'}
      </button>

      <p className="mt-3 text-xs text-ink-soft">
        Vuelve mañana para un nuevo personaje.
      </p>
    </section>
  );
}