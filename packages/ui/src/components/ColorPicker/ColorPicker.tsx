import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';

import { uuid } from '@zuera/toolkit/uuid';

import COLORS from './colors';
import { joinClass } from '../../utils';
import Icon from '../../components/Icon';
import Stack from '../../components/Stack';
import { Menu, useMenu } from '../../components/Menu';
import { getContrastColor, useTheme } from '../../theme';

import './ColorPicker.scss';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    gutterBottom?: boolean;
    fitContent?: boolean;
}
export default function ColorPicker({
    label,
    error,
    fullWidth,
    helperText,
    gutterBottom,
    fitContent,
    value = COLORS[0],
    ...props
}: ColorPickerProps) {
    const { theme: { palette } } = useTheme();
    const [color, setColor] = useState<string>(value as string);

    const [open, el, toggle] = useMenu();

    const id = useMemo(() => uuid(), []);

    const labelClss = joinClass([
        'ui-color-picker__label',
        error && 'ui-color-picker__label--error',
    ]);

    const containerClassName = joinClass([
        'ui-color-picker-container',
        error && 'ui-color-picker-container--error',
        fullWidth && 'ui-color-picker-container--full-width',
        gutterBottom && 'ui-color-picker-container--gutter-bottom',
    ]);

    const colorPickerClassName = joinClass([
        'ui-color-picker',
        error && 'ui-color-picker--error',
    ]);

    const valueClassName = joinClass([
        'ui-color-picker__value',
        error && 'ui-color-picker__value--error',
    ]);

    const helperTextClss = joinClass([
        'ui-color-picker__helper-text',
        helperText && 'ui-color-picker__helper-text--visible',
        error && 'ui-color-picker__helper-text--error',
    ]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange({ target: { value: color } } as React.ChangeEvent<HTMLInputElement>);
        }
        if (props.onInput) {
            props.onInput({ target: { value: color } } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [color]);

    useEffect(() => { setColor(value as string); }, [value]);

    const iconClassName = (c: string) => joinClass([
        'ui-color-picker__color__icon',
        color === c && 'ui-color-picker__color__icon--visible',
    ]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) { props.onChange(e); }
        if (props.onInput) { props.onInput(e); }

        const { value } = e.target;

        setColor(value);
    };

    return (
        <div className={containerClassName}>
            {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
            <button type="button" onClick={toggle} className={colorPickerClassName}>
                <div className="ui-color-picker__preview">
                    <div style={{ backgroundColor: color }} />
                </div>
                <div className={valueClassName}>
                    {color}
                </div>
            </button>
            <span className={helperTextClss}>{helperText}</span>
            <Menu
                direction="left"
                open={open}
                anchorEl={el}
                width={fitContent ? 'fit-content' : ''}
                onClose={toggle}
            >
                <Stack
                    spacing="small"
                    orientation="row"
                    justifyContent="center"
                    sx={{ my: 2 }}
                    style={{ flexWrap: 'wrap' }}
                >
                    {
                        COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className="ui-color-picker__color"
                                onClick={() => setColor(c)}
                                style={{ backgroundColor: c }}
                            >
                                <Icon
                                    name="check"
                                    className={iconClassName(c)}
                                    style={{ color: getContrastColor(color) }}
                                />
                            </button>
                        ))
                    }
                    <label
                        htmlFor={`color-picker-${id}`}
                        className="ui-color-picker__color"
                        style={{ backgroundColor: palette.grey.main }}
                    >
                        <Icon
                            name="plus"
                            className={iconClassName(color)}
                            style={{ color: getContrastColor(palette.grey.main) }}
                        />
                        <input
                            type="color"
                            id={`color-picker-${id}`}
                            value={color}
                            onChange={handleColorChange}
                            onInput={handleColorChange}
                        />
                    </label>
                </Stack>
            </Menu>
        </div>
    );
}