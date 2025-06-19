import type { HTMLAttributes } from 'react';

import Ripple from '../Ripple';
import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Card.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> { onClick?: (e?: any) => void; }

function Card({ children, onClick, ...props }: CardProps) {
    const cls = joinClass(['ui-card', onClick && 'ui-card--clickable', props.className]);

    return (
        <div {...props} className={cls} onMouseDown={onClick}>
            {children}
            {onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Card);