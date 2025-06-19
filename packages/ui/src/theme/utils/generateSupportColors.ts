import type { Color } from '../Theme';
import { hexToHsl } from './hexToHsl';
import { adjustLightness } from './adjustLightness';
import { getOpacityColor } from './getOpacityColor';
import { getContrastColor } from './getContrastColor';

export function generateSupportColors(hex: string): Color {
    const variation = 20;

    const hsl = hexToHsl(hex);

    const contrastColor = getContrastColor(hex);
    const lighterColor = adjustLightness(hsl.h, hsl.s, hsl.l, variation);
    const darkerColor = adjustLightness(hsl.h, hsl.s, hsl.l, -variation);
    const opacityColor = getOpacityColor(hex, variation / 100);

    return {
        main: hex,
        dark: darkerColor,
        light: lighterColor,
        opacity: opacityColor,
        contrastText: contrastColor
    };
}