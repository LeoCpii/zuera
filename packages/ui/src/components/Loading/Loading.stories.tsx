import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';

import Loading from './Loading';

const meta: Meta<typeof Loading> = {
    title: 'components/Loading',
    component: Loading,
};

export const Colors: StoryObj<typeof Loading> = {
    render: () => {
        return (
            <Stack orientation="row" alignItems="baseline">
                <Loading color="primary.main" />
                <Loading color="secondary.main" />
                <Loading color="error.main" />
                <Loading color="warning.main" />
                <Loading color="text" />
            </Stack>
        );
    }
};

export const Sizes: StoryObj<typeof Loading> = {
    render: () => {
        return (
            <Stack orientation="row" alignItems="baseline">
                <Loading size="1rem" />
                <Loading size="2rem" />
                <Loading size="3rem" />
                <Loading size="4rem" />
            </Stack>
        );
    }
};

export default meta;