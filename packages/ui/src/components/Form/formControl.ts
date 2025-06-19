import validators from '@zuera/toolkit/validators';
import { maskCpf, maskCurrency, maskPhone } from '@zuera/toolkit/mask';

export const MESSAGES = {
    email: () => 'O campo deve ser um email válido',
    tel: () => 'O campo telefone deve ter no mínimo 14 caracteres',
    cpf: () => 'O campo deve ser um CPF válido',
    money: () => 'O campo deve ser um número válido',
    required: (field?: string) => field ? `Por favor, nos informe seu ${field}` : 'Este é um campo obrigatório'
};

type KeyMessage = keyof typeof MESSAGES;
type Type = 'text' | 'email' | 'password' | 'tel' | 'cpf' | 'money';

export interface Control<C> {
    defaultValue: C;
    value?: C;
    type?: Type;
    name?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
}

export default class FormControl<C> {
    protected _value!: C;
    protected defaultValue!: C;

    public error = '';
    public type = 'text';
    public name!: string;
    public dirty = false;
    public required!: boolean;
    public disabled!: boolean;

    constructor(control: Control<C>) {
        this.defaultValue = control.defaultValue;
        this.value = control.value || control.defaultValue;
        this.disabled = Boolean(control.disabled);
        this.required = Boolean(control.required);

        if (control.type) { this.type = control.type; }
        if (control.name) { this.name = control.name; }

        this.validate();
    }

    public get value(): C { return this._value; }
    public set value(value: C) {
        this._value = value;
        this.validate();
    }

    public get masked() {
        const mask = {
            tel: maskPhone,
            cpf: maskCpf,
            money: maskCurrency
        };

        if (mask[this.type]) { return mask[this.type](this.value); }

        return this.value;
    }

    public get isInvalid() { return Boolean(this.dirty && this.error); }

    public get messageError() { return this.isInvalid ? this.error : ''; }

    public reset() {
        this.value = this.defaultValue;
        this.dirty = false;
    }

    public validate(): void {
        const data: any = {};

        data.required = this.required && validators.isEmpty(this.value);

        if (this.value) {
            data.email = this.type === 'email' && !validators.isValidEmail(this.value as string);
            data.tel = this.type === 'tel' && !validators.isValidTelCel(this.value as string);
            data.cpf = this.type === 'cpf' && !validators.isValidCpf(this.value as string);
            data.money = this.type === 'money' && !validators.isValidNumber(this.value as string);
        }

        const hasError = Object.keys(data).some(key => data[key]);

        if (hasError) {
            const att = Object.keys(data).find(key => data[key]) as KeyMessage;
            this.error = MESSAGES[att](this.name);
        } else {
            this.error = '';
        }
    }
}
