import {
    cloneElement,
    HTMLAttributes,
    MouseEvent,
    ReactElement,
    useEffect,
    useMemo,
    useState
} from 'react';

import { uuid } from '@zuera/toolkit/uuid';

import { joinClass } from '../../utils';
import Slide from '../../animations/Slide';
import Typography from '../../components/Typography';
import { Menu, useMenu } from '../../components/Menu';
import { type ButtonIconProps } from '../../components/ButtonIcon';
import { Checkbox, CheckboxGroup, type CheckboxProps } from '../../components/Checkbox';

import './MultiSelect.scss';

let ID_SELECT = 0;

interface MultiSelectProps<K extends Record<string, any>> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    data: K[];
    selecteds: K[];
    identifier: keyof K;

    label?: string;
    error?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    gutterBottom?: boolean;

    endIcon?: React.JSX.Element | boolean;
    startIcon?: React.JSX.Element | boolean;
    emptyMessage?: React.JSX.Element;

    onChange?: (data: K[]) => void;
    renderValue: (data: K) => React.JSX.Element;
    renderOption: (data: K) => React.JSX.Element;
}
export default function MultiSelect<T extends Record<string, any>>({
    data,
    label,
    error,
    required,
    selecteds,
    identifier,
    helperText,
    fullWidth,
    gutterBottom,

    endIcon,
    startIcon,
    emptyMessage = (
        <Typography variant="body2" color="text.secondary" textAlign="center">
            Nenhum elemento encontrado
        </Typography>
    ),

    onChange,
    renderValue,
    renderOption,
    ...props
}: MultiSelectProps<T>) {
    const id = ++ID_SELECT;
    const [open, el, toggle] = useMenu();

    const [_selecteds, setSelecteds] = useState<T[]>(selecteds);

    const areAllCheckeds = useMemo(() => _selecteds.length === data.length, [_selecteds]);

    const className = joinClass([
        'ui-multiselect',
        error && 'ui-multiselect--error',
    ]);

    const containerClss = joinClass([
        'ui-multiselect-container',
        fullWidth && 'ui-multiselect-container--full-width',
        gutterBottom && 'ui-multiselect-container--gutter-bottom',
        props.className
    ]);

    const labelClss = joinClass([
        'ui-multiselect-label',
        error && 'ui-multiselect-label--error',
    ]);

    const helperTextClss = joinClass([
        'ui-multiselect__helper-text',
        error && 'ui-multiselect__helper-text--error',
        helperText && 'ui-multiselect__helper-text--visible',
    ]);

    useEffect(() => { setSelecteds(selecteds); }, [selecteds]);

    const HOCValue = (itemData: T) => {
        return cloneElement(renderValue(itemData), {
            key: uuid(),
        });
    };

    const HOCOption = (itemData: T) => {
        return cloneElement<CheckboxProps>(renderOption(itemData), {
            key: uuid(),
            isChecked: _selecteds.some(s => s[identifier] === itemData[identifier]),
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();

                const shouldAdd = !_selecteds.some(s => s[identifier] === itemData[identifier]);

                const newSelecteds = shouldAdd
                    ? [..._selecteds, itemData]
                    : _selecteds.filter(s => s[identifier] !== itemData[identifier]);

                setSelecteds(newSelecteds);

                if (onChange) { onChange(newSelecteds); }
            }
        });
    };

    const renderIcon = (icon: ReactElement<ButtonIconProps>, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            type: 'button',
            color: 'text.secondary',
            className: joinClass([
                icon.props.className,
                'ui-multiselect__icon',
                `ui-multiselect__icon--margin-${direction}`
            ]),
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();
                if (icon.props.onClick) { icon.props.onClick(e); };
            }
        });
    };

    const handleSelectAll = () => {
        const newData = areAllCheckeds ? [] : data;

        setSelecteds(newData);

        if (onChange) { onChange(newData); }
    };

    return (
        <div className={containerClss} {...props} onInput={() => ''} onBlur={() => ''}>
            {label && <label className={labelClss}>{label} {required && '*'}</label>}
            <div className={className} onClick={(e) => toggle(e as any)}>
                <div className="ui-multiselect__chips">
                    {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
                    {
                        Boolean(_selecteds.length) && (
                            _selecteds.map((v) => (
                                <Slide
                                    enter
                                    direction="top"
                                    key={v[identifier]}
                                >
                                    {HOCValue(v)}
                                </Slide>
                            ))
                        )
                    }
                    {
                        !_selecteds.length && (
                            <Typography noMargin color="text.secondary">
                                Nenhum item selecionado
                            </Typography>
                        )
                    }
                </div>
                {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
            </div>
            <span className={helperTextClss}>{helperText}</span>
            <Menu
                maxHeight={200}
                direction="left"
                open={open}
                anchorEl={el}
                onClose={toggle}
            >
                {
                    data.length > 0 ? (
                        <CheckboxGroup values={_selecteds.map(i => i[identifier])}>
                            <Checkbox
                                value="select_all"
                                name={`select_all_${id}`}
                                label="Selecionar todos"
                                isChecked={areAllCheckeds}
                                onClick={handleSelectAll}
                            />
                            {
                                data
                                    .sort((a, b) => a[identifier].localeCompare(b[identifier]))
                                    .map(d => HOCOption(d))
                            }
                        </CheckboxGroup>
                    ) : (emptyMessage)
                }
            </Menu>
        </div>
    );
}