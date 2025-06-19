import type { ThemeBuilded, ThemeOptions } from '../Theme';
import { generateSupportColors } from './generateSupportColors';
import { themeDefaultDark, themeDefaultLight } from '../utils/themeDefault';

export function createTheme(theme?: ThemeOptions): ThemeBuilded {
    const mode = theme?.palette?.mode || 'light';
    const ref = mode === 'dark' ? themeDefaultDark : themeDefaultLight;

    const primary = generateSupportColors(theme?.palette?.primary || ref.palette.primary);
    const secondary = generateSupportColors(theme?.palette?.secondary || ref.palette.secondary);
    const error = generateSupportColors(theme?.palette?.error || ref.palette.error);
    const warning = generateSupportColors(theme?.palette?.warning || ref.palette.warning);
    const success = generateSupportColors(theme?.palette?.success || ref.palette.success);
    const info = generateSupportColors(theme?.palette?.info || ref.palette.info);
    const grey = generateSupportColors(theme?.palette?.grey || ref.palette.grey);

    const colors = { primary, secondary, error, warning, success, info, grey };

    return {
        palette: {
            mode,
            text: theme?.palette?.text || ref.palette.text,
            background: theme?.palette?.background || ref.palette.background,
            divider: theme?.palette?.divider || ref.palette.divider,
            ...colors
        },
        shape: theme?.shape || ref.shape,
        spacing: theme?.spacing || ref.spacing,
    };
}