import { Game } from './components/ui/game';

function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-cream text-ink">
      <div
        className="pointer-events-none absolute -top-28 -left-28 size-96 rounded-full bg-flag-yellow/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-flag-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl px-4 py-10">
        <div className="m-auto w-full">
          <Game />
        </div>
      </main>
    </div>
  );
}

export default App;
