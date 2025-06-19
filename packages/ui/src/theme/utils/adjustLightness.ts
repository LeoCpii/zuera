import { hslToHex } from './hslToHex';

export function adjustLightness(h: number, s: number, l: number, amount: number) {
    l = Math.min(Math.max(l + amount, 0), 100);
    return hslToHex(h, s, l);
}