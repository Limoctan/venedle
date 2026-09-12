import { Avatar } from './avatar';

interface ResultCardProps {
  won: boolean;
  name: string;
  imgUrl: string;
  wikiUrl: string;
  field: string;
  stateOfOrigin: string;
  attempts: number;
  streak: number;
}

export function ResultCard({
  won,
  name,
  imgUrl,
  wikiUrl,
  field,
  stateOfOrigin,
  attempts,
  streak,
}: ResultCardProps) {
  return (
    <section className="mt-6 flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-sm">
      <Avatar
        name={name}
        src={imgUrl || undefined}
        tone="blue"
        className="size-40 rounded-2xl font-display text-3xl"
      />

      <h2 className="mt-4 font-display text-2xl font-bold text-black/80">
        {won ? '¡Lo lograste!' : '¡Se acabaron los intentos!'}
      </h2>

      <p className="mt-1 text-sm text-black/70">
        {won
          ? `Adivinaste a ${name} en ${attempts} ${attempts === 1 ? 'intento' : 'intentos'}.`
          : `El personaje era ${name}.`}
      </p>

      <p className="mt-2 text-sm font-semibold text-black/90">
        {name}
        <span className="font-normal text-black/70">
          {' '}
          · {field} · {stateOfOrigin}
        </span>
      </p>

      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-miss px-3 py-1 text-xs font-bold text-ink">
          🎯 {attempts}/8
        </span>
        {streak > 0 && (
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-black/90">
            🔥 Racha de {streak}
          </span>
        )}
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-flag-blue px-5 text-sm font-bold text-white transition hover:bg-flag-blue/90 focus-visible:ring-3 focus-visible:ring-ring/40 active:translate-y-px"
      >
        <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-2">
            <div className="bg-white px-1 py-1">
              <img src="wikipedia.svg" alt="" width="20" height="20" />
            </div>
            Visita la wiki de {name}
          </div>
        </a>
      </button>

      <p className="mt-3 text-xs text-black/70">
        Vuelve mañana para un nuevo personaje.
      </p>
    </section>
  );
}
