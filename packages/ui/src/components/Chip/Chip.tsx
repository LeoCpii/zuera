import { cloneElement, HTMLAttributes, MouseEvent } from 'react';

import { Colors, Size } from '../../theme';
import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass/joinClass';
import type { IconProps } from '../../components/Icon';
import createComponent from '../../core/createComponent';

import './Chip.scss';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    label: string;
    size?: Size;
    color?: Colors | 'default';
    variant?: 'contained' | 'outlined';
    icon?: React.JSX.Element;
    onDelete?: () => void;
};
function Chip({
    label,
    icon,
    size = 'medium',
    color = 'default',
    variant = 'contained',
    onDelete,
    ...props
}: ChipProps) {
    const clss = joinClass([
        'ui-chip',
        `ui-chip--${color}`,
        `ui-chip--${color}--${variant}`,
        `ui-chip--${size}`,
        onDelete && 'ui-chip--deletable',
        props.onClick && 'ui-chip--clickable',
        props.className
    ]);

    const renderIcon = (icon: React.JSX.Element) => {
        return cloneElement<IconProps>(icon, {
            className: joinClass([
                icon.props.className,
                'ui-chip__icon',
                label && 'ui-chip__icon--margin',
            ]),
            size: 'small'
        });
    };

    const handleDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        if (onDelete) { onDelete(); }
    };

    return (
        <div {...props} className={clss} style={{ ...props.style }}>
            {icon && renderIcon(icon)}
            <span>{label}</span>
            {props.onClick && <Ripple />}
            {
                onDelete && (
                    <button className="ui-chip__delete-icon" onClick={handleDelete}>
                        <i className="uil uil-times-circle"></i>
                        <Ripple />
                    </button>
                )
            }
        </div>
    );
}

export default createComponent(Chip);
