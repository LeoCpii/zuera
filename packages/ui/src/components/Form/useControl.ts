import { useContext } from 'react';

import FormContext from './FormContext';
import debounce from '../../utils/debounce/debounce';
import { AbstractControl } from './formGroup';

function sanitizeOnlyNumbers(value: string) {
    const regex = /[\D]/g;
    return value.replace(regex, '');
}

type Options = {
    delay: number;
    shouldGetDirty: boolean;
}

export default function useControl<T, K extends keyof T>(
    controlName: K,
    options: Partial<Options> = { delay: 0, shouldGetDirty: true }
) {
    const { delay, shouldGetDirty } = options;

    const { formGroup } = useContext(FormContext);
    const control = formGroup.controls[controlName] as AbstractControl<T>[K];

    const update = (value: any) => {
        const shouldSanitize = ['tel', 'cpf', 'money'].includes(control.type);
        const sanitezeMap = {
            tel: sanitizeOnlyNumbers,
            cpf: sanitizeOnlyNumbers,
            money: sanitizeOnlyNumbers,
        };

        debounce.delay(() => {
            if (shouldGetDirty) { control.dirty = true; }

            control.value = value;

            formGroup.update({
                [controlName]: shouldSanitize
                    ? sanitezeMap[control.type](value)
                    : value
            });
        }, delay);
    };

    return { control, update };
}
