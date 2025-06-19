export function getContrastColor(hexColor: string) {
    // Converter hexadecimal para RGB
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;

    // Calcular a luminância relativa
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Se a luminância for baixa, usar branco como contraste, senão preto
    return luminance > 0.6 ? '#000000' : '#ffffff';
}