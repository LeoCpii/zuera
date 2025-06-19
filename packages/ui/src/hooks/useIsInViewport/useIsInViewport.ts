import { RefObject, useState, useMemo, useEffect } from 'react';

export default function useIsInViewport(ref: RefObject<HTMLDivElement | null>) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(() =>
        new IntersectionObserver(([entry]) => { return setIsIntersecting(entry.isIntersecting); }), []
    );

    useEffect(() => {
        if (ref) { observer.observe(ref.current as any); }

        return () => { observer.disconnect(); };
    }, [ref, observer]);

    return isIntersecting;
}