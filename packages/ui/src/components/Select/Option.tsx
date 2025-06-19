import { ButtonHTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';

import './Select.scss';

export interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: any;
    children: string;
}
export default function Option({ children, ...props }: OptionProps) {

    const className = joinClass(['ui-select__option', props.className]);

    return (
        <button type="button" {...props} className={className}>
            {children}
        </button>
    );
};