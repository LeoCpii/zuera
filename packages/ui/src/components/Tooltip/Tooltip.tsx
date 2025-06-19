import { cloneElement, CSSProperties, HTMLAttributes, HtmlHTMLAttributes, useMemo, useState } from 'react';

import { uuid } from '@zuera/toolkit/uuid';

import { useTheme } from '../../theme';
import { joinClass } from '../../utils';

import './Tooltip.scss';

type TooltipCoordinate = { top?: number; left?: number; };
type Direction = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps extends HTMLAttributes<HTMLElement> {
    direction?: Direction;
    width?: CSSProperties['width'];
    children: React.JSX.Element;
    label: string | React.JSX.Element;
}
export default function Tooltip({
    children,
    label,
    width = 'max-content',
    direction = 'bottom',
    ...props
}: TooltipProps) {
    const { theme: { spacing } } = useTheme();
    const [open, setOpen] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [coordinate, setCoordinate] = useState<TooltipCoordinate | null>(null);

    const id = useMemo(() => `tooltip-${uuid()}`, []);

    const className = joinClass([
        'ui-tooltip',
        animate && 'ui-tooltip--visible',
    ]);

    const changePosition = (target: HTMLElement) => {
        const { offsetHeight, offsetWidth } = target;

        const tooltipEl = document.querySelector(`#${id}`) as HTMLElement;

        const { offsetHeight: tooltipOffsetHeight, offsetWidth: tooltipOffsetWidth } = tooltipEl;

        if (direction === 'top') {
            const t = -(tooltipOffsetHeight + spacing);
            const l = -(tooltipOffsetWidth - offsetWidth) / 2;

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'bottom') {
            const t = offsetHeight + spacing;
            const l = -(tooltipOffsetWidth - offsetWidth) / 2;

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'right') {
            const t = (offsetHeight - tooltipOffsetHeight) / 2;
            const l = offsetWidth + spacing;

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'left') {
            const t = (offsetHeight - tooltipOffsetHeight) / 2;
            const l = - (tooltipOffsetWidth + spacing);

            setCoordinate({ top: t, left: l });
        }
    };

    const handleLeave = () => {
        setAnimate(false);

        setTimeout(() => {
            setCoordinate(null);
            setOpen(false);
        }, 300);
    };

    const handleEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOpen(true);

        setTimeout(() => {
            changePosition(e.target as HTMLElement);
            setAnimate(true);
        }, 10);
    };

    const renderChildren = () => {
        return cloneElement<HtmlHTMLAttributes<HTMLDivElement>>(children, {
            onMouseEnter: (e) => { handleEnter(e); },
            onMouseDown: () => { handleLeave(); }
        });
    };

    return (
        <div {...props} style={{ position: 'relative', ...props.style }} onMouseLeave={handleLeave}>
            {renderChildren()}
            <span id={id} className={className} style={{
                ...coordinate,
                maxWidth: width,
                display: open ? 'block' : 'none',
            }}>
                {label}
            </span>
        </div>
    );
};