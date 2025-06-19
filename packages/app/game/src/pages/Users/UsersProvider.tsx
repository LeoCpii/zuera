import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { Timestamp } from 'firebase/firestore';

import { useAlert } from '@zuera/ui/components/Alert';

import type { UserData } from '@zuera/services/user';

import { userServices } from '@/services/core';

export interface UsersContextConfig {
    loading: boolean;
    users: UserData[];

    getUsers: () => Promise<void>;
    getUser: (email: string) => Promise<void>;

    updateUser: (data: UserData) => Promise<void>;

    createUserByBackoffice: (data: Pick<UserData, 'name' | 'email' | 'roles'>) => Promise<void>;
}

export const UsersContext = createContext<UsersContextConfig>({
    loading: true,
    users: [],

    getUser: () => Promise.resolve(),
    getUsers: () => Promise.resolve(),

    createUserByBackoffice: () => Promise.resolve(),

    updateUser: () => Promise.resolve(),
});

const USER_DEFAULT: UserData = {
    id: '',
    name: '',
    email: '',
    picture: '',
    status: 'active',
    plans: [],
    roles: [],
    createdAt: Timestamp.fromDate(new Date())
};

export default function UsersProvider({ children }: PropsWithChildren) {
    const { addAlert } = useAlert();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const [user, setUser] = useState<UserData>(USER_DEFAULT);

    const context = useMemo<UsersContextConfig>(() => ({
        user,
        users,
        loading,

        getUsers: () => getUsersList(),
        getUser: (id) => getUser(id),

        createUserByBackoffice: (data) => createUserByBackoffice(data),

        updateUser: (data) => updateUser(data),
    }), [users, user, loading]);

    const createUserByBackoffice = async (data: Pick<UserData, 'name' | 'email' | 'roles'>) => {
        return userServices.createByBackoffice(data)
            .then(r => setUsers(prev => [...prev, r]))
            .then(() => addAlert({ color: 'success', message: `O usuário "${data.name}" foi adicionado` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível adicionar o usuario' }));
    };

    const getUser = async (email: string) => {
        return userServices.getByEmail(email)
            .then(r => setUser(r as UserData));
    };

    const getUsersList = async () => {
        return userServices.list()
            .then(r => setUsers(r))
            .finally(() => setLoading(false));
    };

    const updateUser = async (data: UserData) => {
        return userServices.update(data)
            .then(() => setUsers(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: `O usuário "${data.name}" foi editado` }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar o usuario' }));
    };

    return (
        <UsersContext.Provider value={context}>
            {children}
        </UsersContext.Provider>
    );
}