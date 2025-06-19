import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';
import type { GridItemBaseProps } from './interface';

import './Grid.scss';

export interface GridItemProps extends GridItemBaseProps { children: React.ReactNode; }
function GridItem({ children, gridColumnStart, xl = 1, lg, md, sm, ...props }: Readonly<GridItemProps>) {
    const SIZES = {
        xl,
        lg: lg || xl,
        md: md || lg || xl,
        sm: sm || md || lg || xl,
    };

    const className = joinClass([
        'grid__item',
        Object.entries(SIZES).map(([size, value]) => {
            return `grid__item--${size}-${value}`;
        }).join(' '),
        props.className,
    ]);

    return (
        <div
            {...props}
            className={className}
            style={{
                gridColumnStart,
                ...props.style,
            }}
        >
            {children}
        </div>
    );
}

export default createComponent(GridItem);