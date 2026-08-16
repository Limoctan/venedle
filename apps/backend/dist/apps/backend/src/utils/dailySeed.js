"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyCharacter = getDailyCharacter;
const crypto = require('crypto');
function getDailyCharacter(characters) {
    const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'America/Caracas',
    });
    // Deterministic hash of the date string
    const hash = crypto.createHash('sha256').update(today).digest('hex');
    // Convert first 8 hex chars to a number
    const seed = parseInt(hash.substring(0, 8), 16);
    // Pick character
    const index = seed % characters.length;
    return characters[index];
}
