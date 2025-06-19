import { joinClass } from '../../utils';
import type { Colors } from '../../theme';

import './Checkbox.scss';

export interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'id'> {
    name: string;
    label: string;
    helperText?: string;
    error?: boolean;
    color?: Colors;
    isChecked?: boolean;
}
export default function Checkbox({
    label,
    name,
    color = 'primary',
    isChecked,
    error,
    helperText,
    ...props
}: CheckboxProps) {
    const className = joinClass([
        'ui-checkbox',
        `ui-checkbox--${color}`,
        isChecked && `ui-checkbox--${color}--checked`,
    ]);

    const helperTextClss = joinClass([
        'ui-checkbox__helper-text',
        helperText && 'ui-checkbox__helper-text--visible',
        error && 'ui-checkbox__helper-text--error'
    ]);

    return (
        <div className="ui-checkbox-container">
            <label htmlFor={name} className={className}>
                <input type="checkbox" {...props} id={name} name={name} checked={isChecked} />
                {label}
            </label>
            {
                helperText && <span className={helperTextClss}>{helperText}</span>
            }
        </div>
    );
}