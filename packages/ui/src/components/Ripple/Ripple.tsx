import { useRef, useEffect, useState } from 'react';

import './Ripple.scss';

export default function Ripple() {
    const [ripples, setRipples] = useState<Array<{ x: number, y: number, size: number }>>([]);
    const rippleContainerRef = useRef<HTMLDivElement>(null);

    const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = rippleContainerRef.current!.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        setRipples([...ripples, { x, y, size }]);
    };

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => setRipples([]), 700);
            return () => clearTimeout(timer);
        }
    }, [ripples]);

    return (
        <div className="ui-ripple-container" ref={rippleContainerRef} onMouseUp={addRipple}>
            {
                ripples.map((ripple, index) => (
                    <span
                        key={index}
                        className="ui-ripple"
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size,
                        }}
                    />
                ))
            }
        </div>
    );
}