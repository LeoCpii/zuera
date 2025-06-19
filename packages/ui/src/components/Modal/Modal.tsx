import { HTMLAttributes, useEffect, useState } from 'react';

import ButtonIcon from '../ButtonIcon';
import Icon from '../../components/Icon';
import Stack from '../../components/Stack';
import joinClass from '../../utils/joinClass/joinClass';
import createComponent from '../../core/createComponent';
import { Card, CardContent } from '../../components/Card';

import './Modal.scss';

type AnimationClass = 'show' | 'hide';
type Config = { animation: AnimationClass, visible: boolean };

export interface ModalProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: React.JSX.Element;
    subtitle?: React.JSX.Element;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}
function Modal({ children, title, subtitle, isOpen, onClose, ...props }: ModalProps) {
    const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });

    const ANIMATION_DURATION = 300;

    const className = joinClass(['ui-modal', `ui-modal--${config.animation}`]);
    const classNameContent = joinClass(['ui-modal__content', props.className]);
    const backdropClassName = joinClass(['ui-modal__backdrop', `ui-modal__backdrop--${config.animation}`]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useEffect(() => { isOpen ? handleOpen() : handleClose(); }, [isOpen]);

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
            <div className={backdropClassName} onClick={onClose}>
                <div className="ui-modal__container">
                    <Card className={className}>
                        <CardContent onClick={(e) => e.stopPropagation()}>
                            <Stack
                                orientation="row"
                                alignItems="flex-start"
                                justifyContent="space-between"
                                style={{ flexWrap: 'nowrap' }}
                            >
                                <div>
                                    {title}
                                    {subtitle}
                                </div>
                                <ButtonIcon color="text.primary" onClick={onClose}>
                                    <Icon name="times" color="text.secondary" />
                                </ButtonIcon>
                            </Stack>
                            <div
                                {...props}
                                className={classNameContent}
                            >
                                {children}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    );
}

export default createComponent(Modal);