import { useEffect } from 'react';

export default function useListenerResized(callback: (w: Window & typeof globalThis) => void, deps: any[]) {

    const handleResize = () => { callback(window); };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [...deps]);
};