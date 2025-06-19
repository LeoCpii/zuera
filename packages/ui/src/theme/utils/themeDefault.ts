import type { Theme } from '../Theme';

export const defaultSpacing: Theme['spacing'] = 8;
export const defaultShape: Theme['shape'] = { radius: 8 };

export const themeDefaultLight: Theme = {
    palette: {
        mode: 'light',
        info: '#72e4fc',
        error: '#ff5377',
        warning: '#FF9457',
        success: '#36e79b',
        primary: '#901a30',
        secondary: '#f8d99d',
        grey: '#F4F4F4',
        text: {
            primary: 'rgb(31, 41, 55)',
            secondary: 'rgb(75, 85, 99)',
            disabled: 'rgb(209, 213, 219)'
        },
        background: {
            paper: '#f9f8f9',
            default: '#FFF',
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};

export const themeDefaultDark: Theme = {
    palette: {
        mode: 'dark',
        info: '#72e4fc',
        error: '#ff5377',
        warning: '#FF9457',
        success: '#36e79b',
        primary: '#6c37f4',
        secondary: '#ebff5e',
        grey: '#2A2A2A',
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)'
        },
        background: {
            paper: '#0d0225',
            default: '#30294e',
        },
        divider: 'rgba(255, 255, 255, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};