import type { CSSProperties } from 'react';

import type { Plugin } from './plugin';
import type { CustomOptions } from './customOptions';

export default function defineOptions(options: CustomOptions, ...plugins: Plugin[]): CSSProperties {
    return plugins.reduce<CSSProperties>((acc, plugin) => {
        acc = { ...acc, ...plugin(options) };

        return acc;
    }, {});

}