import { useEffect, useMemo, useState } from 'react';

import { slug } from '@zuera/toolkit/string';

import Stack from '@/components/Stack';
import Tooltip from '@/components/Tooltip';
import Typography from '@/components/Typography';
import { getContrastColor, getPriorityColor, useTheme } from '@/theme';

import { CHART_COLORS } from '../colors';
import type { ChartData, ChartItem } from '../interface';

import './Bars.scss';

interface BarsProps {
    data: ChartData[];
    colors?: string[];
    tooltipPosition?: 'left' | 'right';
    renderLabel: (data: ChartData) => string;
}

export default function Bars({
    data,
    tooltipPosition,
    colors = CHART_COLORS,
    renderLabel
}: BarsProps) {
    const { theme: { palette } } = useTheme();

    const [mappedData, setMappedData] = useState<ChartItem[]>([]);

    const referenceValue = useMemo(() => data.sort((a, b) => b.value > a.value ? 1 : -1)[0].value, [data]);

    useEffect(() => { setMappedData(mapData()); }, [data]);

    const mapData = () => data.map<ChartItem>((i, index) => ({
        ...i,
        visible: true,
        slug: slug(i.label),
        color: getPriorityColor(i.color || '', palette) || colors[index]
    }));

    const getPercentage = (value: number) => `${(value / referenceValue) * 100}%`;

    return (
        <>
            <Stack orientation="row" alignItems="flex-end" spacing="small" className="ui-bars">
                {
                    mappedData.map(bar => (
                        <Tooltip key={bar.label} label={bar.label} direction={tooltipPosition} style={{
                            height: '100%',

                        }}>
                            <div
                                className="ui-bars__bar"
                                style={{
                                    height: getPercentage(bar.value),
                                    // height: '100%',
                                    backgroundColor: bar.color
                                }}>
                                <Typography
                                    style={{ color: getContrastColor(bar.color) }}
                                >
                                    {renderLabel(bar)}
                                </Typography>
                            </div>
                        </Tooltip>
                    ))
                }
            </Stack>
        </>
    );
}