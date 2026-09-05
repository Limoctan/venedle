import { Character } from '@venedle/shared/src/types/characters';
import { db } from '../config/database';

interface CharacterRow {
  id: number;
  name: string;
  field: Character['field'];
  gender: Character['gender'];
  birth_year: number;
  state_of_origin: string;
  status: Character['status'];
  international_reach: Character['internationalReach'];
  peak_era: string;
  discipline_genre: string;
  image_url?: string | null;
  wiki_url?: string | null;
}

function toCharacter(row: CharacterRow): Character {
  return {
    id: row.id,
    name: row.name,
    field: row.field,
    gender: row.gender,
    birthYear: row.birth_year,
    stateOfOrigin: row.state_of_origin,
    status: row.status,
    internationalReach: row.international_reach,
    peakEra: row.peak_era,
    disciplineGenre: row.discipline_genre,
    imageUrl: row.image_url ?? undefined,
    wikiUrl: row.wiki_url ?? undefined,
  };
}

interface CharacterNames {
  name: string;
}
export class CharacterRepository {
  findByName = async (name: string) => {
    try {
      const rows: CharacterRow[] = await db.any(
        'SELECT * FROM characters WHERE LOWER(name) = LOWER($1)',
        [name],
      );

      const character = rows[0];
      return toCharacter(character);
    } catch (error) {
      console.error('Error fetching character by name:', error);
      throw error;
    }
  };

  getAllCharacters = async () => {
    try {
      const rows: CharacterRow[] = await db.any(
        'SELECT * FROM characters ORDER BY id ASC',
      );
      return rows.map(toCharacter);
    } catch (error) {
      console.error('Error fetching all characters:', error);
      throw error;
    }
  };

  getAllCharacterNames = async () => {
    try {
      const names: CharacterNames[] = await db.any(
        'SELECT name FROM characters ORDER BY name ASC',
      );
      return names.map((row) => row.name);
    } catch (error) {
      console.error('Error fetching all character names:', error);
      throw error;
    }
  };
}
