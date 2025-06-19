import { cloneElement, HtmlHTMLAttributes } from 'react';

import Stack from '../Stack';
import { joinClass } from '../../utils';
import { Colors, useTheme } from '../../theme';
import ButtonIcon from '../../components/ButtonIcon';
import Typography from '../../components/Typography';
import createComponent from '../../core/createComponent';
import Icon, { type IconProps } from '../../components/Icon';

import './Alert.scss';

export interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
    color?: Colors;
    variant?: 'opacity' | 'contained';
    icon?: React.JSX.Element;
    children: React.ReactNode;
    fullWidth?: boolean;
    onClose?: () => void;
}
function Alert({
    children,
    icon,
    fullWidth,
    color = 'primary',
    variant = 'contained',
    onClose,
    ...props
}: AlertProps) {
    const { theme } = useTheme();

    const themeRef = theme.palette.mode === 'dark' ? 'light' : 'dark';

    const className = joinClass([
        'ui-alert',
        `ui-alert--${color}`,
        `ui-alert--${color}--${theme.palette.mode === 'dark' ? 'opacity' : variant}`,
        fullWidth && 'ui-alert--fullWidth',
        props.className
    ]);

    const message = typeof children === 'string'
        ? <Typography variant="body1" style={{ color: 'currentcolor' }}>{children}</Typography>
        : children;

    const renderIcon = (icon: React.JSX.Element) => {
        return cloneElement<IconProps>(icon, {
            color: `${color}.dark`
        });
    };

    return (
        <div {...props} className={className}>
            <Stack orientation="row" alignItems="center" spacing="small">
                {
                    icon && (
                        <div className="ui-alert__icon">
                            {renderIcon(icon)}
                        </div>
                    )
                }
                {message}
            </Stack>
            {
                !!onClose && (
                    <ButtonIcon onClick={onClose} color={`${color}.${themeRef}`} className="ui-alert__button">
                        <Icon name="times" />
                    </ButtonIcon>
                )
            }
        </div>
    );
}

export default createComponent(Alert);