import { cloneElement, LiHTMLAttributes } from 'react';

import { getPath } from '@zuera/toolkit/url';

import { joinClass } from '../../utils';
import Ripple from '../../components/Ripple';
import type { IconProps } from '../../components/Icon';

import './Sidebar.scss';

export interface SidebarButtonProps extends LiHTMLAttributes<HTMLElement> {
    icon: React.JSX.Element;
    path?: string;
    label?: string;
}
export default function SidebarButton({ label, icon, ...props }: SidebarButtonProps) {
    const url = getPath();

    const isActive = url === props.path;

    const className = joinClass([
        'ui-sidebar__button',
        isActive && 'ui-sidebar__button--active',
    ]);

    const renderIcon = () => {
        return cloneElement<IconProps>(icon, {
            className: joinClass([icon.props.className, 'ui-sidebar__button__icon'])
        });
    };

    return (
        <li tabIndex={0} className={className} {...props}>
            {renderIcon()}
            {label && <span className="ui-sidebar__button__label">{label}</span>}
            <Ripple />
        </li>
    );
}