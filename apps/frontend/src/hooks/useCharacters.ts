// hooks/useCharacters.ts
import { useState, useEffect } from 'react';

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
