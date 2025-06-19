import { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta: Meta<typeof Divider> = {
    title: 'components/Divider',
    component: Divider,
};

export const size: StoryObj<typeof Divider> = {
    render: () => {
        return (
            <Divider />
        );
    }
};

export default meta;