import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import useResize from './useResize';

const meta: Meta<typeof useResize> = {
    title: 'hooks/useResize'
};

export const Template: StoryObj<typeof useResize> = {
    render: () => {
        const [screen, setScreen] = useState('');
        const [count, setCount] = useState(0);

        useResize({
            onXs: () => { makeIt('xs'); },
            onSm: () => { makeIt('sm'); },
            onMd: () => { makeIt('md'); },
            onLg: () => { makeIt('lg'); },
            onXl: () => { makeIt('xl'); },
        }, [count]);

        const makeIt = (s: string) => {
            setScreen(s);
            setCount(count + 1);
        };

        return (
            <div>
                <h1>{screen}</h1>
            </div>
        );
    }
};

export default meta;
