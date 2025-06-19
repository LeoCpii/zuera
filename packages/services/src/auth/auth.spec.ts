
import { local } from '@zuera/toolkit/dom/local';
import type { Cookies } from '@zuera/toolkit/dom/cookies';

import Auth, { AuthConfig } from './authServices';

jest.mock('@zuera/toolkit/dom/local', () => ({
    local: {
        has: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
        remove: jest.fn(),
        clear: jest.fn(),
    },
}));

jest.mock('@zuera/toolkit/dom/cookies', () => ({
    Cookies: jest.fn().mockImplementation(() => ({
        get: jest.fn(),
        set: jest.fn(),
        remove: jest.fn(),
    })),
}));

describe('Auth', () => {
    let auth: Auth;
    let cookiesMock: jest.Mocked<Cookies<any>>;

    const mockAuthMethods: AuthConfig = {
        signOut: jest.fn(),
        googleAuth: jest.fn(),
        signInWithPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
    };

    beforeEach(() => {
        auth = new Auth(mockAuthMethods);
        cookiesMock = auth['cookies'] as jest.Mocked<Cookies<any>>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set access_token in cookies', () => {
        auth.access_token = 'it_token';

        expect(cookiesMock.set).toHaveBeenCalledWith('access_token', 'it_token');
    });

    it('should get access_token from cookies', () => {
        cookiesMock.get.mockReturnValue('it_token');

        expect(auth.access_token).toBe('it_token');
        expect(cookiesMock.get).toHaveBeenCalledWith('access_token');
    });

    it('should call signout, remove access_token', async () => {
        mockAuthMethods.signOut = jest.fn().mockResolvedValue(undefined);

        expect(local).toBeDefined();

        await auth.logout();

        expect(mockAuthMethods.signOut).toHaveBeenCalled();
        expect(local.remove).toHaveBeenCalledWith('user');
        expect(cookiesMock.remove).toHaveBeenCalledWith('access_token');
    });
});