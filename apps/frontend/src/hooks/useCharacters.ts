// hooks/useCharacters.ts
import { useState, useEffect } from 'react';
import type { Character } from '@venedle/shared/src/types/characters';

export const useCharacterNames = () => {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/characters/names')
      .then((r) => r.json())
      .then(setNames)
      .finally(() => setLoading(false));
  }, []);

  return { names, loading };
};

export const useTodayCharacter = (enabled: boolean) => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!enabled) return;
    fetch('http://localhost:3000/api/game/today')
      .then((r) => r.json())
      .then((data) => setCharacter(data.response ?? null))
      .catch(() => setCharacter(null));
  }, [enabled]);

  return character;
};
