import { Cookies } from './cookies';

const value = 'cookieValue';

describe('Cookies', () => {
    const key = 'cookieKey';
    const cookies = new Cookies();

    beforeAll(() => {
        // Set initial cookie value
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: `${key}=${JSON.stringify(value)}`,
        });
    });

    it('Should return initial cookie value', () => {
        expect(cookies.get(key)).toBe(value);
    });

    it('Should update cookie value when setting new value to userId', () => {
        const newValue = 'newCookieValue';
        cookies.set(key, newValue);

        expect(cookies.get(key)).toBe(newValue);
    });

    it('Should remove cookie value when calling remove', () => {
        cookies.remove(key);

        expect(cookies.get(key)).toBe('');
    });
});
