import { CSSProperties } from 'react';

import { joinClass } from '../../utils';
import createComponent from '../../core/createComponent';

import './Skeleton.scss';

type Variants = 'rounded' | 'rectangular' | 'circular';

interface SkeletonProps {
    variant?: Variants;
    width: CSSProperties['width'];
    height: CSSProperties['height'];
}
function Skeleton({ width, height, variant = 'rounded' }: SkeletonProps) {
    const className = joinClass([
        'ui-skeleton',
        `ui-skeleton--${variant}`
    ]);

    return (
        <div className={className} style={{ width, height }}>

        </div>
    );
}

export default createComponent(Skeleton);