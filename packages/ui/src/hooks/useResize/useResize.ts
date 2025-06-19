import { useEffect } from 'react';

export enum DeviceBreakpoints {
    MAX_XS = '(max-width: 599px)',
    MIN_SM = '(min-width: 600px)',
    MAX_SM = '(max-width: 899px)',
    MIN_MD = '(min-width: 900px)',
    MAX_MD = '(max-width: 1199px)',
    MIN_LG = '(min-width: 1200px)',
    MAX_LG = '(max-width: 1535px)',
    MIN_XL = '(min-width: 1536px)',
}

type Medias = {
    xs: MediaQueryList;
    sm: MediaQueryList;
    md: MediaQueryList;
    lg: MediaQueryList;
    xl: MediaQueryList;
}

export interface Callback {
    onXs?: () => void;
    onSm?: () => void;
    onMd?: () => void;
    onLg?: () => void;
    onXl?: () => void;
}

const MEDIAS: { [x in keyof Medias]: string; } = {
    xs: DeviceBreakpoints.MAX_XS,
    sm: `${DeviceBreakpoints.MIN_SM} and ${DeviceBreakpoints.MAX_SM}`,
    md: `${DeviceBreakpoints.MIN_MD} and ${DeviceBreakpoints.MAX_MD}`,
    lg: `${DeviceBreakpoints.MIN_LG} and ${DeviceBreakpoints.MAX_LG}`,
    xl: DeviceBreakpoints.MIN_XL
};

const getMedias = (): Medias => {
    return {
        xs: window.matchMedia(MEDIAS.xs),
        sm: window.matchMedia(MEDIAS.sm),
        md: window.matchMedia(MEDIAS.md),
        lg: window.matchMedia(MEDIAS.lg),
        xl: window.matchMedia(MEDIAS.xl)
    };
};

export default function useResize({
    onXs, onSm, onMd, onLg, onXl
}: Callback, deps: any[] = []) {
    const MAP_CALLBACKS = {
        xs: onXs,
        sm: onSm,
        md: onMd,
        lg: onLg,
        xl: onXl
    };

    const checker = (event: MediaQueryListEvent, fn: () => void) => { if (event.matches) { fn(); } };

    const makeXs = (event: MediaQueryListEvent) => {
        if (onXs) { checker(event, onXs); }
    };

    const makeSm = (event: MediaQueryListEvent) => {
        if (onSm) { checker(event, onSm); }
    };

    const makeMd = (event: MediaQueryListEvent) => {
        if (onMd) { checker(event, onMd); }
    };

    const makeLg = (event: MediaQueryListEvent) => {
        if (onLg) { checker(event, onLg); }
    };

    const makeXl = (event: MediaQueryListEvent) => {
        if (onXl) { checker(event, onXl); }
    };

    const initialize = (medias: Medias) => {
        const key = Object.keys(medias).find((key) => medias[key].matches) as keyof typeof MAP_CALLBACKS;
        MAP_CALLBACKS[key]?.();
    };

    useEffect(() => {
        const medias = getMedias();
        initialize(medias);
    }, []);

    useEffect(() => {
        const medias = getMedias();

        /* eslint-disable @typescript-eslint/no-unused-expressions */
        onXs && medias.xs.addEventListener('change', makeXs);
        onSm && medias.sm.addEventListener('change', makeSm);
        onMd && medias.md.addEventListener('change', makeMd);
        onLg && medias.lg.addEventListener('change', makeLg);
        onXl && medias.xl.addEventListener('change', makeXl);

        return () => {
            onXs && medias.xs.removeEventListener('change', makeXs);
            onSm && medias.sm.removeEventListener('change', makeSm);
            onMd && medias.md.removeEventListener('change', makeMd);
            onLg && medias.lg.removeEventListener('change', makeLg);
            onXl && medias.xl.removeEventListener('change', makeXl);
        };
        /* eslint-enable @typescript-eslint/no-unused-expressions */
    }, deps);

};