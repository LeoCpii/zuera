import { Timestamp } from 'firebase/firestore';

import { uuid } from '@zuera/toolkit/uuid';
import { decode } from '@zuera/toolkit/jwt';
import { Cookies, local } from '@zuera/toolkit/dom';

import type DB from '../db';
import type { UserData, FirebaseUser } from './interface';

export default class UserServices {
    private static PATH = 'users';
    private cookies = new Cookies();

    constructor(private db: DB) { }

    get currentByToken(): { email: string } {
        try {
            const token = this.cookies.get<string>('access_token');

            if (!token) { return { email: '' }; }

            const data = decode<FirebaseUser>(token);

            return { email: data.email };
        } catch {
            return { email: '' };
        }
    }

    get current(): UserData {
        return local.get<UserData>('user', true);
    }

    set current(data: UserData) { local.set('user', data); }

    async list() {
        return this.db.getList<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: []
        });
    }

    async getByEmail(email: string) {
        return this.db.getItem<UserData>({
            path: UserServices.PATH,
            pathSegments: [],
            filters: [{ field: 'email', operator: '==', value: email }],
        });
    }

    async createByAuth(user: Pick<UserData, 'email' | 'name' | 'id'>) {
        const { email } = user;

        const newUser: UserData = {
            ...user,
            roles: ['user'],
            plans: ['gratis'],
            status: 'active',
            picture: `https://robohash.org/${email}`,
            createdAt: Timestamp.fromDate(new Date()),
        };

        return this.db.setItem<UserData>({
            data: newUser,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => newUser);
    }

    async createByBackoffice(user: Pick<UserData, 'name' | 'email' | 'roles'>) {
        const newUser: UserData = {
            ...user,
            id: uuid(),
            picture: '',
            plans: [],
            status: 'active',
            createdAt: Timestamp.fromDate(new Date()),
        };

        return this.db.setItem<UserData>({
            data: newUser,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => newUser);
    }

    async delete(email: string) {
        return this.db.deleteItem({
            path: UserServices.PATH,
            pathSegments: [email],
        });
    }

    async update(user: UserData) {
        return this.db.setItem<UserData>({
            data: user,
            path: UserServices.PATH,
            pathSegments: [user.email],
        }).then(() => user);
    }
}