import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Divider.scss';

export type DividerProps = HTMLAttributes<HTMLElement>;
function Divider({ ...props }: DividerProps) {

    const clss = joinClass(['ui-divider', props.className]);

    return (
        <div {...props} className={clss} />
    );
}

export default createComponent(Divider);