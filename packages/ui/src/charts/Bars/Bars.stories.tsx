import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { getRandom } from '@zuera/toolkit/array';

import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Bars from './Bars';
import type { ChartData } from '../interface';

const meta: Meta<typeof Bars> = {
    title: 'Charts/Bars',
    component: Bars,
};

const VALUES = [900, 100, 300, 500];

const DATA: ChartData[] = [
    { label: 'label a', value: VALUES[0] },
    { label: 'label b', value: VALUES[3] },
    { label: 'label c', value: VALUES[2] },
    { label: 'label d', value: VALUES[1] },
];

export const Template: StoryObj<typeof Bars> = {
    render: () => {
        const [data, setData] = useState(DATA);

        const randomize = () => {
            setData(data.map(d => ({ ...d, value: getRandom(VALUES) })));
        };

        return (
            <Stack>
                <Button onClick={randomize}>Random</Button>
                <Bars
                    data={data}
                    renderLabel={(data) => String(data.value)}
                />
            </Stack>
        );
    }
};

export default meta;