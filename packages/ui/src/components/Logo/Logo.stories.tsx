import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';

import Logo from './Logo';

const meta: Meta<typeof Logo> = {
    title: 'components/Logo',
    component: Logo,
};

export const size: StoryObj<typeof Logo> = {
    render: () => {
        return (
            <Stack>
                <Logo width={100} />
                <Logo width={200} />
                <Logo width={300} />
            </Stack>
        );
    }
};

export const colors: StoryObj<typeof Logo> = {
    render: () => {
        return (
            <Stack>
                <Logo color="primary.main" />
                <Logo color="secondary.main" />
                <Logo color="success.main" />
                <Logo color="warning.main" />
                <Logo color="error.main" />
                <Logo color="info.main" />
            </Stack>
        );
    }
};

export default meta;