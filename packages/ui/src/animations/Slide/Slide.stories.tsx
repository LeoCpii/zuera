import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';
import type { Direction } from '@/animations';
import Typography from '@/components/Typography';

import Slide from './Slide';

const meta: Meta<typeof Slide> = {
    title: 'Animations/Slide',
    component: Slide,
    argTypes: {
        direction: {
            name: 'direction',
            control: {
                type: 'radio',
                options: ['top', 'right', 'bottom', 'left'],
            },
            defaultValue: 'right',
            description: 'Direction of the animation.',
        },
    }
};

const SlideAnimation = ({ direction }: { direction: Direction }) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => { setShow(!show); };

    return (
        <>
            <Slide enter={show} direction={direction}>
                <Typography>Um texto mágico que aparece</Typography>
            </Slide>
            <Button onClick={handleToggle}>TOGGLE</Button>
        </>
    );
};

export const Right: StoryObj<typeof Slide> = {
    render: () => {
        return (
            <SlideAnimation direction="right" />
        );
    }
};

export const Left: StoryObj<typeof Slide> = {
    render: () => {
        return (
            <SlideAnimation direction="left" />
        );
    }
};

export const Top: StoryObj<typeof Slide> = {
    render: () => {
        return (
            <SlideAnimation direction="top" />
        );
    }
};

export const Bottom: StoryObj<typeof Slide> = {
    render: () => {
        return (
            <SlideAnimation direction="bottom" />
        );
    }
};

export const List: StoryObj<typeof Slide> = {
    render: () => {
        const [show, setShow] = useState(false);

        const names = ['John', 'Paul', 'George', 'Ringo'];

        const handleToggle = () => { setShow(!show); };

        return (
            <>
                {
                    names.map((name, index) => (
                        <Slide key={index} enter={show} delay={index * 500}>
                            <Typography>{name}</Typography>
                        </Slide>
                    ))
                }
                <Button onClick={handleToggle}>TOGGLE</Button>
            </>
        );
    }
};

export default meta;