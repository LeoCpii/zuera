import { Children, cloneElement, ReactElement } from 'react';

import { SidebarButtonProps } from './SidebarButton';
import { joinClass } from '../../utils';

import './Sidebar.scss';

interface SidebarProps {
    compact?: boolean;
    upButtons: React.ReactNode;
    downButtons: React.ReactNode;
}
export default function Sidebar({ compact = false, upButtons, downButtons }: SidebarProps) {
    const className = joinClass(['ui-sidebar', compact && 'ui-sidebar--compact']);

    const renderButtons = (children: React.ReactNode) => {
        const div = Children.toArray(children) as ReactElement<any>[];
        const arrayChildren = Children.toArray(div[0].props.children) as ReactElement<SidebarButtonProps>[];

        return arrayChildren.map((child, index) => {
            return cloneElement(child, {
                key: `sidebar-button-${index}`,
            });
        });
    };

    return (
        <ul className={className}>
            <div style={{ width: '100%' }}>
                {renderButtons(upButtons)}
            </div>

            <div style={{ width: '100%' }}>
                {renderButtons(downButtons)}
            </div>
        </ul>
    );
}