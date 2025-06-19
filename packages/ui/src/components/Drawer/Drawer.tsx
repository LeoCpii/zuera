import { useEffect, useState } from 'react';

import { joinClass } from '../../utils';
import Icon from '../../components/Icon';
import ButtonIcon from '../../components/ButtonIcon';
import createComponent from '../../core/createComponent';

import './Drawer.scss';

type Orientation = 'right' | 'left' | 'bottom';
type AnimationClass = 'show' | 'hide';
type Config = { animation: AnimationClass, visible: boolean };

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    orientation?: Orientation;
    body: React.JSX.Element;
    footer?: React.JSX.Element;
    onClose: () => void;
}
function Drawer({
    open,
    body,
    footer,
    orientation = 'right',
    onClose,
    ...props
}: DrawerProps) {
    const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });

    const ANIMATION_DURATION = 300;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useEffect(() => { open ? handleOpen() : handleClose(); }, [open]);

    const handleOpen = () => {
        setConfig(prev => ({ ...prev, visible: true }));
        setTimeout(() => {
            setConfig(prev => ({ ...prev, animation: 'show' }));
            document.body.style.overflow = 'hidden';
        }, 100);
    };

    const handleClose = () => {
        setConfig(prev => ({ ...prev, animation: 'hide' }));
        setTimeout(() => {
            setConfig(prev => ({ ...prev, visible: false }));
            document.body.style.overflow = '';
        }, ANIMATION_DURATION);
    };

    return (
        config.visible && (
            <div className="ui-drawer" {...props}>
                <div className={joinClass(['ui-drawer-content', orientation, config.animation])}>
                    <div className="close-button">
                        <ButtonIcon
                            onClick={onClose}
                            color="text.primary"
                            aria-label="Fechar"
                            data-testid="drawer-close-button"
                        >
                            <Icon name="times" />
                        </ButtonIcon>
                    </div>
                    {body}
                    {footer}
                </div>
                <div
                    data-testid="drawer-overlay"
                    className={joinClass(['ui-drawer-overlay', config.animation])}
                    onClick={onClose}
                />
            </div>
        )
    );
}

export default createComponent(Drawer);