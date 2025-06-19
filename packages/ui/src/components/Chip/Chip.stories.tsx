import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';
import Stack from '@/components/Stack';
import Divider from '@/components/Divider';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
    title: 'components/Chip',
    component: Chip,
};

export const template: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack orientation="row" spacing="small">
                <Chip label="contained" variant="contained" />
                <Chip label="outlined" variant="outlined" />
            </Stack>
        );
    }
};

export const colors: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack spacing="small">
                <Stack orientation="row" spacing="small">
                    <Chip label="primary" color="primary" variant="contained" />
                    <Chip label="secondary" color="secondary" variant="contained" />
                    <Chip label="success" color="success" variant="contained" />
                    <Chip label="error" color="error" variant="contained" />
                    <Chip label="warning" color="warning" variant="contained" />
                    <Chip label="info" color="info" variant="contained" />
                </Stack>
                <Divider />
                <Stack orientation="row" spacing="small">
                    <Chip label="primary" color="primary" variant="outlined" />
                    <Chip label="secondary" color="secondary" variant="outlined" />
                    <Chip label="success" color="success" variant="outlined" />
                    <Chip label="error" color="error" variant="outlined" />
                    <Chip label="warning" color="warning" variant="outlined" />
                    <Chip label="info" color="info" variant="outlined" />
                </Stack>
            </Stack>
        );
    }
};

export const WithIcon: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack spacing="small">
                <Stack orientation="row" spacing="small">
                    <Chip icon={<Icon name="user" />} label="primary" color="primary" variant="contained" />
                    <Chip icon={<Icon name="user" />} label="secondary" color="secondary" variant="contained" />
                    <Chip icon={<Icon name="user" />} label="success" color="success" variant="contained" />
                    <Chip icon={<Icon name="user" />} label="error" color="error" variant="contained" />
                    <Chip icon={<Icon name="user" />} label="warning" color="warning" variant="contained" />
                    <Chip icon={<Icon name="user" />} label="info" color="info" variant="contained" />
                </Stack>
                <Divider />
                <Stack orientation="row" spacing="small">
                    <Chip icon={<Icon name="user" />} label="primary" color="primary" variant="outlined" />
                    <Chip icon={<Icon name="user" />} label="secondary" color="secondary" variant="outlined" />
                    <Chip icon={<Icon name="user" />} label="success" color="success" variant="outlined" />
                    <Chip icon={<Icon name="user" />} label="error" color="error" variant="outlined" />
                    <Chip icon={<Icon name="user" />} label="warning" color="warning" variant="outlined" />
                    <Chip icon={<Icon name="user" />} label="info" color="info" variant="outlined" />
                </Stack>
            </Stack>
        );
    }
};

export const Size: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack orientation="row" spacing="small">
                <Chip label="small" variant="contained" size="small" />
                <Chip label="medium" variant="contained" />
                <Chip label="large" variant="contained" size="large" />
            </Stack>
        );
    }
};

export const clickabel: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack orientation="row" spacing="small">
                <Chip onClick={() => ''} label="contained" variant="contained" />
            </Stack>
        );
    }
};

export const WithClose: StoryObj<typeof Chip> = {
    render: () => {
        const handleLog = () => console.debug('close');
        return (
            <Stack orientation="row" spacing="small">
                <Stack orientation="row" spacing="small">
                    <Chip onDelete={handleLog} label="primary" color="primary" variant="contained" />
                    <Chip onDelete={handleLog} label="secondary" color="secondary" variant="contained" />
                    <Chip onDelete={handleLog} label="success" color="success" variant="contained" />
                    <Chip onDelete={handleLog} label="error" color="error" variant="contained" />
                    <Chip onDelete={handleLog} label="warning" color="warning" variant="contained" />
                    <Chip onDelete={handleLog} label="info" color="info" variant="contained" />
                </Stack>
                <Divider />
                <Stack orientation="row" spacing="small">
                    <Chip onDelete={handleLog} label="primary" color="primary" variant="outlined" />
                    <Chip onDelete={handleLog} label="secondary" color="secondary" variant="outlined" />
                    <Chip onDelete={handleLog} label="success" color="success" variant="outlined" />
                    <Chip onDelete={handleLog} label="error" color="error" variant="outlined" />
                    <Chip onDelete={handleLog} label="warning" color="warning" variant="outlined" />
                    <Chip onDelete={handleLog} label="info" color="info" variant="outlined" />
                </Stack>
            </Stack>
        );
    }
};

export default meta;