import { useEffect, useState } from 'react';

type UseDrawer = [boolean, () => void]

export default function useDrawer(open = false): UseDrawer {
    const [_open, setOpen] = useState(false);

    useEffect(() => { setOpen(open); }, [open]);

    const toogleDrawer = () => { setOpen(prev => !prev); };

    return [_open, toogleDrawer];
}