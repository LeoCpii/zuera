import type {
    Firestore,
    Transaction,
    DocumentData,
    WithFieldValue,
    WhereFilterOp,
} from 'firebase/firestore';
import {
    doc,
    query,
    where,
    setDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    collection,
    arrayUnion,
    runTransaction
} from 'firebase/firestore';

import { Path, ArrayOrObject } from '@zuera/toolkit/interface';

type Field = WithFieldValue<DocumentData>;

type CollectionData<
    F extends Field,
    T extends ArrayOrObject<F> = ArrayOrObject<F>,
    K extends Path<T> = Path<T>,
> = {
    data: F;
    path: string;
    pathSegments: string[];
    filters: Array<{
        field: K;
        operator: WhereFilterOp;
        value: T[K] extends Array<infer V> ? V : T[K];
    }>;
};

type CollectionSegmentData<F extends Field, S> = {
    path: string;
    pathSegments: string[];
    pathToSegment: Path<F>;
    dataSegment: S;
};

type CollectionWithData<F extends Field> = Omit<CollectionData<F>, 'filters'>;
type CollectionWithFilters<F extends Field> = Omit<CollectionData<F>, 'data'>;
type CollectionWithOnlyPaths<F extends Field> = Omit<CollectionData<F>, 'data' | 'filters'>;

export default class DB {
    constructor(private db: Firestore) { }

    public async setItem<F extends Field>({ path, data, pathSegments }: CollectionWithData<F>) {
        const ref = doc(this.db, path, ...pathSegments);

        return setDoc(ref, data);
    }

    public async deleteItem<F extends Field>({ path, pathSegments }: CollectionWithOnlyPaths<F>) {
        const ref = doc(this.db, path, ...pathSegments);

        return deleteDoc(ref);
    }

    public async getItem<F extends Field>({ path, filters, pathSegments }: CollectionWithFilters<F>) {
        const q = query(
            collection(this.db, path, ...pathSegments),
            ...filters.map(({ field, operator, value }) => where(field as string, operator, value))
        );

        return getDocs(q)
            .then((querySnapshot) => {
                const result = querySnapshot.docs.map((doc) => doc.data() as F);
                return result ? result[0] : null;
            });
    }

    public async getList<F extends Field>({ path, filters, pathSegments }: CollectionWithFilters<F>) {
        const q = query(
            collection(this.db, path, ...pathSegments),
            ...filters.map(({ field, operator, value }) => where(field as string, operator, value))
        );

        return getDocs(q)
            .then((querySnapshot) => {
                return querySnapshot.docs.map<F>((doc) => doc.data() as F);
            });
    }

    public async insert<F extends Field, S>({
        path,
        pathToSegment,
        dataSegment,
        pathSegments,
    }: CollectionSegmentData<F, S>) {
        const ref = doc(this.db, path, ...pathSegments);

        updateDoc(ref, {
            [pathToSegment]: arrayUnion(dataSegment)
        });
    }

    public async transaction<F extends Field>() {
        const getRef = ({ path, pathSegments }: CollectionWithOnlyPaths<F>) => doc(this.db, path, ...pathSegments);

        const transaction = async (callback: (t: Transaction) => void) => {
            return await runTransaction(this.db, async (transaction) => {
                return callback(transaction);
            });
        };

        return { getRef, transaction };
    }
}