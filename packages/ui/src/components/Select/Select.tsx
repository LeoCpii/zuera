import {
    InputHTMLAttributes,
    ButtonHTMLAttributes,
    ReactElement,
    cloneElement,
    MouseEvent,
    Children,
    useMemo,
} from 'react';

import Icon from '../../components/Icon';
import type { OptionProps } from './Option';
import joinClass from '../../utils/joinClass/joinClass';
import { Menu, useMenu } from '../../components/Menu';
import createComponent from '../../core/createComponent';

import '../Input/Input.scss';
import './Select.scss';

export type InputType = 'text' | 'password' | 'number' | 'date';
export type ErrorState = 'show' | 'hide';

interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    fullWidth?: boolean;
    autoClose?: boolean;
    label?: string;
    helperText?: string;
    gutterBottom?: boolean;
    startIcon?: React.JSX.Element | boolean;
    children: React.JSX.Element | React.JSX.Element[];
}
function Select({
    error,
    label,
    autoClose,
    fullWidth,
    helperText,
    gutterBottom,
    startIcon,
    children,
    disabled,
    onChange,
    ...props
}: SelectProps) {
    const arrayChildren = Children.toArray(children) as ReactElement<OptionProps>[];

    const newValue = useMemo(() => {
        return arrayChildren.find((child) =>
            child.props.value === props.value)?.props.children || '';
    }, [props.value]);

    const [open, el, toggle] = useMenu();

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
        'ui-select',
        disabled && 'ui-select--disabled',
        error && 'ui-input--error',
        props.className
    ]);

    const helperTextClss = joinClass([
        'ui-input__helper-text',
        helperText && 'ui-input__helper-text--visible',
        error && 'ui-input__helper-text--error'
    ]);

    const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>) => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'ui-input__icon', 'ui-input__icon--padding-right']),
            type: 'button',
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();
                if (icon.props.onClick && !disabled) { icon.props.onClick(e); };
            }
        });
    };

    const renderOption = () => {
        return arrayChildren.map((child) => {
            return cloneElement(child, {
                onClick: (e) => {
                    if (autoClose) { toggle(); }

                    if (onChange) { onChange(e as any); }
                }
            });
        });
    };

    return (
        <div className={containerClss}>
            {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
            <button type="button" className={clss} onClick={toggle} disabled={disabled}>
                <div>
                    {startIcon && renderIcon(startIcon as React.JSX.Element)}
                </div>
                <input {...props} readOnly type="text" value={newValue} disabled={disabled} />
                <Icon
                    name="angle-down"
                    color="text.secondary"
                    className="ui-input__icon ui-input__icon--margin-left"
                />
            </button>
            <Menu
                direction="center"
                open={open}
                anchorEl={el}
                onClose={toggle}
            >
                {renderOption()}
            </Menu>
            <span className={helperTextClss}>{helperText}</span>
        </div>
    );
};

export default createComponent(Select);