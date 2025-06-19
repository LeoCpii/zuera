import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';
import { convertPathToColor, useTheme, type MappedColors, type Size } from '../../theme';

import './Icons.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> { name: string; size?: Size; color?: MappedColors; }
function Icon({ name, size = 'medium', color = 'primary.main', ...props }: IconProps) {
    const { theme: { palette } } = useTheme();

    const clss = joinClass(['ui-icon', 'uil', `uil-${name}`, size, props.className]);

    const c = convertPathToColor(color, palette);

    return (
        <i {...props} className={clss} style={{ color: c, ...props.style }}></i>
    );
}

export default createComponent(Icon);