"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRepository = void 0;
const database_1 = require("../config/database");
function toCharacter(row) {
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
    };
}
class CharacterRepository {
    findByName = async (name) => {
        try {
            const rows = await database_1.db.any('SELECT * FROM characters WHERE LOWER(name) = LOWER($1)', [name]);
            const character = rows[0];
            return toCharacter(character);
        }
        catch (error) {
            console.error('Error fetching character by name:', error);
            throw error;
        }
    };
    getAllCharacters = async () => {
        try {
            const rows = await database_1.db.any('SELECT * FROM characters');
            return rows.map(toCharacter);
        }
        catch (error) {
            console.error('Error fetching all characters:', error);
            throw error;
        }
    };
    getAllCharacterNames = async () => {
        try {
            const names = await database_1.db.any('SELECT name FROM characters ORDER BY name ASC');
            return names.map((row) => row.name);
        }
        catch (error) {
            console.error('Error fetching all character names:', error);
            throw error;
        }
    };
}
exports.CharacterRepository = CharacterRepository;
