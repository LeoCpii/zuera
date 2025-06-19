import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

import { joinClass } from '../../utils';
import createComponent from '../../core/createComponent';

import './Drawer.scss';

type DrawerContentProps = PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>
function DrawerContent({ children, ...props }: DrawerContentProps) {
    return (
        <div {...props} className={joinClass(['box', props.className])}>
            {children}
        </div>
    );
}

export default createComponent(DrawerContent);