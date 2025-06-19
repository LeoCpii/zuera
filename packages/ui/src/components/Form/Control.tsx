import React, { useContext, ReactElement, cloneElement, InputHTMLAttributes } from 'react';

import useControl from './useControl';
import FormContext from './FormContext';
import FormControl from './formControl';

interface ControlProps<
    Form, Key extends keyof Form = keyof Form
> extends InputHTMLAttributes<InputHTMLAttributes<any>> {
    controlName: Key;
    action?: 'onChange' | 'onInput' | 'onBlur';
    type?: 'text' | 'checkbox' | 'radio' | 'number' | 'object';
    field: (control: FormControl<any>) => React.JSX.Element;
}
export default function Control<Form>({
    field,
    controlName,
    type = 'text',
    action = 'onInput',
}: ControlProps<Form>) {
    const { formGroup } = useContext(FormContext);
    const { control, update } = useControl<Form, any>(controlName);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        const getValue = (e: any) => {
            if (['radio', 'checkbox'].includes(type)) { return e.target['checked']; }

            if (['object'].includes(type)) { return e; }

            return e.target['value'];
        };

        return cloneElement(child, {
            required: control.required,
            onBlur: (e: any) => {
                control.dirty = true;

                if (action === 'onBlur') { update(getValue(e)); };

                if (child.props.onBlur) { child.props.onBlur(e); }
            },
            onInput: (e: any) => {
                update(getValue(e));

                if (action === 'onInput') { control.dirty = true; };

                if (child.props.onInput) { child.props.onInput(e); }
            },
            onChange: (e: any) => {
                update(getValue(e));

                if (action === 'onChange') { control.dirty = true; };

                if (child.props.onChange) { child.props.onChange(e); }
            }
        });
    };

    return (
        renderChildren(field(formGroup.controls[controlName]))
    );
}

