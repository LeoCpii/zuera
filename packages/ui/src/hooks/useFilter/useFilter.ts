import { useEffect, useMemo, useState } from 'react';

export default function useFilter<T>(data: T[], deps: any[]) {
    const [filtered, setFiltered] = useState(data);

    useEffect(() => { setFiltered(data); }, [data, ...deps]);

    function filter(fn: (data: T) => boolean) { setFiltered(data.filter(fn)); }

    function reset() { setFiltered(data); }

    return useMemo(() => ({ filtered, filter, reset }), [data, filtered]);
} 