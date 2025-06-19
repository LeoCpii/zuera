import { useEffect, useState } from 'react';

export default function useTabs(current: number) {
    const [_current, setCurrent] = useState(current);

    useEffect(() => { setCurrent(current); }, [current]);

    const setTab = (index: number) => { setCurrent(index); };

    return {
        setTab,
        current: _current,
    };
}