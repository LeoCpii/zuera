import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';

import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'components/Skeleton',
    component: Skeleton,
};

export const size: StoryObj<typeof Skeleton> = {
    render: () => {
        return (
            <Stack>
                <Skeleton variant="rounded" width={100} height={100} />
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton variant="rectangular" width={100} height={100} />
            </Stack>
        );
    }
};

export default meta;