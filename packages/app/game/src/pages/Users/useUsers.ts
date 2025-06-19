import { useContext } from 'react';

import { UsersContext } from './UsersProvider';

export default function useUsers() {
    return useContext(UsersContext);
}