import { Meta, StoryObj } from '@storybook/react';

import { Form, useForm, Control, FormControl } from '@/components/Form';

import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

const meta: Meta<typeof Checkbox> = {
    title: 'components/Fields/Checkbox',
    component: Checkbox,
};

export const Default: StoryObj<typeof Checkbox> = {
    render: () => {
        return (
            <CheckboxGroup onChange={console.debug}>
                <Checkbox name="A" label="some label here 1" value={10} />
                <Checkbox name="B" label="some label here 2" value={20} />
                <Checkbox name="C" label="some label here 3" value={30} />
            </CheckboxGroup>
        );
    }
};

type FormValues = {
    group: string[];
}

export const Controlled: StoryObj<typeof Checkbox> = {
    render: () => {
        const [formGroup] = useForm<FormValues>({
            form: {
                group: new FormControl({ defaultValue: ['B'], required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="group"
                    action="onChange"
                    type="object"
                    field={(control) => (
                        <CheckboxGroup values={control.value}>
                            <Checkbox name="A" label="some label here 1" value={10} />
                            <Checkbox name="B" label="some label here 2" value={20} />
                            <Checkbox name="C" label="some label here 3" value={30} />
                        </CheckboxGroup>
                    )}
                />
            </Form>
        );
    }
};

export default meta;