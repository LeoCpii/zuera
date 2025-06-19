import { initializeApp } from 'firebase/app';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';

import DB from '@zuera/services/db';
import Storage from '@zuera/services/storage';
import AuthServices from '@zuera/services/auth';
import UserServices from '@zuera/services/user';
import RolesServices from '@zuera/services/roles';
import PlansServices from '@zuera/services/plans';
import SitesServices from '@zuera/services/sites';
import IntegrationsServices from '@zuera/services/integrations';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    admin: import.meta.env.VITE_ADMIN_URL,
    store: import.meta.env.VITE_STORE_URL,
    backoffice: import.meta.env.VITE_BACKOFFICE_URL,
};

export const release = import.meta.env.VITE_RELEASE;

export const isLocal = import.meta.env.VITE_ENV === 'local';

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_APP_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'backoffice');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const firebaseStorage = getStorage(app);

export const authServices = new AuthServices({
    signOut: () => signOut(firebaseAuth),
    googleAuth: () => signInWithPopup(firebaseAuth, googleProvider),
    signInWithPassword: (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password),
    sendPasswordResetEmail: (email) => sendPasswordResetEmail(
        firebaseAuth,
        email,
        { url: `${url.sso}/signin?email=${email}`, handleCodeInApp: true }
    ),
    createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password),
});

export const db = new DB(firestore);
export const storage = new Storage(firebaseStorage);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099');
    connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

// ENTITY SERVICES
export const userServices = new UserServices(db);
export const sitesServices = new SitesServices(db);
export const rolesServices = new RolesServices(db);
export const plansServices = new PlansServices(db);
export const integrationsServices = new IntegrationsServices(db);
