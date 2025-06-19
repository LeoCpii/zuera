import { HTMLAttributes } from 'react';

import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';
import { convertPathToColor, useTheme, type MappedColors } from '../../theme';

import './Loading.scss';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
    color?: MappedColors;
    size?: number | string;
}
function Loading({ color = 'primary.main', size = '1.5rem', ...props }: LoadingProps) {
    const { theme: { palette } } = useTheme();

    const c = convertPathToColor(color, palette);

    const className = joinClass(['ui-loading', props.className]);

    return (
        <span {...props} className={className} style={{ ...props, color: c, width: size, height: size }}>
            <svg className="ui-loading__svg" viewBox="22 22 44 44">
                <circle className="ui-loading__circle" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6">
                </circle>
            </svg>
        </span>
    );
}

export default createComponent(Loading);