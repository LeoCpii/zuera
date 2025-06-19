import {
    shuffle,
    getRandom,
    chooseNumber,
    getFilledArray,
    removeDuplicate,
} from './array';

describe('Array', () => {
    describe('shuffle', () => {
        it('should return an array with the same elements', () => {
            const array = [1, 2, 3, 4, 5];
            const shuffledArray = shuffle(array.slice());

            expect(shuffledArray).toHaveLength(array.length);
            expect(shuffledArray).toEqual(expect.arrayContaining(array));
        });

        it('should not return the array in the same order', () => {
            const array = [1, 2, 3, 4, 5];
            const shuffledArray = shuffle(array.slice());

            expect(shuffledArray).not.toEqual(array);
        });

        it('should handle an empty array', () => {
            const array: any[] = [];
            const shuffledArray = shuffle(array);

            expect(shuffledArray).toEqual([]);
        });

        it('should handle an array with one element', () => {
            const array = [1];
            const shuffledArray = shuffle(array);

            expect(shuffledArray).toEqual([1]);
        });
    });

    describe('removeDuplicate', () => {
        it('should remove duplicates from an array of numbers', () => {
            const input = [1, 2, 2, 3, 4, 4, 5];
            const output = removeDuplicate(input);

            expect(output).toEqual([1, 2, 3, 4, 5]);
        });

        it('should remove duplicates from an array of strings', () => {
            const input = ['apple', 'banana', 'apple', 'orange', 'banana'];
            const output = removeDuplicate(input);
            expect(output).toEqual(['apple', 'banana', 'orange']);
        });

        it('should remove duplicates from an array of objects', () => {
            const obj1 = { name: 'Alice' };
            const obj2 = { name: 'Bob' };
            const obj3 = { name: 'Alice' };
            const input = [obj1, obj2, obj1, obj3];
            const output = removeDuplicate(input);

            expect(output).toEqual([obj1, obj2, obj3]);
        });

        it('should return an empty array when input is empty', () => {
            const input: any[] = [];
            const output = removeDuplicate(input);

            expect(output).toEqual([]);
        });
    });

    describe('chooseNumber', () => {
        it('should return a number within the range for positive values', () => {
            const min = 1;
            const max = 10;
            const result = chooseNumber(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it('should return a number within the range for negative values', () => {
            const min = -10;
            const max = -1;
            const result = chooseNumber(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it('should return the exact number when min and max are the same', () => {
            const min = 5;
            const max = 5;
            const result = chooseNumber(min, max);
            expect(result).toBe(5);
        });

        it('should return a number within the range for floating-point values', () => {
            const min = 1.5;
            const max = 5.5;
            const result = chooseNumber(min, max);

            expect(result).toBeGreaterThanOrEqual(Math.ceil(min));
            expect(result).toBeLessThanOrEqual(Math.floor(max));
        });

        it('should consistently generate numbers within the given range over multiple calls', () => {
            const min = 10;
            const max = 20;
            const results = Array.from({ length: 100 }, () => chooseNumber(min, max));

            results.forEach((result) => {
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            });
        });
    });

    describe('getRandom', () => {
        it('should return a random element from the array', () => {
            const array = [1, 2, 3, 4, 5];
            const result = getRandom(array);

            expect(array).toContain(result);
        });
    });

    describe('getFilledArray', () => {
        it('should return an array of the given length', () => {
            const length = 5;
            const result = getFilledArray(length);

            expect(result).toHaveLength(length);
        });

        it('should return an array with elements from 0 to length - 1', () => {
            const length = 5;
            const result = getFilledArray(length);

            expect(result).toEqual([0, 1, 2, 3, 4]);
        });

        it('should return an empty array when length is 0', () => {
            const length = 0;
            const result = getFilledArray(length);

            expect(result).toEqual([]);
        });
    });
});