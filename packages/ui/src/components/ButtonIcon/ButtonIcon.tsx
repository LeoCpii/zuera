import { cloneElement, type ButtonHTMLAttributes, type PropsWithChildren, type ReactElement } from 'react';

import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass/joinClass';
import type { IconProps } from '../../components/Icon';
import createComponent from '../../core/createComponent';
import { MappedColors, useTheme, convertPathToColor } from '../../theme';

import './ButtonIcon.scss';

export interface ButtonIconProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    color?: MappedColors;
    children: ReactElement<IconProps>;
};
function ButtonIcon({ children, color = 'primary.main', ...props }: ButtonIconProps) {
    const { theme: { palette } } = useTheme();

    const cls = joinClass([
        'ui-button-icon',
        color && `ui-button-icon--${color.split('.')[0]}`,
        props.className
    ]);

    const c = convertPathToColor(color, palette);

    const renderIcon = (icon: ReactElement<IconProps>) => {
        return cloneElement(icon, {
            color: color || icon.props.color,
        });
    };

    return (
        <button {...props} className={cls} style={{ ...props.style, color: c }}>
            {renderIcon(children)}
            <Ripple />
        </button>
    );
}

export default createComponent(ButtonIcon);