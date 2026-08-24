export const CATEGORY_LABELS: Record<string, string> = {
  Field: 'Carrera',
  Gender: 'Género',
  'Birth Year': 'Nacimiento',
  'State of Origin': 'Estado',
  Status: 'Estatus',
  'International Reach': 'Relevancia',
  'Peak Era': 'Época',
  'Discipline/Genre': 'Disciplina',
};

const SHORT_VALUES: Record<string, string> = {
  'Presentador de TV': 'TV',
  Latinoamérica: 'Latinoam.',
  'Non-binario': 'No bin.',
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function shortValue(value: string): string {
  return SHORT_VALUES[value] ?? value;
}
