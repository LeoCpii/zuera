import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Chip from '@/components/Chip';
import Icon from '@/components/Icon';
import { Checkbox } from '@/components/Checkbox';
import ButtonIcon from '@/components/ButtonIcon';
import { Form, Control, FormControl, useForm } from '@/components/Form';

import MultiSelect from './MultiSelect';

import './MultiSelect.scss';

type Weather = { label: string; value: number; icon: string }

type FormValues = {
    weather: Weather[];
    weather2?: Weather[];
};

const meta: Meta<typeof MultiSelect> = {
    title: 'components/Fields/MultiSelect',
    component: MultiSelect,
};

const items: Array<Weather> = [
    { label: 'Sun', value: 10, icon: 'sun' },
    { label: 'Moon', value: 20, icon: 'moon' },
    { label: 'Star', value: 15, icon: 'star' },
];

export const Template: StoryObj<typeof MultiSelect> = {
    render: () => {
        return (
            <MultiSelect
                fullWidth
                label="Teste"
                identifier="label"
                data={items}
                selecteds={[]}
                onChange={console.debug}
                renderOption={(data) => (
                    <Checkbox name={data.label} label={data.label} value={data.label} />
                )}
                renderValue={(data) => (
                    <Chip
                        label={data.label}
                        variant="contained"
                        icon={<Icon name={data.icon} />}
                    />
                )}
            />
        );
    }
};

export const WithIcon: StoryObj<typeof MultiSelect> = {
    render: () => {
        return (
            <MultiSelect
                fullWidth
                label="Teste"
                identifier="label"
                data={items}
                selecteds={[]}
                onChange={console.debug}
                renderOption={(data) => (
                    <Checkbox name={data.label} label={data.label} value={data.label} />
                )}
                renderValue={(data) => (
                    <Chip
                        label={data.label}
                        variant="contained"
                        icon={<Icon name={data.icon} />}
                    />
                )}
                endIcon={
                    <ButtonIcon onClick={console.debug}>
                        <Icon name="times" />
                    </ButtonIcon>
                }
            />
        );
    }
};

export const Validation: StoryObj<typeof MultiSelect> = {
    render: () => {
        return (
            <MultiSelect
                error
                fullWidth
                label="Teste"
                identifier="label"
                helperText="This field is required"
                data={items}
                selecteds={[]}
                onChange={console.debug}
                renderOption={(data) => (
                    <Checkbox name={data.label} label={data.label} value={data.label} />
                )}
                renderValue={(data) => (
                    <Chip
                        label={data.label}
                        variant="contained"
                        icon={<Icon name={data.icon} />}
                    />
                )}
            />
        );
    }
};

export const Controlled: StoryObj<typeof MultiSelect> = {
    render: () => {
        const [formGroup] = useForm<FormValues>({
            form: {
                weather: new FormControl({ defaultValue: [items[1]], required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="weather"
                    type="object"
                    action="onChange"
                    field={(control) => (
                        <MultiSelect
                            label="Weather"
                            identifier="label"
                            fullWidth
                            data={items}
                            selecteds={control.value}
                            error={control.isInvalid}
                            helperText={control.error}
                            required={control.required}
                            renderOption={(data) => (
                                <Checkbox name={data.label} label={data.label} value={data.label} />
                            )}
                            renderValue={(data) => (
                                <Chip
                                    label={data.label}
                                    variant="contained"
                                    icon={<Icon name={data.icon} />}
                                />
                            )}
                        />
                    )}
                />
            </Form>
        );
    }
};

export const MultiControlled: StoryObj<typeof MultiSelect> = {
    render: () => {
        const [formGroup] = useForm<FormValues>({
            form: {
                weather: new FormControl({ defaultValue: [items[1]], required: true }),
                weather2: new FormControl({ defaultValue: [items[0]], required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="weather"
                    type="object"
                    action="onChange"
                    field={(control) => (
                        <MultiSelect
                            fullWidth
                            label="Weather"
                            identifier="label"
                            data={items}
                            selecteds={control.value}
                            error={control.isInvalid}
                            helperText={control.error}
                            required={control.required}
                            renderOption={(data) => (
                                <Checkbox name={data.label} label={data.label} value={data.label} />
                            )}
                            renderValue={(data) => (
                                <Chip
                                    label={data.label}
                                    variant="contained"
                                    icon={<Icon name={data.icon} />}
                                />
                            )}
                        />
                    )}
                />
                <Control
                    controlName="weather2"
                    type="object"
                    action="onChange"
                    field={(control) => (
                        <MultiSelect
                            fullWidth
                            label="Weather 2"
                            identifier="label"
                            data={items}
                            selecteds={control.value}
                            error={control.isInvalid}
                            helperText={control.error}
                            required={control.required}
                            renderOption={(data) => (
                                <Checkbox name={data.label} label={data.label} value={data.label} />
                            )}
                            renderValue={(data) => (
                                <Chip
                                    label={data.label}
                                    variant="contained"
                                    icon={<Icon name={data.icon} />}
                                />
                            )}
                        />
                    )}
                />
            </Form>
        );
    }
};

export const WithOutData: StoryObj<typeof MultiSelect> = {
    render: () => {
        const [data] = useState<Weather[]>([]);

        const [formGroup] = useForm<FormValues>({
            form: {
                weather: new FormControl({ defaultValue: [], required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="weather"
                    type="object"
                    action="onChange"
                    field={(control) => (
                        <MultiSelect
                            fullWidth
                            label="Weather"
                            identifier="label"
                            data={data}
                            selecteds={control.value}
                            error={control.isInvalid}
                            helperText={control.error}
                            required={control.required}
                            renderOption={(data) => (
                                <Checkbox name={data.label} label={data.label} value={data.label} />
                            )}
                            renderValue={(data) => (
                                <Chip
                                    label={data.label}
                                    variant="contained"
                                    icon={<Icon name={data.icon} />}
                                />
                            )}
                        />
                    )}
                />
            </Form>
        );
    }
};

export default meta;