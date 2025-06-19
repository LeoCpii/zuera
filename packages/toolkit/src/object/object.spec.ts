import {
    deepCopy,
} from './object';

describe('Util - Object methods', () => {
    const customObject = { userId: 1, fullName: 'Text' };

    describe('deepCopy', () => {
        it('should return same object when receive simple object', () => {
            expect(deepCopy(customObject)).toStrictEqual(customObject);
        });

        it('should return same object when receive DEEP NESTED object', () => {
            const input = {
                a: 'a',
                b: 4,
                c: { aa: 'aa', bb: 44, cc: { aaa: 'aaa', bbb: 444 } },
                d: [1, 2, 4],
                e: ['1', '2']
            };
            expect(deepCopy(input)).toStrictEqual(input);
        });
    });
});
