import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { slug } from '@zuera/toolkit/string';

import { joinClass } from '../../utils';
import Icon from '../../components/Icon';
import { CHART_COLORS } from '../colors';
import Stack from '../../components/Stack';
import Typography from '../../components/Typography';
import { Card, CardContent } from '../../components/Card';
import type { ChartData, ChartItem } from '../interface';
import { convertPathToColor, MappedColors, useTheme } from '../../theme';

import './Donut.scss';

type Slice = {
    slug: string;
    color: string;
    percentage: number;
    total: number;
    start: number;
    end: number;
}

interface DonutProps {
    data: ChartData[];
    tooltipPosition?: 'left' | 'right';
    colors?: string[];
    width?: number;
    renderLabel: (data: Slice) => React.JSX.Element;
}
export default function Donut({
    data,
    renderLabel,
    colors = CHART_COLORS,
    tooltipPosition = 'right',
    width = 200,
}: DonutProps) {
    const [slices, setSlices] = useState<Slice[]>([]);
    const [mappedData, setMappedData] = useState<ChartItem[]>([]);
    const [tooltipVisibility, setTooltipVisibility] = useState(false);

    const { theme: { palette } } = useTheme();

    const total = useMemo(() => {
        return mappedData
            .filter(i => Boolean(i.value))
            .filter(i => i.visible)
            .reduce((acc, i) => acc += i.value, 0);
    }, [mappedData]);

    const gradient = useMemo<CSSProperties>(() => {
        const conicGradient = slices
            .map(s => `${s.color} ${s.start}% ${s.end}%`)
            .join(', ');

        return {
            width,
            height: width,
            background: `conic-gradient(${conicGradient})`,
        };
    }, [slices]);

    const className = joinClass([
        'ui-donut__chart__tooltip',
        `ui-donut__chart__tooltip-${tooltipPosition}`,
        tooltipVisibility && `ui-donut__chart__tooltip-${tooltipPosition}--visible`
    ]);

    useEffect(() => { if (mappedData.length) { getSlices(); } }, [mappedData]);

    useEffect(() => { setMappedData(mapData()); }, [data]);

    const mapData = () => data.map<ChartItem>((i, index) => ({
        ...i,
        visible: true,
        slug: slug(i.label),
        color: i.color ? convertPathToColor(i.color as MappedColors, palette) : colors[index]
    }));

    const getSlices = () => {
        const percentageArr: number[] = [];

        const slices = mappedData
            .filter(i => i.visible)
            .sort((a, b) => b.value - a.value)
            .map<Slice>((current, index) => {
                const percentage = (current.value / total) * 100;

                const previous = percentageArr[index - 1] || 0;

                percentageArr.push(percentage + previous);

                return {
                    color: current.color as string,
                    slug: current.slug,
                    percentage,
                    total: current.value,
                    start: !index ? 0 : previous,
                    end: !index ? percentage : percentage + previous
                };
            });

        setSlices(slices);
    };

    const toggleVisibility = (item: ChartItem) => {
        setMappedData(prev => prev.map(i => {
            if (i.slug === item.slug) { i.visible = !i.visible; }
            return i;
        }));
    };

    const toggleTooltipVisibility = () => { setTooltipVisibility(prev => !prev); };

    return (
        <>
            <style>
                {
                    `.ui-donut__chart::after {
                        content: '';
                        width: ${width / 2}px;
                        height: ${width / 2}px;
                        background: var(--background-default);
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}
            </style>
            <Stack className="ui-donut" justifyContent="center" alignItems="center">
                {!mappedData.length && (
                    <Stack spacing="small" justifyContent="center" alignItems="center" style={{ minHeight: 100 }}>
                        <Icon name="chart-pie" color="text.secondary" size="medium" />
                        <Typography noMargin variant="body2" color="text.secondary">
                            Nenhum dado encontrado
                        </Typography>
                    </Stack>
                )}
                {
                    Boolean(mappedData.length) && (
                        <>
                            <div
                                className="ui-donut__chart"
                                style={gradient}
                                onMouseEnter={toggleTooltipVisibility}
                                onMouseLeave={toggleTooltipVisibility}
                            >
                                <div className="ui-donut__chart__label"></div>
                                <Card className={className}>
                                    <CardContent>
                                        <Stack spacing="small">
                                            {
                                                slices.map(data => (
                                                    <Stack
                                                        key={data.slug}
                                                        orientation="row"
                                                        alignItems="center"
                                                        spacing="small"
                                                    >
                                                        <div
                                                            className="ui-donut__chart__tooltip__identifier"
                                                            style={{ background: data.color }}
                                                        />
                                                        {renderLabel(data)}
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </div>
                            <Stack
                                orientation="row"
                                justifyContent="center"
                                spacing="small"
                                style={{ flexWrap: 'wrap' }}
                            >
                                {
                                    mappedData
                                        .sort((a, b) => b.value - a.value)
                                        .map((item, i) =>
                                            <div
                                                key={i}
                                                className="ui-donut__legend"
                                                onClick={() => toggleVisibility(item)}
                                            >
                                                <div className="ui-donut__legend__square" style={{
                                                    backgroundColor: item.visible ? item.color : palette.text.disabled,
                                                }} />
                                                <Typography noMargin color={
                                                    item.visible ? 'text.secondary' : 'text.disabled'
                                                }>
                                                    {item.label}
                                                </Typography>
                                            </div>
                                        )
                                }
                            </Stack>
                        </>
                    )
                }
            </Stack>
        </>
    );
}