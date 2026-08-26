// hooks/useCharacters.ts
import { useEffect, useMemo, useState } from 'react';
import type { Character } from '@venedle/shared/src/types/characters';

// Module-level cache so every hook consumer shares one HTTP request.
let cache: Character[] | null = null;
let pending: Promise<Character[]> | null = null;

function fetchAllCharacters(): Promise<Character[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = fetch('/api/characters')
      .then((r) => r.json())
      .then((characters: Character[]) => {
        cache = characters;
        return characters;
      });
  }
  return pending;
}

export function useCharacterDirectory() {
  const [characters, setCharacters] = useState<Character[] | null>(cache);

  useEffect(() => {
    if (characters) return;
    let alive = true;
    fetchAllCharacters().then((chars) => {
      if (alive) setCharacters(chars);
    });
    return () => {
      alive = false;
    };
  }, [characters]);

  const names = useMemo(
    () => characters?.map((c) => c.name) ?? [],
    [characters],
  );

  const imageByName = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of characters ?? []) {
      if (c.imageUrl) map.set(c.name, c.imageUrl);
    }
    return map;
  }, [characters]);

  return { names, imageByName, loading: characters === null };
}

export const useTodayCharacter = (enabled: boolean) => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!enabled) return;
    fetch('/api/game/today')
      .then((r) => r.json())
      .then((data) => setCharacter(data.response ?? null))
      .catch(() => setCharacter(null));
  }, [enabled]);

  return character;
};
