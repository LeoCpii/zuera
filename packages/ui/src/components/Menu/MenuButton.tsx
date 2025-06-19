import { ButtonHTMLAttributes, cloneElement } from 'react';

import { Colors } from '../../theme';
import { joinClass } from '../../utils';
import Ripple from '../../components/Ripple';
import type { IconProps } from '../../components/Icon';
import createComponent from '../../core/createComponent';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: Colors;
    icon?: React.JSX.Element;
}
function MenuButton({ label, icon, color, ...props }: MenuButtonProps) {
    const className = joinClass([
        'ui-menu__item',
        color && `ui-menu__item--${color}`,
        props.className
    ]);

    const renderIcon = () => {
        return icon && cloneElement<IconProps>(icon, {
            size: 'small',
            color: color ? `${color}.main` : 'text.primary',
            style: { marginRight: 8 }
        });
    };

    return (
        <button {...props} className={className}>
            {renderIcon()}
            {label}
            <Ripple />
        </button>
    );
}

export default createComponent(MenuButton);