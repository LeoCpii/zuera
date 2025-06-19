import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

import { joinClass } from '../../utils';
import createComponent from '../../core/createComponent';

import './Drawer.scss';

type DrawerFooterProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>

export function DrawerFooter({ children, ...props }: DrawerFooterProps) {

    return (
        <div {...props} className={joinClass(['drawer-footer', props.className])}>
            {children}
        </div>
    );
}

export default createComponent(DrawerFooter);
