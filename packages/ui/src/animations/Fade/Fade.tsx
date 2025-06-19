import React, { useEffect, useState } from 'react';

import type { Style } from '../interface';

const styledShow = (timeout: number): Style => ({
    opacity: 1,
    transition: `all ${timeout}s ease-in-out`
});

const styledHide = (timeout: number): Style => ({
    opacity: 0,
    transition: `all ${timeout}s ease-in-out`
});

interface FadeProps { enter: boolean, delay?: number; timeout?: number; children: React.ReactNode; }
export default function Fade({ children, enter, delay = 0, timeout = .2 }: FadeProps) {
    const [style, setStyle] = useState<Style>(styledHide(timeout));

    useEffect(() => {
        setTimeout(() => {
            setStyle(enter ? styledShow(timeout) : styledHide(timeout));
        }, delay);
    }, [enter]);

    return (
        <div style={style}>
            {children}
        </div>
    );
}