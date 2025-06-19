import { CSSProperties } from 'react';

import type { ColorOptions } from './defineColors';
import type { SpacingOptions } from './defineSpacing';
import type { ShapeOptions } from './defineShape';

export type CustomOptions = Partial<
    & SpacingOptions
    & ColorOptions
    & ShapeOptions
>

export type Sx<T> = T & {
    sx?: CustomOptions;
    display?: CSSProperties['display'];
    alignItems?: CSSProperties['alignItems'];
    justifyContent?: CSSProperties['justifyContent'];
    textAlign?: CSSProperties['textAlign'];
    fullWidth?: boolean;
};