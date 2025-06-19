import { Meta, StoryObj } from '@storybook/react';

import Stack from './Stack';

const meta: Meta<typeof Stack> = {
    title: 'components/Stack',
    component: Stack,
};

export const OrientationRow: StoryObj<typeof Stack> = {
    render: () => {
        return (
            <>
                <Stack orientation="row">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </Stack>
            </>
        );
    }
};

export const OrientationColumn: StoryObj<typeof Stack> = {
    render: () => {
        return (
            <>
                <Stack orientation="column">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </Stack>
            </>
        );
    }
};

export default meta;