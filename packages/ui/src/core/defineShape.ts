import type { CSSProperties } from 'react';

import type { Plugin } from './plugin';
import type { CustomOptions } from './customOptions';
import { type Shape, useTheme } from '../theme';

export type ShapeOptions = {
    borderRadius: (shape: Shape) => number;
};

function defineRadius(options: CustomOptions): CSSProperties {
    const { theme: { shape } } = useTheme();

    if (!options.borderRadius) { return {}; }

    return {
        borderRadius: shape.radius
    };
};

export default function defineShape(): Plugin[] {
    return [
        defineRadius,
    ];
}