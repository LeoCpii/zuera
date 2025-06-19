import { getInitials } from './string';

describe('String', () => {
    describe('getInitials', () => {
        it('should return initials for a simple name', () => {
            expect(getInitials('John Doe')).toBe('JD');
        });

        it('should return initials for a name with multiple words', () => {
            expect(getInitials('Jane Mary Doe')).toBe('JD');
        });

        it('should return the same letter twice for a single-word name', () => {
            expect(getInitials('Leozinho')).toBe('LE');
        });

        it('should ignore extra spaces at the beginning and end', () => {
            expect(getInitials('  Alan Turing  ')).toBe('AT');
        });

        it('should handle names with special characters and lowercase letters', () => {
            expect(getInitials('álvaro de la Torre')).toBe('AT');
        });
    });
});