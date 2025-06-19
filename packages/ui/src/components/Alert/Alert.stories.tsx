import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';
import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Alert from './Alert';
import useAlert from './useAlert';
import AlertProvider from './AlertProvider';

const meta: Meta<typeof AlertProvider> = {
    title: 'components/Alert',
    component: AlertProvider,
};

const Child = () => {
    const { addAlert } = useAlert();
    const [count, setCount] = useState(0);

    const handleAddAlert = () => {
        setCount(count + 1);
        addAlert({
            color: 'success',
            message: `${count + 1}`,
            icon: <Icon name="check" />,
            delay: 80000,
        });
    };

    return (
        <Button type="button" onClick={handleAddAlert}>Adicionar alert</Button>
    );
};

export const Colors: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert display="flex" justifyContent="flex-end" sx={{ color: ({ info }) => info.main }}>
                    Uma mensagem aleatória
                </Alert>
                <Alert color="secondary">Uma mensagem aleatória</Alert>
                <Alert color="success">Uma mensagem aleatória</Alert>
                <Alert color="error">Uma mensagem aleatória</Alert>
                <Alert color="warning">Uma mensagem aleatória</Alert>
                <Alert color="info">Uma mensagem aleatória</Alert>
            </Stack>
        );
    }
};

export const Opacity: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert
                    variant="opacity"
                    display="flex"
                    justifyContent="flex-end" sx={{ color: ({ info }) => info.main }}
                >
                    Uma mensagem aleatória
                </Alert>
                <Alert color="secondary" variant="opacity">Uma mensagem aleatória</Alert>
                <Alert color="success" variant="opacity">Uma mensagem aleatória</Alert>
                <Alert color="error" variant="opacity">Uma mensagem aleatória</Alert>
                <Alert color="warning" variant="opacity">Uma mensagem aleatória</Alert>
                <Alert color="info" variant="opacity">Uma mensagem aleatória</Alert>
            </Stack>
        );
    }
};

export const WithClose: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert onClose={() => ''}>Uma mensagem aleatória</Alert>
            </Stack>
        );
    }
};

export const WithIcon: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert
                    color="success"
                    icon={<Icon name="check" />}
                    onClose={() => ''}
                >
                    Uma mensagem aleatória
                </Alert>
                <Alert
                    color="error"
                    icon={<Icon name="check" />}
                    onClose={() => ''}
                >
                    Uma mensagem aleatória
                </Alert>
                <Alert
                    color="warning"
                    icon={<Icon name="check" />}
                    onClose={() => ''}
                >
                    Uma mensagem aleatória
                </Alert>
                <Alert
                    color="info"
                    icon={<Icon name="check" />}
                    onClose={() => ''}
                >
                    Uma mensagem aleatória
                </Alert>
            </Stack>
        );
    }
};

export const Functional: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <AlertProvider>
                <Child />
            </AlertProvider>
        );
    }
};

export default meta;
