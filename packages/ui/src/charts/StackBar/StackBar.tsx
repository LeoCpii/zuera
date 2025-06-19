import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { slug } from '@zuera/toolkit/string';

import Icon from '../../components/Icon';
import Stack from '../../components/Stack';
import { CHART_COLORS } from '../colors';
import Typography from '../../components/Typography';
import type { ChartData, ChartItem } from '../interface';
import { useTheme, getContrastColor, convertPathToColor, MappedColors } from '../../theme';

import './StackBar.scss';

interface BarProps { data: ChartItem; total: number; }
function Bar({ data, total }: BarProps) {
    const [style, setStyle] = useState<CSSProperties>();

    const percentage = useMemo(() => {
        return `${Math.round((data.value / total) * 100)}%`;
    }, [total]);

    useEffect(() => { setStyle(getStyleBar()); }, [total]);

    const getStyleBar = (): CSSProperties => {
        return {
            width: percentage,
            background: data.color,
            color: getContrastColor(data.color),
        };
    };
    return (
        <div className="ui-stackbar__stacked" style={style}>
            {percentage}
        </div>
    );
}

interface StackBarProps { data: ChartData[]; colors?: string[]; }
export default function StackBar({ data, colors = CHART_COLORS }: StackBarProps) {
    const { theme: { palette } } = useTheme();

    const [mappedData, setMappedData] = useState<ChartItem[]>([]);

    const total = useMemo(() => {
        return mappedData
            .filter(i => Boolean(i.value))
            .filter(i => i.visible)
            .reduce((acc, i) => acc += i.value, 0);
    }, [mappedData]);

    useEffect(() => { setMappedData(mapData()); }, [data]);

    const mapData = () => data.map<ChartItem>((i, index) => ({
        ...i,
        slug: slug(i.label),
        visible: true,
        color: i.color ? convertPathToColor(i.color as MappedColors, palette) : colors[index]
    }));

    const toggleVisibility = (item: ChartItem) => {
        setMappedData(prev => prev.map(i => {
            if (i.slug === item.slug) { i.visible = !i.visible; }
            return i;
        }));
    };

    return (
        <Stack>
            {
                !mappedData.length && (
                    <Stack spacing="small" justifyContent="center" alignItems="center" style={{ minHeight: 100 }}>
                        <Icon name="chart-pie" color="text.secondary" size="medium" />
                        <Typography noMargin variant="body2" color="text.secondary">
                            Nenhum dado encontrado
                        </Typography>
                    </Stack>
                )
            }
            {
                Boolean(mappedData.length) && (
                    <>
                        <div className="ui-stackbar">
                            {
                                mappedData
                                    .filter(i => Boolean(i.value))
                                    .filter(i => i.visible)
                                    .map((item, i) =>
                                        <Bar key={i} data={item} total={total} />
                                    )
                            }
                        </div>
                        <Stack orientation="row" justifyContent="center" spacing="small" style={{ flexWrap: 'wrap' }}>
                            {
                                mappedData
                                    .map((item, i) =>
                                        <div
                                            key={i}
                                            className="ui-stackbar__legend"
                                            onClick={() => toggleVisibility(item)}
                                        >
                                            <div className="ui-stackbar__legend__square" style={{
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
    );
}