const dateFormatter = new Intl.DateTimeFormat('es-VE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export function Header({ streak }: { streak: number }) {
  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          Venedle
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          ¿Quién es el venezolano de hoy?
        </p>
        <p className="text-xs text-ink-soft/80 capitalize">
          {dateFormatter.format(new Date())}
        </p>
      </div>
      {streak > 0 && (
        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-sm font-bold text-ink shadow-sm"
          title="Racha de días ganados"
        >
          <span aria-hidden="true">🔥</span>
          {streak}
        </span>
      )}
    </header>
  );
}