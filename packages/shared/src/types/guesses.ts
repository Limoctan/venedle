export enum GuessDirection {
  Higher = 'higher',
  Lower = 'lower',
}

export interface GuessResult {
  isCorrect: boolean; // true only if name matches exactly
  comparisons: Comparison[]; // one per category
}

export interface Comparison {
  category: string; // "Field", "Gender", "Birth Year", etc.
  guessedValue: string; // what the user picked
  targetValue: string; // what the answer is (only reveal if match!)
  match: boolean; // true = green, false = red
  direction?: GuessDirection; // only for Birth Year when no match
}
