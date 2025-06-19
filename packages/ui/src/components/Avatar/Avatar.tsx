import { HTMLAttributes } from 'react';

import { getInitials } from '@zuera/toolkit/string';

import Icon from '../../components/Icon';
import Ripple from '../../components/Ripple';
import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';

import './Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLElement> {
    alt?: string;
    src?: string;
    name?: string;
    size?: number;
    variant?: 'rounded' | 'circular'
    icon?: React.JSX.Element;
}
function Avatar({
    src,
    alt,
    name,
    size = 40,
    variant = 'circular',
    icon,
    ...props
}: AvatarProps) {
    const className = joinClass([
        'ui-avatar',
        `ui-avatar--${variant}`,
        src && 'ui-avatar--image',
        name && 'ui-avatar--name',
        (!src && !name) || icon && 'ui-avatar--icon',
        props.onClick && 'ui-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    width={size}
                    height={size}
                    sizes="100vw"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                />
            );
        }
        if (name) { return <span>{getInitials(name)}</span>; }
        if (icon) { return icon; }

        return (
            <Icon name="user" className="ui-avatar__icon" />
        );
    };

    return (
        <div {...props} style={{ width: size, height: size, ...props.style }} className={className}>
            {content()}
            {props.children}
            {props.onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Avatar);