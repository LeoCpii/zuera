import { useContext } from 'react';

import { UserContext } from './UserProvider';

export default function useUser() {
    return useContext(UserContext);
}