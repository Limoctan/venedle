"use strict";
// utils/comparators.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareCharacters = compareCharacters;
const guesses_1 = require("@venedle/shared/src/types/guesses");
function compareText(guessVal, targetVal) {
    const normalizedGuess = normalize(guessVal);
    const normalizedTarget = normalize(targetVal);
    return {
        match: normalizedGuess === normalizedTarget,
        guessedValue: guessVal,
        targetValue: targetVal,
    };
}
function compareBirthYear(guessYear, targetYear) {
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
        direction: guessedValue < targetValue ? guesses_1.GuessDirection.Higher : guesses_1.GuessDirection.Lower, // arrow points to target
    };
}
function normalize(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .toLowerCase()
        .trim();
}
// Main comparison function
function compareCharacters(guessCharacter, targetCharacter) {
    const comparisons = [
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
            ...compareText(guessCharacter.stateOfOrigin, targetCharacter.stateOfOrigin),
        },
        {
            category: 'Status',
            ...compareText(guessCharacter.status, targetCharacter.status),
        },
        {
            category: 'International Reach',
            ...compareText(guessCharacter.internationalReach, targetCharacter.internationalReach),
        },
        {
            category: 'Peak Era',
            ...compareText(guessCharacter.peakEra, targetCharacter.peakEra),
        },
        {
            category: 'Discipline/Genre',
            ...compareText(guessCharacter.disciplineGenre, targetCharacter.disciplineGenre),
        },
    ];
    const isCorrect = guessCharacter.name === targetCharacter.name;
    return {
        isCorrect,
        comparisons,
    };
}
