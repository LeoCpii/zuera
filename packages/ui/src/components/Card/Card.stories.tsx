import { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import CardContent from './CardContent';

const meta: Meta<typeof Card> = {
    title: 'components/Card',
    component: Card,
};

export const WithOutContent: StoryObj<typeof Card> = {
    render: () => {
        return (
            <Card>
                <span>Aloooooha</span>
            </Card>
        );
    }
};

export const WithContent: StoryObj<typeof Card> = {
    render: () => {
        return (
            <Card>
                <CardContent>
                    <span>Aloooooha</span>
                </CardContent>
            </Card>
        );
    }
};

export default meta;