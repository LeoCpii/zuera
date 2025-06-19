import { Meta, StoryObj } from '@storybook/react';

import Icon from '../Icon';
import Stack from '../Stack';
import Button from './Button';
import LoadingComponent from '../Loading';

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
};

export const Colors: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="info">Info</Button>
                <Button color="error">Error</Button>
            </Stack>
        );
    }
};

export const Variants: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
            </Stack>
        );
    }
};

export const WithIcon: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button startIcon={<Icon name="star" />}>
                    Contained
                </Button>

                <Button endIcon={<Icon name="star" />}>
                    Contained
                </Button>
            </Stack>
        );
    }
};

export const Size: StoryObj<typeof Button> = {
    render: () => {
        return (
            <>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
            </>
        );
    }
};

export const States: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Button disabled startIcon={<Icon name="star" />}>Disabled</Button>
        );
    }
};

export const NoHover: StoryObj<typeof Button> = {
    render: () => {
        return (
            <>
                <Button variant="text" noHover startIcon={<Icon name="star" />}>
                    Disabled
                </Button>
                <Button variant="text" noHover>
                    Disabled
                </Button>
            </>
        );
    }
};

export const Loading: StoryObj<typeof Button> = {
    render: () => {
        return (
            <>
                <Button size="small" loading={<LoadingComponent />}>
                    loading text
                </Button>
                <Button loading={<LoadingComponent />}>
                    loading text
                </Button>
                <Button size="large" loading={<LoadingComponent />}>
                    loading text
                </Button>
            </>
        );
    }
};

export default meta;