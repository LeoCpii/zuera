import {
    useRef,
    Children,
    useState,
    useEffect,
    useContext,
    ReactElement,
    JSXElementConstructor,
    JSX,
} from 'react';

import useStep from './useStep';
import { joinClass } from '../../utils';
import Icon from '../../components/Icon';
import Stack from '../../components/Stack';
import Button from '../../components/Button';
import type { StepLocalData } from './interface';
import ButtonIcon from '../../components/ButtonIcon';
import { Card, CardContent } from '../../components/Card';
import useIsInViewport from '../../hooks/useIsInViewport';
import GuideContext, { GuideContextData } from './GuideContext';

type ChildrenElem = ReactElement<any, string | JSXElementConstructor<any>>[];

const validateChildren = (name: string, arrayChildren: ChildrenElem) => {
    if (!arrayChildren.length || arrayChildren.length > 1) {
        throw new Error(`the step "${String(name)}" must have only one child`);
    }
};

interface BulletProps { visible: boolean; name: string; }
function Bullet({ visible, name }: BulletProps) {
    const { goTo } = useContext(GuideContext);

    const className = joinClass([
        'ui-guide__bullet',
        visible ? 'ui-guide__bullet--active' : ''
    ]);

    return (
        <div className={className} onClick={() => goTo(name)} />
    );
}

type FrameProps = Pick<GuideContextData, 'next' | 'previous'> & { step: StepLocalData; length: number; index: number; };
function Frame({ next, previous, step, index, length }: FrameProps) {
    const { steps, finish } = useContext(GuideContext);
    const [active, setActive] = useState(false);

    const { horizontal, vertical } = step.orientation;

    useEffect(() => { setTimeout(() => { setActive(true); }, 0); }, []);

    const className = joinClass([
        'ui-guide__frame',
        `ui-guide__frame--${horizontal}-${vertical}`,
        active ? 'ui-guide__frame--active' : '',
    ]);

    const classNameContent = joinClass([
        'ui-guide__frame__content',
        active ? 'ui-guide__frame__content--active' : '',
    ]);

    return (
        <div data-step={step.name}
            className={className}
        >
            <Card className={classNameContent}>
                <CardContent>
                    <Stack spacing="small">
                        <Stack justifyContent="flex-end" orientation="row">
                            <ButtonIcon onClick={finish}>
                                <Icon name="times" color="text.primary" />
                            </ButtonIcon>

                        </Stack>

                        <div>
                            {step.content}
                        </div>

                        <Stack
                            orientation="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ padding: '8px 0px' }}
                        >
                            {
                                steps.map((step) => (
                                    <Bullet
                                        key={step.name}
                                        name={step.name}
                                        visible={step.visible}
                                    />
                                ))
                            }
                        </Stack>

                        <Stack orientation="row" justifyContent="flex-end" alignItems="center" spacing="small">
                            {
                                index !== 0 && <Button onClick={previous} variant="text">Voltar</Button>
                            }
                            {
                                index === length - 1
                                    ? <Button onClick={finish}>Fechar</Button>
                                    : <Button onClick={next}>Próximo</Button>
                            }
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
}

interface StepProps { children?: JSX.Element; name: string; }
export default function Step({ children, name }: StepProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIsInViewport(ref);
    const { current, isStarted, next, previous, steps } = useStep(name);

    const isActive = Boolean(isStarted && current?.visible);
    const index = steps.findIndex((step) => step.name === name);
    const arrayChildren = Children.toArray(children) as ChildrenElem;

    const className = joinClass([
        'ui-guide__step',
        isActive ? 'ui-guide__step--active' : ''
    ]);

    useEffect(() => { validateChildren(name, arrayChildren); }, []);
    useEffect(() => {
        if (isActive) {
            const { callback } = current;

            if (callback?.open) { callback?.open(); }

            if (!isVisible) {
                ref.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [current, isStarted]);

    return (
        <div className={className}>
            <div ref={ref} />
            {
                isActive && (
                    <Frame
                        next={next}
                        index={index}
                        step={current}
                        length={steps.length}
                        previous={previous}
                    />
                )
            }
            {children}
        </div>
    );
}