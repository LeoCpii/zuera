/**
 * Adiciona opacidade a uma cor em hexadecimal.
 * @param hexColor - A cor em hexadecimal (ex: #RRGGBB ou #RGB).
 * @param opacity - O valor da opacidade (entre 0 e 1).
 * @returns A cor hexadecimal com opacidade (ex: #RRGGBBAA).
 */
export function getOpacityColor(hexColor: string, opacity: number): string {
    // Validar entrada do hexadecimal
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexPattern.test(hexColor)) {
        throw new Error('Cor inválida. Use um formato hexadecimal (#RRGGBB ou #RGB).');
    }

    // Expandir formato #RGB para #RRGGBB
    if (hexColor.length === 4) {
        hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
    }

    // Converter opacidade para formato hexadecimal (0 a 255)
    const alpha = Math.round(opacity * 255);
    const alphaHex = alpha.toString(16).padStart(2, '0').toUpperCase();

    // Combinar cor com opacidade
    return `${hexColor}${alphaHex}`;
}