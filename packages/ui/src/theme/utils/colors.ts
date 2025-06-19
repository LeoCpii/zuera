import type { Color, PaletteBuilded } from '../Theme';

const getColorsVariations = (color: Color) => {
    const arr: Array<keyof Color> = ['main', 'dark', 'light'];

    return arr.map<string>(c => color[c]);
};

export const COLORS = (palette: PaletteBuilded) => [
    ...getColorsVariations(palette.primary),
    ...getColorsVariations(palette.secondary),
    ...getColorsVariations(palette.info),
    ...getColorsVariations(palette.warning),
    ...getColorsVariations(palette.error),
    ...getColorsVariations(palette.success),
];