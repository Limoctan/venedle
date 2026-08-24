import { Game } from './components/ui/game';

function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden  text-white">
      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl px-4 py-10">
        <div className="m-auto w-full">
          <Game />
        </div>
      </main>
    </div>
  );
}

export default App;
