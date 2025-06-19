import type { ThemeBuilded, Color } from '../Theme';

function setColor(name: string, color: Color) {
    document.documentElement.style.setProperty(`--${name}`, color.main);
    document.documentElement.style.setProperty(`--${name}-light`, color.light);
    document.documentElement.style.setProperty(`--${name}-dark`, color.dark);
    document.documentElement.style.setProperty(`--${name}-contrast`, color.contrastText);
    document.documentElement.style.setProperty(`--${name}-opacity`, color.opacity);
}

export function applyTheme(theme: ThemeBuilded) {
    if (typeof window === 'undefined') { return; }

    const { palette, shape, spacing } = theme;

    // COLORS
    setColor('info', palette.info);
    setColor('error', palette.error);
    setColor('warning', palette.warning);
    setColor('success', palette.success);
    setColor('primary', palette.primary);
    setColor('secondary', palette.secondary);

    // GREY
    setColor('grey', palette.grey);

    // TEXT
    document.documentElement.style.setProperty('--text-primary', palette.text?.primary);
    document.documentElement.style.setProperty('--text-secondary', palette.text?.secondary);
    document.documentElement.style.setProperty('--text-disabled', palette.text?.disabled);

    // BACKGROUND
    document.documentElement.style.setProperty('--background-paper', palette.background?.paper);
    document.documentElement.style.setProperty('--background-default', palette.background?.default);

    // DIVIDER
    document.documentElement.style.setProperty('--divider', palette.divider);

    // SHAPE
    document.documentElement.style.setProperty('--radius', `${shape.radius}px`);

    // SPACING
    document.documentElement.style.setProperty('--spacing', `${spacing}px`);
}