import { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
    title: 'components/Carousel',
    component: Carousel,
};

export const WithOutContent: StoryObj<typeof Carousel> = {
    render: () => {
        return (
            <Carousel>
                <span>Aloooooha</span>
            </Carousel>
        );
    }
};

export default meta;