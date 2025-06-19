import { HTMLAttributes, PropsWithChildren } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Box.scss';

interface BoxProps extends HTMLAttributes<HTMLElement> {
    tag?: React.ElementType;
    fullWidth?: boolean;
}
function Box({ children, fullWidth, tag = 'div', ...props }: PropsWithChildren<BoxProps>) {
    const CustomTag = tag;

    const className = joinClass([
        'ui-box',
        fullWidth && 'ui-box--fullwidth',
        props.className
    ]);

    return (
        <CustomTag {...props} className={className}>
            {children}
        </CustomTag>
    );
}

export default createComponent(Box);