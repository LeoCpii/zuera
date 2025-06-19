import { InputHTMLAttributes, ReactElement, cloneElement, MouseEvent } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';
import type { ButtonIconProps } from '../../components/ButtonIcon';

import './Input.scss';

export type InputType = 'text' | 'password' | 'number' | 'date' | 'month' | 'tel';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    gutterBottom?: boolean;
    type?: InputType;
    endIcon?: React.JSX.Element | boolean;
    startIcon?: React.JSX.Element | boolean;
}
function Input({
    error,
    label,
    fullWidth,
    helperText,
    gutterBottom,
    endIcon,
    startIcon,
    type = 'text',
    disabled,
    ...props
}: InputProps) {
    const containerClss = joinClass([
        'ui-input-container',
        fullWidth && 'ui-input-container--full-width',
        gutterBottom && 'ui-input-container--gutter-bottom'
    ]);

    const labelClss = joinClass([
        'ui-input-label',
        error && 'ui-input-label--error',
    ]);

    const clss = joinClass([
        'ui-input',
        disabled && 'ui-input--disabled',
        error && 'ui-input--error',
        props.className
    ]);

    const helperTextClss = joinClass([
        'ui-input__helper-text',
        helperText && 'ui-input__helper-text--visible',
        error && 'ui-input__helper-text--error'
    ]);

    const renderIcon = (icon: ReactElement<ButtonIconProps>, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            disabled,
            type: 'button',
            color: 'text.secondary',
            className: joinClass([icon.props.className, 'ui-input__icon', `ui-input__icon--margin-${direction}`]),
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();
                if (icon.props.onClick) { icon.props.onClick(e); };
            }
        });
    };

    return (
        <div className={containerClss}>
            {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
            <div className={clss}>
                {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
                <input {...props} type={type} disabled={disabled} />
                {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
            </div>
            <span className={helperTextClss}>{helperText}</span>
        </div>
    );
}

export default createComponent(Input);