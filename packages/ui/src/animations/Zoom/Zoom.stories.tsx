import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';
import Typography from '@/components/Typography';

import Zoom from './Zoom';

const meta: Meta<typeof Zoom> = {
    title: 'Animations/Zoom',
    component: Zoom,
};

export const Template: StoryObj<typeof Zoom> = {
    render: () => {
        const [show, setShow] = useState(false);

        const handleToggle = () => { setShow(!show); };

        return (
            <>
                <Zoom enter={show}>
                    <Typography>Um texto mágico que aparece</Typography>
                </Zoom>
                <Button onClick={handleToggle}>TOGGLE</Button>
            </>
        );
    }
};

export const ListTemplate: StoryObj<typeof Zoom> = {
    render: () => {
        const [show, setShow] = useState(false);

        const names = ['John', 'Paul', 'George', 'Ringo'];

        const handleToggle = () => { setShow(!show); };

        return (
            <>
                {
                    names.map((name, index) => (
                        <Zoom key={index} enter={show} delay={index * 500}>
                            <Typography>{name}</Typography>
                        </Zoom>
                    ))
                }
                <Button onClick={handleToggle}>TOGGLE</Button>
            </>
        );
    }
};

export default meta;