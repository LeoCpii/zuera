import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Form, Control, FormControl, useForm } from '@/components/Form';

import Select from './Select';
import Option from './Option';
import Icon from '../Icon';

const meta: Meta<typeof Select> = {
    title: 'components/Fields/Select',
    component: Select,
};

export const size: StoryObj<typeof Select> = {
    render: () => {
        const [selected, setSelected] = useState<string>('2');

        return (
            <Select
                placeholder="Selecione um valor"
                value={selected}
                startIcon={
                    <Icon name="star" />
                }
                onChange={(e) => setSelected(e.target.value)}
            >
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
            </Select>
        );
    }
};

export const Controlled: StoryObj<typeof Select> = {
    render: () => {
        const [formGroup] = useForm<{ foods: string; }>({
            form: {
                foods: new FormControl({ defaultValue: 'pizza', required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup}>
                <Control controlName="foods"
                    field={(control) => (
                        <Select placeholder="Selecione um valor" value={control.value}>
                            <Option value="pizza">Pizza</Option>
                            <Option value="hamburguer">Hamburguer</Option>
                            <Option value="hotdog">Hotdog</Option>
                        </Select>
                    )} />
            </Form>
        );
    }
};

export default meta;