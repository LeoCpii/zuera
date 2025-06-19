import { Meta, StoryObj } from '@storybook/react';

import Box from '@/components/Box';

import ColorPicker from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
    title: 'components/Fields/ColorPicker',
    component: ColorPicker,
};

export const Template: StoryObj<typeof ColorPicker> = {
    render: () => {
        return (
            <Box sx={{ mt: 4, ml: 4 }} style={{ width: 200 }}>
                <ColorPicker fitContent />
            </Box>
        );
    }
};

export const WithLabel: StoryObj<typeof ColorPicker> = {
    render: () => {
        return (
            <Box sx={{ mt: 4, ml: 4 }} style={{ width: 200 }}>
                <ColorPicker label="Label" />
            </Box>
        );
    }
};

export const Error: StoryObj<typeof ColorPicker> = {
    render: () => {
        return (
            <Box sx={{ mt: 4, ml: 4 }} style={{ width: 200 }}>
                <ColorPicker error helperText="some helper text" />
            </Box>
        );
    }
};

export default meta;