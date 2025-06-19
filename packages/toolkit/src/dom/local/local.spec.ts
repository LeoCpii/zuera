import local from './local';

describe('Local', () => {
    const key = 'key';
    const value = 'value';

    beforeEach(() => {
        local.set(key, value);
    });

    afterEach(() => {
        local.remove(key);
    });

    it('should return the value', () => {
        expect(local.get(key)).toBe(value);
    });

    it('should return the value as a string', () => {
        expect(local.get<string>(key)).toBe(value);
    });

    it('should return null when key does not exist', () => {
        expect(local.get('non-existent-key')).toBeNull();
    });
});
