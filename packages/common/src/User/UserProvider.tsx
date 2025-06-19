import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@zuera/ui/components/Alert';

import UserServices from '@zuera/services/user';
import type { UserData } from '@zuera/services/user';

export interface UserProviderConfig {
    user?: UserData,

    getUser: (email: string) => Promise<void>;
    updateUser: (user: UserData) => Promise<void>;
}

export const UserContext = createContext<UserProviderConfig>({
    user: undefined,

    getUser: () => Promise.resolve(),
    updateUser: () => Promise.resolve(),
});

export default function UserProvider({ userServices, children }: PropsWithChildren<{
    userServices: UserServices
}>) {
    const { addAlert } = useAlert();

    const [user, setUser] = useState<UserData>();

    const context = useMemo<UserProviderConfig>(() => ({
        user,

        getUser: (email) => getUser(email),
        updateUser: (user) => updateUser(user)
    }), [user]);

    const getUser = async (email: string) => {
        return userServices.getByEmail(email)
            .then(user => {
                if (!user) { return; }

                setUser(user);
            });
    };

    const updateUser = async (user: UserData) => {
        return userServices.update(user)
            .then(() => addAlert({
                color: 'success',
                message: 'Usuário atualizado',
            }));
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}