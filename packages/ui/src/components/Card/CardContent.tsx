import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Card.scss';

type CardContentProps = HTMLAttributes<HTMLDivElement>;
function CardContent({ children, ...props }: CardContentProps) {

    const cls = joinClass(['ui-card__content', props.className]);

    return (
        <div {...props} className={cls}>
            {children}
        </div>
    );
}

export default createComponent(CardContent);