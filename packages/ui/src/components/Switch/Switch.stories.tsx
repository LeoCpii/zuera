import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import { Form, Control, FormControl, useForm } from '@/components/Form';

import Switch from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'components/Fields/Switch',
    component: Switch,
};

export const Colors: StoryObj<typeof Switch> = {
    render: () => {
        return (
            <Stack>
                <Switch color="primary" checked />
                <Switch color="secondary" checked />
                <Switch color="error" checked />
                <Switch color="info" checked />
                <Switch color="success" checked />
                <Switch color="warning" checked />
            </Stack>
        );
    }
};

export const Label: StoryObj<typeof Switch> = {
    render: () => {
        return (
            <Stack>
                <Switch color="primary" label="Some label here" />
            </Stack>
        );
    }
};

export const Validation: StoryObj<typeof Switch> = {
    render: () => {
        return (
            <Stack>
                <Switch color="primary" label="Some label here" error helperText="helper text here" />
            </Stack>
        );
    }
};

export const Controlled: StoryObj<typeof Switch> = {
    render: () => {
        const [formGroup] = useForm({
            form: {
                switch: new FormControl({ defaultValue: false, required: true }),
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    type="checkbox"
                    action="onChange"
                    controlName="switch"
                    field={(control) => (
                        <Switch
                            color="primary"
                            label="Some label here"
                            checked={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />)
                    }
                />
            </Form>
        );
    }
};

export default meta;