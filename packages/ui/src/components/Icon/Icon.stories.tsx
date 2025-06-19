import { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'components/Icon',
    component: Icon,
};

const icon = 'rocket';

export const docs: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <a href="https://iconscout.com/unicons/free-line-icons">Documentação</a>
        );
    }
};

export const size: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon name={icon} size="small" />
                <Icon name={icon} />
                <Icon name={icon} size="large" />
            </>
        );
    }
};

export const colors: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon name={icon} color="primary.main" />
                <Icon name={icon} color="secondary.main" />
                <Icon name={icon} color="success.main" />
                <Icon name={icon} color="warning.main" />
                <Icon name={icon} color="error.main" />
                <Icon name={icon} color="info.main" />
            </>
        );
    }
};

export default meta;