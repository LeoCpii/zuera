import type { MappedColors } from '../..theme';

export type ChartItem = ChartData & { slug: string; visible: boolean; };
export type ChartData = { label: string; value: number; color?: MappedColors | string; }