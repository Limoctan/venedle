"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_controller_1 = require("../src/controllers/character.controller");
jest.mock('../src/services/character.service', () => ({
    CharacterService: jest.fn().mockImplementation(() => ({
        getCharacterByName: jest.fn(),
        getAllCharacters: jest.fn(),
    })),
}));
const mockCharacter = {
    id: 1,
    name: 'Juan Pérez',
    field: 'Deportista',
    gender: 'Masculino',
    birthYear: 1985,
    stateOfOrigin: 'Lara',
    status: 'Vivo',
    internationalReach: 'Global',
    peakEra: '2010s',
    disciplineGenre: 'Fútbol',
};
describe('CharacterController', () => {
    let controller;
    let req;
    let res;
    let next;
    beforeEach(() => {
        jest.clearAllMocks();
        controller = new character_controller_1.CharacterController();
        req = { params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    describe('getCharactersByName', () => {
        it('should return 400 when name parameter is missing', async () => {
            await controller.getCharactersByName(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Name query parameter is required and must be a string.',
            });
            expect(next).not.toHaveBeenCalled();
        });
        it('should return 400 when name parameter is not a string', async () => {
            req.params = { name: 123 };
            await controller.getCharactersByName(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Name query parameter is required and must be a string.',
            });
        });
        it('should return 404 when no character matches the name', async () => {
            req.params = { name: 'Unknown Person' };
            controller.characterService.getCharacterByName.mockResolvedValue(null);
            await controller.getCharactersByName(req, res, next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Character with name "Unknown Person" not found.',
            });
            expect(next).not.toHaveBeenCalled();
        });
        it('should return the character when found', async () => {
            req.params = { name: 'Juan Pérez' };
            controller.characterService.getCharacterByName.mockResolvedValue(mockCharacter);
            await controller.getCharactersByName(req, res, next);
            expect(controller.characterService.getCharacterByName).toHaveBeenCalledWith('Juan Pérez');
            expect(res.json).toHaveBeenCalledWith(mockCharacter);
            expect(res.status).not.toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
        });
        it('should call next with the error when the service throws', async () => {
            req.params = { name: 'Juan Pérez' };
            const error = new Error('database down');
            controller.characterService.getCharacterByName.mockRejectedValue(error);
            await controller.getCharactersByName(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
        });
    });
    describe('getAllCharacters', () => {
        it('should return all characters with status 200', async () => {
            controller.characterService.getAllCharacters.mockResolvedValue([mockCharacter]);
            await controller.getAllCharacters(req, res, next);
            expect(controller.characterService.getAllCharacters).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockCharacter]);
            expect(next).not.toHaveBeenCalled();
        });
        it('should return an empty array when no characters exist', async () => {
            controller.characterService.getAllCharacters.mockResolvedValue([]);
            await controller.getAllCharacters(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
        it('should return 500 and call next when the service throws', async () => {
            const error = new Error('database down');
            controller.characterService.getAllCharacters.mockRejectedValue(error);
            await controller.getAllCharacters(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'database down',
            });
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
