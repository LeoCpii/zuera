import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import useKey from './useKey';

const meta: Meta<typeof useKey> = {
    title: 'hooks/useKey'
};

export const Template: StoryObj<typeof useKey> = {
    render: () => {
        const [count, setCount] = useState(0);
        useKey({
            ArrowUp: () => {
                setCount(count + 1);
                console.info('Up', count + 1);
            },
            ArrowDown: () => {
                setCount(count - 1);
                console.info('Down', count - 1);
            },
            Enter: () => {
                console.info('Enter', count);
            }
        }, [count]);

        const add = () => { setCount(count + 1); };
        const remove = () => { setCount(count - 1); };

        return (
            <div>
                <button onClick={add}>ADD</button>
                <button onClick={remove}>REMOVE</button>
                <p>{count}</p>
            </div>
        );
    }
};

export default meta;