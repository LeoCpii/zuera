import { uuid } from './uuid';

describe('uuid', () => {
    test('should return a string in UUID format', () => {
        const result = uuid();
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        expect(result).toMatch(uuidRegex);
    });

    test('should contain a "4" at the correct position', () => {
        const result = uuid();

        expect(result[14]).toBe('4');
    });

    test('should contain "8", "9", "a", or "b" at the correct position', () => {
        const result = uuid();
        const validChars = ['8', '9', 'a', 'b'];

        expect(validChars).toContain(result[19]);
    });

    test('should generate unique values on multiple calls', () => {
        const uuids = new Set(Array.from({ length: 1000 }, () => uuid()));

        expect(uuids.size).toBe(1000);
    });
});