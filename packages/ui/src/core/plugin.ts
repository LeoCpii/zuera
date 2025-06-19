import type { CSSProperties } from 'react';

import type { CustomOptions } from './customOptions';

export type Plugin = (options: CustomOptions) => CSSProperties;