export function Attempts({ guesses }: { guesses: number }) {
  return (
    <div className="flex flex-row-reverse mb-2">
      <span
        className="text-sm text-border font-bold tracking-wide uppercase"
        title="Intentos"
      >
        INTENTOS: {guesses} / 10
      </span>
    </div>
  );
}
