import type { CSSProperties } from 'react';

import { Plugin } from './plugin';
import type { CustomOptions } from './customOptions';
import { useTheme, type PaletteBuilded } from '../theme';

export type ColorOptions = {
    color: (palette: PaletteBuilded) => string;
    background: (palette: PaletteBuilded) => string;
    borderColor: (palette: PaletteBuilded) => string;
    backgroundColor: (palette: PaletteBuilded) => string;
};

function defineBackground(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.background) { return {}; }

    return {
        background: options.background(palette)
    };
};

function defineBackgroundColor(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.backgroundColor) { return {}; }

    return {
        backgroundColor: options.backgroundColor(palette)
    };
};

function defineColor(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.color) { return {}; }

    return {
        color: options.color(palette)
    };
};

function defineBorderColor(options: CustomOptions): CSSProperties {
    const { theme: { palette } } = useTheme();

    if (!options.borderColor) { return {}; }

    return {
        borderColor: options.borderColor(palette)
    };
};

export default function defineColors(): Plugin[] {
    return [
        defineColor,
        defineBorderColor,
        defineBackground,
        defineBackgroundColor,
    ];
}