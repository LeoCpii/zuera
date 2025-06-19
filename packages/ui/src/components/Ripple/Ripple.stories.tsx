import { Meta, StoryObj } from '@storybook/react';

import { useTheme } from '@/theme';

import Ripple from './Ripple';

const meta: Meta<typeof Ripple> = {
    title: 'components/Ripple',
    component: Ripple,
};

export const SameGrid: StoryObj<typeof Ripple> = {
    render: () => {
        const { theme } = useTheme();

        return (
            <div style={{
                width: 100,
                height: 100,
                background: theme.palette.primary.main,
                transition: 'all 0.3s',
                position: 'relative',
                cursor: 'pointer',
            }}>
                <Ripple />
            </div>
        );
    }
};

export default meta;