import { HTMLAttributes } from 'react';

import Slide from '../../animations/Slide';

interface TabContent extends HTMLAttributes<HTMLDivElement> {
    children: React.JSX.Element;
    value: number;
    current: number;
}

export default function TabContent({ children, value, current, ...props }: TabContent) {
    return (
        value === current && (
            <Slide enter direction="left">
                <div {...props}>
                    {children}
                </div>
            </Slide>
        )
    );
}