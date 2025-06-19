import { HTMLAttributes, useState } from 'react';

import useResize from '../../hooks/useResize';
import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Container.scss';

type Width = string | number;

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    sm?: Width;
    md?: Width;
    lg?: Width;
    children: React.ReactNode;
}
function Container({ children, lg = 950, md = 750, sm = '100%', ...props }: ContainerProps) {
    const [width, setWidth] = useState<Width>(0);

    const MAP = { sm, lg, md };

    const className = joinClass(['ui-container', props.className]);

    useResize({
        onXs: () => setWidth(MAP['sm']),
        onSm: () => setWidth(MAP['md']),
        onMd: () => setWidth(MAP['md']),
        onLg: () => setWidth(MAP['lg']),
        onXl: () => setWidth(MAP['lg']),
    });

    return (
        <div {...props} style={{ width, ...props.style }} className={className}>
            {children}
        </div>
    );
}

export default createComponent(Container);