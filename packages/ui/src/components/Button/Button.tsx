import { type PropsWithChildren, type ButtonHTMLAttributes, cloneElement } from 'react';

import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass';
import createComponent from '../../core/createComponent';
import type { Colors, Size } from '../../theme';
import type { IconProps } from '../../components/Icon';
import type { LoadingProps } from '../../components/Loading';

import './Button.scss';

export interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    size?: Size;
    color?: Colors;
    noHover?: boolean;
    fullWidth?: boolean;
    endIcon?: React.JSX.Element;
    startIcon?: React.JSX.Element;
    loading?: React.JSX.Element | boolean;
    variant?: 'contained' | 'outlined' | 'text';
};
function Button({
    size = 'medium',
    color = 'primary',
    variant = 'contained',
    fullWidth,
    startIcon,
    noHover = false,
    endIcon,
    loading,
    children,
    ...props
}: ButtonProps) {
    const cls = joinClass([
        'ui-button',
        `ui-button--${size}`,
        `ui-button--${color}`,
        `ui-button--${color}--${variant}`,
        noHover && 'ui-button--noHover',
        fullWidth && 'ui-button--fullWidth',
        props.className
    ]);

    const renderIcon = (icon: React.JSX.Element, direction: 'left' | 'right') => {
        return cloneElement<IconProps>(icon, {
            color: `${color}.contrastText`,
            className: joinClass([icon.props.className, 'ui-button__icon', `ui-button__icon--${direction}`])
        });
    };

    const renderLoading = (loading: React.JSX.Element) => {
        return cloneElement<LoadingProps>(loading, {
            className: joinClass([loading.props.className, 'ui-button__loading', `ui-button__loading--${size}`]),
            size: '1.1rem',
        });
    };

    return (
        <button
            {...props}
            className={cls}
            onClick={(e) => !loading && props.onClick?.(e)}
        >
            {
                loading ? renderLoading(loading as React.JSX.Element) : (
                    <>
                        {startIcon && renderIcon(startIcon, 'left')}
                        {children}
                        {endIcon && renderIcon(endIcon, 'right')}
                    </>
                )
            }
            <Ripple />
        </button>
    );
}

export default createComponent(Button);