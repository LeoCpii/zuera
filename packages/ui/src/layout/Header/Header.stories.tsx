import type { Meta, StoryObj } from '@storybook/react';

import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@/theme';

import Header from './Header';
import ButtonGuide from './ButtonGuide';
import ButtonMode from './ButtonMode';
import ButtonProfile from './ButtonProfile';

const meta: Meta<typeof Header> = {
    title: 'layout/Header',
    component: Header,
};

export const Template: StoryObj<typeof Header> = {
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
        );
    }
};
export default meta;
