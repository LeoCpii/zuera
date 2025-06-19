import { cloneElement, HtmlHTMLAttributes, useMemo, useRef, useState } from 'react';

import { uuid } from '@zuera/toolkit/uuid';

import { useTheme } from '../../theme';
import { joinClass } from '../../utils';
import useOutsideClick from '../../hooks/useOutsideClick';

import './Popover.scss';

type PopoverCoordinate = { top?: number; left?: number; };
type Direction = 'top' | 'right' | 'bottom' | 'left';

interface PopoverProps { children: React.JSX.Element; direction?: Direction; label: string | React.JSX.Element; }
export default function Popover({ children, label, direction = 'bottom' }: PopoverProps) {
    const { theme: { spacing } } = useTheme();

    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => handleLeave(), []);

    const [open, setOpen] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [coordinate, setCoordinate] = useState<PopoverCoordinate | null>(null);

    const id = useMemo(() => `popover-${uuid()}`, []);

    const className = joinClass([
        'ui-popover',
        animate && 'ui-popover--visible',
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
            onClick: (e) => { handleEnter(e); },
        });
    };

    return (
        <div ref={ref} style={{ position: 'relative', cursor: 'pointer' }}>
            {renderChildren()}
            <span id={id} className={className} style={{
                ...coordinate,
                display: open ? 'block' : 'none',
            }}>
                {label}
            </span>
        </div>
    );
};