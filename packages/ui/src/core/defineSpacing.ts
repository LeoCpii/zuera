import type { CSSProperties } from 'react';

import { Plugin } from './plugin';
import { useTheme } from '../theme';
import type { CustomOptions } from './customOptions';

export interface SpacingOptions {
    p: number;
    py: number;
    px: number;
    pt: number;
    pb: number;
    pl: number;
    pr: number;
    m: number;
    my: number;
    mx: number;
    mt: number;
    mb: number;
    ml: number;
    mr: number;
}

function definePadding(options: CustomOptions): CSSProperties {
    const { theme: { spacing } } = useTheme();

    const { p, pb, pl, pr, pt, px, py } = options;

    const calculatePadding = (pd?: number) => {
        return !!pd || pd === 0 ? pd * spacing : undefined;
    };

    const hasP = calculatePadding(p);

    const hasPt = calculatePadding(pt);
    const hasPb = calculatePadding(pb);

    const hasPy = calculatePadding(py);
    const hasPx = calculatePadding(px);

    const hasPl = calculatePadding(pl);
    const hasPr = calculatePadding(pr);

    return {
        padding: hasP,
        paddingTop: hasPt || hasPy || hasP,
        paddingBottom: hasPb || hasPy || hasP,
        paddingLeft: hasPl || hasPx || hasP,
        paddingRight: hasPr || hasPx || hasP,
    };
};

function defineMargin(options: CustomOptions): CSSProperties {
    const { theme: { spacing } } = useTheme();

    const { m, mb, ml, mr, mt, mx, my } = options;

    const calculateMargin = (mg?: number) => {
        return !!mg || mg === 0 ? mg * spacing : undefined;
    };

    const hasM = calculateMargin(m);

    const hasMt = calculateMargin(mt);
    const hasMb = calculateMargin(mb);

    const hasMy = calculateMargin(my);
    const hasMx = calculateMargin(mx);

    const hasMl = calculateMargin(ml);
    const hasMr = calculateMargin(mr);

    return {
        margin: hasM,
        marginTop: hasMt || hasMy || hasM,
        marginBottom: hasMb || hasMy || hasM,
        marginLeft: hasMl || hasMx || hasM,
        marginRight: hasMr || hasMx || hasM,
    };
};

export default function defineSpacing(): Plugin[] {
    return [
        definePadding,
        defineMargin
    ];
}