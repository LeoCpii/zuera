import type { Timestamp } from 'firebase/firestore';

export type UserStatus = 'active' | 'inactive';

export interface UserData {
    id: string;
    name: string;
    email: string;
    picture: string;
    roles: string[];
    plans: string[];
    createdAt: Timestamp;
    status: UserStatus;
}

export interface FirebaseUser {
    email: string;
    email_verified: boolean;
    auth_time: number;
    user_id: string;
    firebase: {
        identities: {
            email: Array<string>;
        },
        sign_in_provider: string;
    },
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
}
