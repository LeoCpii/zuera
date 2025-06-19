import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Typography from '@/components/Typography';
import Button from '@/components/Button';

import Fade from './Fade';

const meta: Meta<typeof Fade> = {
    title: 'Animations/Fade',
    component: Fade,
};

export const Template: StoryObj<typeof Fade> = {
    render: () => {
        const [show, setShow] = useState(false);

        const handleToggle = () => { setShow(!show); };

        return (
            <>
                <Fade enter={show}>
                    <Typography>Um texto mágico que aparece</Typography>
                </Fade>
                <Button onClick={handleToggle}>TOGGLE</Button>
            </>
        );
    }
};

export const ListTemplate: StoryObj<typeof Fade> = {
    render: () => {
        const [show, setShow] = useState(false);

        const names = ['John', 'Paul', 'George', 'Ringo'];

        const handleToggle = () => { setShow(!show); };

        return (
            <>
                {
                    names.map((name, index) => (
                        <Fade key={index} enter={show} delay={index * 500}>
                            <Typography>{name}</Typography>
                        </Fade>
                    ))
                }
                <Button onClick={handleToggle}>TOGGLE</Button>
            </>
        );
    }
};

export default meta;