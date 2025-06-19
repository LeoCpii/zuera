
import type { Path } from '@zuera/toolkit/interface';

export type Mode = 'light' | 'dark'

export type MappedColors = Path<PaletteBuilded>;
export type Colors = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

export type Size = 'small' | 'medium' | 'large';

export interface Color {
    main: string;
    dark: string;
    light: string;
    opacity: string;
    contrastText: string;
}

export interface Palette {
    mode: Mode;
    info: string;
    error: string;
    warning: string;
    success: string;
    primary: string;
    secondary: string;
    grey: string;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    background: {
        paper: string;
        default: string;
    };
    divider: string;
}

export type Spacing = number;
export type Shape = {
    radius: number;
}

export interface PaletteBuilded extends Pick<Palette, 'mode' | 'text' | 'background' | 'divider'> {
    mode: Mode;
    grey: Color;
    info: Color;
    error: Color;
    warning: Color;
    success: Color;
    primary: Color;
    secondary: Color;
}

export interface ThemeOptions {
    palette?: Partial<Palette>;
    spacing?: Spacing;
    shape?: Shape;
}

export interface Theme {
    shape: Shape;
    palette: Palette;
    spacing: Spacing;
}

export interface ThemeBuilded {
    shape: Shape;
    spacing: Spacing;
    palette: PaletteBuilded;
}