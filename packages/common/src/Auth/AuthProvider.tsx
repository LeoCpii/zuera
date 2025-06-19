
import { createContext, useEffect, useMemo, useState } from 'react';

import Icon from '@zuera/ui/components/Icon';
import { useAlert } from '@zuera/ui/components/Alert';

import logger from '@zuera/toolkit/logger';
import { getParams } from '@zuera/toolkit/url';

import type { UserData } from '@zuera/services/user';
import type UserServices from '@zuera/services/user';
import type AuthServices from '@zuera/services/auth';

type BasicUser = { name: string; email: string; password: string }

export interface AuthContextConfig {
    user?: UserData;
    token?: string;

    logout: () => Promise<void>;

    loginWithGoogle: () => Promise<string>;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

export const AuthContext = createContext<AuthContextConfig>({
    user: undefined,
    token: undefined,

    logout: () => Promise.resolve(),

    loginWithGoogle: async () => Promise.resolve(''),
});

interface AuthProviderProps {
    authServices: AuthServices;
    usersServices: UserServices;
    children: React.JSX.Element;
    onAuthenticate?: (user?: UserData) => void;
}
export default function AuthProvider({
    children,
    authServices,
    usersServices,
    onAuthenticate = () => { },
}: AuthProviderProps) {
    const { addAlert } = useAlert();

    const [user, setUser] = useState<UserData>();

    const context = useMemo<AuthContextConfig>(() => ({
        user,
        token: authServices.access_token,

        logout: async () => logout(),

        loginWithGoogle: async () => loginWithGoogle(),

        createByAuth: async (data) => createByAuth(data),
    }), [user]);

    useEffect(() => { getUser(); }, []);

    const logout = () => { authServices.logout(); };

    const getUser = () => {
        const params = getParams<{ email: string; }>();

        if (window.location.href.includes('error')) { return; }

        const email = params.email || usersServices.currentByToken.email;

        if (!email) {
            onAuthenticate();
            return;
        }

        return usersServices.getByEmail(email)
            .then((user) => {
                setUser(user as UserData);
                return user;
            })
            .then((user) => onAuthenticate(user as UserData))
            .catch(() => {
                authServices.logout()
                    .then(() => onAuthenticate())
                    .then(() => logger.info('Usuário não encontrado'));
            });
    };

    const loginWithGoogle = async () => {
        try {
            const googleUser = await authServices.loginWithGoogle();

            if (!googleUser) { throw new Error('Erro ao autenticar'); }

            logger.info('usuário criado no autenticador!', googleUser);

            const userByEmail = await usersServices.getByEmail(googleUser.email);

            if (userByEmail) { return authServices.access_token; }

            const createdUser = await usersServices.createByAuth({
                id: googleUser?.user_id as string,
                email: googleUser?.email || '',
                name: ''
            });

            logger.info('usuario criado!', createdUser);

            return authServices.access_token;
        } catch (error: any) {
            addAlert({
                color: 'error',
                message: FIREBASE[error?.code] || 'Erro ao fazer login',
                icon: <Icon name="error" />,
            });

            logger.info('Error on login:', { error });

            throw error;
        }
    };

    const createByAuth = async ({ email, name, password }: BasicUser) => {
        try {
            const firebaseUser = await authServices.createUserWithPassword(email, password, { persist: true });

            logger.info('usuário criado no autenticador!', firebaseUser);

            const user = await usersServices.createByAuth({ id: firebaseUser?.user_id as string, email, name });

            logger.info('usuario criado!', user);

            return authServices.access_token;
        } catch (error: any) {
            const { code } = error;

            addAlert({
                color: 'error',
                message: FIREBASE[code] || 'Erro ao criar usuário',
                icon: <Icon name="error" />,
            });

            logger.error('Erro ao criar ususario, ', { error });

            throw error;
        }
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}