
import { adjustLightness } from './adjustLightness';
import { hexToHsl } from './hexToHsl';

export function getLinearGradient(hex: string) {
    const variation = 5;

    const hsl = hexToHsl(hex);

    const color2 = adjustLightness(hsl.h, hsl.s, hsl.l, variation); // 20% mais claro
    const color3 = adjustLightness(hsl.h, hsl.s, hsl.l, variation * 2); // 40% mais claro

    return `linear-gradient(to right, ${hex}, ${color2}, ${color3})`;
}