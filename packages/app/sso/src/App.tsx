import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { AlertProvider } from '@zuera/ui/components/Alert';
import { createTheme, ThemeProvider, useTheme } from '@zuera/ui/theme';

import { UserData } from '@zuera/services/user';

import { AuthProvider } from '@zuera/common/Auth';

import {
    authServices,
    userServices,
} from '@/services/core';

function setFavicon(color: string) {
    let link = document.querySelector<HTMLLinkElement>('link[rel~=\'icon\']');

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    fetch('https://cdn.clubedoafiliado.com/assets/favicon/favicon-reversed.svg')
        .then((response) => response.text())
        .then((svgText) => {
            const updatedSVG = svgText.replace(/fill="[^"]*"/, `color="${color}"`);

            const blob = new Blob([updatedSVG], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            link.href = url;
        });
}

function Content() {
    const { theme: { palette } } = useTheme();

    useEffect(() => { setFavicon(palette.primary.contrastText); }, []);

    return (
        <Outlet />
    );
}

export default function App() {
    const handleAuthenticate = (user?: UserData) => {
        if (!user) { return; }
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <AlertProvider>
                <AuthProvider
                    authServices={authServices}
                    usersServices={userServices}
                    onAuthenticate={handleAuthenticate}
                >
                    <Content />
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
};