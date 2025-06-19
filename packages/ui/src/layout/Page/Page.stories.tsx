import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';
import Button from '@/components/Button';

import Page from './Page';

const meta: Meta<typeof Page> = {
    title: 'layout/Page',
    component: Page,
};

export const Default: StoryObj<typeof Page> = {
    render: () => {
        return (
            <Page
                title="Title"
                subtitle="Subtitle"
                release="1.0.0"
                action={
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<Icon name="plus" />}
                        onClick={() => console.debug('foo bar')}
                    >
                        Action
                    </Button>
                }
                backAction={
                    <Button
                        noHover
                        size="small"
                        variant="text"
                        sx={{ p: 0 }}
                        startIcon={<Icon name="arrow-left" color="text.secondary" />}
                        onClick={() => console.debug('go back')}
                    >
                        Voltar
                    </Button>
                }
            >
                content
            </Page>
        );
    }
};

export const Loading: StoryObj<typeof Page> = {
    render: () => {
        return (
            <Page
                loading
                title="Title"
                subtitle="Subtitle"
                release="1.0.0"
                action={
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<Icon name="plus" />}
                        onClick={() => console.debug('foo bar')}
                    >
                        Action
                    </Button>
                }
                backAction={
                    <Button
                        noHover
                        size="small"
                        variant="text"
                        sx={{ p: 0 }}
                        startIcon={<Icon name="arrow-left" color="text.secondary" />}
                        onClick={() => console.debug('go back')}
                    >
                        Voltar
                    </Button>
                }
            >
                content
            </Page>
        );
    }
};

export default meta;
