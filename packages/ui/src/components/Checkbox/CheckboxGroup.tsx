import { ChangeEvent, Children, cloneElement, ReactElement, useCallback, useEffect, useState } from 'react';

import Stack from '../../components/Stack';
import type { CheckboxProps } from './Checkbox';

type CheckboxData = { id: string; value: any; checked: boolean };

let ID_REFERENCE = 0;

export interface CheckboxGroupProps {
    children: React.ReactNode;
    values?: string[];
    onChange?: (data: CheckboxData[]) => void;
}

export default function CheckboxGroup({ children, values, onChange }: CheckboxGroupProps) {
    const reference = ++ID_REFERENCE;
    const arrayChildren = Children.toArray(children) as ReactElement<CheckboxProps>[];

    const [checkboxes, setCheckboxes] = useState<CheckboxData[]>(arrayChildren.map((item) => ({
        id: item.props.name,
        value: item.props.value,
        checked: values ? values.some((val) => val === item.props.name) : false,
    })));

    const renderBoxes = useCallback(() => {
        return arrayChildren.map((child, index) => {
            const id = child.props.name;

            return cloneElement(child, {
                key: index,
                name: `${child.props.name}-${reference}`,
                isChecked: child.props.isChecked || checkboxes[index].checked,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const newArray = checkboxes.map((item) => {
                        if (item.id === id) { return { ...item, checked: e.target.checked, }; }

                        return item;
                    });

                    if (onChange) { onChange(newArray); }

                    setCheckboxes(newArray);
                },
            });
        });
    }, [values, checkboxes]);

    useEffect(() => {
        setCheckboxes(arrayChildren.map((item) => ({
            id: item.props.name,
            value: item.props.value,
            checked: values ? values.some((val) => val === item.props.name) : false,
        })));
    }, [values]);

    return (
        <Stack spacing="small">
            {renderBoxes()}
        </Stack>
    );
}