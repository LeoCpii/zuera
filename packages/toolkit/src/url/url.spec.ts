import { getParams, getPage } from './url';

describe('url', () => {
    describe('getParams', () => {
        beforeEach(() => {
            Object.defineProperty(window, 'location', {
                value: { search: '' },
                writable: true,
            });
        });

        it('should return an object with correct keys and values from query string', () => {
            window.location.search = '?name=John&age=30&city=NewYork';

            const params = getParams<{ name: string; age: string; city: string }>();
            expect(params).toEqual({ name: 'John', age: '30', city: 'NewYork' });
        });

        it('should return an empty object if there are no parameters', () => {
            window.location.search = '';

            const params = getParams();
            expect(params).toEqual({});
        });

        it('should handle parameters with empty values', () => {
            window.location.search = '?name=John&age=&city=NewYork';

            const params = getParams<{ name: string; age: string; city: string }>();
            expect(params).toEqual({ name: 'John', age: '', city: 'NewYork' });
        });

        it('should handle parameters with special characters', () => {
            window.location.search = '?name=Jöhn&city=São+Paulo';

            const params = getParams<{ name: string; city: string }>();
            expect(params).toEqual({ name: 'Jöhn', city: 'São+Paulo' });
        });
    });

    describe('getPage', () => {
        const originalPathname = window.location.pathname;

        afterEach(() => {
            // Restaura o valor original após cada ite
            Object.defineProperty(window, 'location', {
                value: { pathname: originalPathname },
                writable: true,
            });
        });

        it('should return the last part of a simple path', () => {
            Object.defineProperty(window, 'location', {
                value: { pathname: '/home' },
                writable: true,
            });

            const result = getPage<string>();

            expect(result).toBe('home');
        });

        it('should return the last part of a nested path', () => {
            Object.defineProperty(window, 'location', {
                value: { pathname: '/user/profile/settings' },
                writable: true,
            });

            const result = getPage<string>();

            expect(result).toBe('settings');
        });

        it('should return an empty string for the root path', () => {
            Object.defineProperty(window, 'location', {
                value: { pathname: '/' },
                writable: true,
            });

            const result = getPage<string>();

            expect(result).toBe(undefined);
        });

        it('should return the last part of a path with trailing slash', () => {
            Object.defineProperty(window, 'location', {
                value: { pathname: '/user/profile/settings/' },
                writable: true,
            });

            const result = getPage<string>();

            expect(result).toBe('settings');
        });
    });
});