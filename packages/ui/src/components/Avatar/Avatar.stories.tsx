import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

import Avatar from './Avatar';
import Icon from '../Icon';

const meta: Meta<typeof Avatar> = {
    title: 'components/Avatar',
    component: Avatar,
};

export const Variants: StoryObj<typeof Avatar> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Avatar
                    src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Sarah"
                />
                <Avatar name="Saul Goodman" />
                <Avatar />
                <Avatar icon={<Icon name="anchor" />} />
            </Stack>
        );
    }
};

export const CustomColor: StoryObj<typeof Avatar> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Avatar
                    sx={{
                        backgroundColor: ({ warning }) => warning.main,
                    }}
                />
            </Stack>
        );
    }
};

export const clickable: StoryObj<typeof Avatar> = {
    render: () => {
        const [count, setCount] = useState(0);

        const handleClick = () => { setCount(prev => prev + 1); };

        return (
            <Stack orientation="row">
                <Avatar onClick={handleClick} />
                <Typography>{count}</Typography>
            </Stack>
        );
    }
};

export default meta;