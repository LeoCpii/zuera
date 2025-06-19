import type { MappedColors, PaletteBuilded } from '../Theme';
import { convertPathToColor } from './convertPathToColor';

export function getPriorityColor(color: string, palette: PaletteBuilded) {
    if (color.includes('.')) { return convertPathToColor(color as MappedColors, palette); }

    return color;
}