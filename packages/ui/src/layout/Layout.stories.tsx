import { Meta, StoryObj } from '@storybook/react';

import Box from '@/components/Box';
import Icon from '@/components/Icon';
import Slide from '@/animations/Slide';
import Stack from '@/components/Stack';
import Content from '@/layout/Content';
import Button from '@/components/Button';
import Typography from '@/components/Typography';
import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@/theme';

import Page from './Page';
import { ButtonGuide, ButtonMode, ButtonProfile, Header } from './Header';
import { Sidebar, SidebarButton } from './Sidebar';

const meta: Meta = {
    title: 'layout/Main',
};

export const template: StoryObj = {
    render: () => {
        const { theme, updateTheme } = useTheme();

        const themes = {
            light: themeDefaultLight,
            dark: themeDefaultDark,
        };

        const toggleTheme = () => {
            updateTheme(createTheme(theme.palette.mode === 'dark'
                ? themes.light
                : themes.dark
            ));
        };

        return (
            <Box sx={{ backgroundColor: ({ background }) => background.default }}>
                <Slide enter direction="top" timeout={.3}>
                    <Header
                        actions={
                            <>
                                <ButtonGuide onStartGuide={console.debug} />
                                <ButtonMode onUpdateMode={toggleTheme} />
                            </>
                        }
                        buttonProfile={
                            <ButtonProfile
                                user={{
                                    name: 'John Doe',
                                    email: 'john.doe@email.com',
                                    picture: 'https://robohash.org/john-doe'
                                }}
                                onProfile={console.debug}
                            />
                        }
                    />
                </Slide>
                <Stack orientation="row" nogap>
                    <Slide enter direction="left" timeout={.3}>
                        <Sidebar
                            upButtons={
                                <>
                                    <SidebarButton icon={<Icon name="home" />} />
                                    <SidebarButton icon={<Icon name="users-alt" />} />
                                    <SidebarButton icon={<Icon name="bitcoin-circle" />} />
                                </>
                            }
                            downButtons={
                                <>
                                    <SidebarButton icon={<Icon name="setting" />} />
                                    <SidebarButton icon={<Icon name="signout" />} />
                                </>
                            }
                        />
                    </Slide>
                    <Content>
                        <Page
                            title="My page title"
                            subtitle="A pretty cool subtitle"
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
                            <Typography variant="body1" noMargin>
                                Content
                            </Typography>
                        </Page>
                    </Content>
                </Stack>
            </Box>
        );
    }
};

export default meta;