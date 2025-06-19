import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';

import ButtonIcon from './ButtonIcon';
import Stack from '../Stack';

const meta: Meta<typeof ButtonIcon> = {
    title: 'components/ButtonIcon',
    component: ButtonIcon,
};

export const Template: StoryObj<typeof ButtonIcon> = {
    render: () => {
        return (
            <ButtonIcon>
                <Icon name="star" />
            </ButtonIcon>
        );
    }
};
export const Colors: StoryObj<typeof ButtonIcon> = {
    render: () => {
        return (
            <Stack orientation="row">
                <ButtonIcon>
                    <Icon name="star" />
                </ButtonIcon>
                <ButtonIcon color="secondary.main">
                    <Icon name="star" />
                </ButtonIcon>
                <ButtonIcon color="info.main">
                    <Icon name="star" />
                </ButtonIcon>
                <ButtonIcon color="error.main">
                    <Icon name="star" />
                </ButtonIcon>
            </Stack>
        );
    }
};

export default meta;