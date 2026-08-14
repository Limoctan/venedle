// utils/comparators.js

import { Character } from '@venedle/shared/src/types/characters';
import { Comparison, GuessDirection } from '@venedle/shared/src/types/guesses';

function compareText(guessVal: string, targetVal: string) {
  const normalizedGuess = normalize(guessVal);
  const normalizedTarget = normalize(targetVal);
  return {
    match: normalizedGuess === normalizedTarget,
    guessedValue: guessVal,
    targetValue: targetVal,
  };
}

function compareBirthYear(guessYear: number, targetYear: number) {
  const guessedValue = Number(guessYear);
  const targetValue = Number(targetYear);

  if (guessedValue === targetValue) {
    return {
      match: true,
      guessedValue: guessedValue.toString(),
      targetValue: targetValue.toString(),
    };
  }

  return {
    match: false,
    guessedValue: guessedValue.toString(),
    targetValue: targetValue.toString(),
    direction:
      guessedValue < targetValue ? GuessDirection.Higher : GuessDirection.Lower, // arrow points to target
  };
}

function normalize(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .trim();
}

// Main comparison function
export function compareCharacters(
  guessCharacter: Character,
  targetCharacter: Character,
) {
  const comparisons: Comparison[] = [
    {
      category: 'Field',
      ...compareText(guessCharacter.field, targetCharacter.field),
    },
    {
      category: 'Gender',
      ...compareText(guessCharacter.gender, targetCharacter.gender),
    },
    {
      category: 'Birth Year',
      ...compareBirthYear(guessCharacter.birthYear, targetCharacter.birthYear),
    },
    {
      category: 'State of Origin',
      ...compareText(
        guessCharacter.stateOfOrigin,
        targetCharacter.stateOfOrigin,
      ),
    },
    {
      category: 'Status',
      ...compareText(guessCharacter.status, targetCharacter.status),
    },
    {
      category: 'International Reach',
      ...compareText(
        guessCharacter.internationalReach,
        targetCharacter.internationalReach,
      ),
    },
    {
      category: 'Peak Era',
      ...compareText(guessCharacter.peakEra, targetCharacter.peakEra),
    },
    {
      category: 'Discipline/Genre',
      ...compareText(
        guessCharacter.disciplineGenre,
        targetCharacter.disciplineGenre,
      ),
    },
  ];

  const isCorrect = guessCharacter.name === targetCharacter.name;

  return {
    isCorrect,
    comparisons,
  };
}
