import { cloneElement, HTMLAttributes } from 'react';

import { joinClass } from '../../utils';
import type { IconProps } from '../Icon';
import type { Colors, MappedColors } from '../../theme';
import type { Variant } from './interface';

import './Tabs.scss';

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    disabled?: boolean;
    color?: Colors;
    variant?: Variant;
    icon?: React.JSX.Element;
}
export default function Tab({ icon, label, disabled, variant = 'line', color = 'primary', ...props }: TabProps) {
    const { 'aria-checked': checked } = props;

    const className = joinClass([
        'ui-tabs__button',
        `ui-tabs__button--${variant}`,
        disabled && 'ui-tabs__button--disabled',
        checked && `ui-tabs__button--active-${color}`,
        props.className
    ]);

    const renderIcon = () => {
        const shouldOmitIcon = variant === 'rounded' && checked;

        let color: MappedColors = 'text.secondary';

        if (checked) { color = 'primary.main'; }
        if (disabled) { color = 'text.disabled'; }

        return icon && cloneElement<IconProps>(icon, {
            color,
            className: joinClass([
                'ui-tabs__button__icon',
                shouldOmitIcon && 'ui-tabs__button__icon--omit'
            ]),
        });
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={className}
            {...props}
        >
            {renderIcon()}
            {label}
        </button>
    );
}