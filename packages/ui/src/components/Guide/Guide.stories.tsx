import { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Step from './Step';
import useGuide from './useGuide';
import GuideProvider from './GuideProvider';

const meta: Meta<typeof GuideProvider> = {
    title: 'components/Guide'
};

function Bullet({ background }: { background: CSSProperties['color'] }) {
    return (
        <div style={{
            width: 150,
            height: 150,
            padding: 10,
            background,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <button>TESTE</button>
        </div>
    );
}

function Content() {
    const { start } = useGuide([
        {
            name: 'step1',
            content: <div>
                <span>Passo 1:</span>
                <br />

                <span>Bem vindo ao tour</span>
            </div>,
            orientation: {
                horizontal: 'right',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 1'); }
            }
        },
        {
            name: 'step2',
            content: <div>
                <span>Passo 2:</span>
                <br />

                <span>Vamos te apresentar a aplicação</span>
            </div>,
            orientation: {
                horizontal: 'left',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 2'); }
            }
        },
        {
            name: 'step3',
            content: <div>
                <span>Passo 3:</span>
                <br />
                <span>é Simples e fácil</span>
            </div>,
            orientation: {
                horizontal: 'center',
                vertical: 'center'
            },
            callback: {
                start: () => { console.debug('callback 3'); }
            }
        },
        {
            name: 'step4',
            content: <div>
                <span>Passo 4:</span>

                <span>Até mais!</span>
            </div>,
            orientation: {
                horizontal: 'right',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 4'); }
            }
        }
    ]);

    const startTour = () => { start(); };

    return (
        <div>
            <button style={{ position: 'fixed', bottom: 30, right: 30 }} onClick={startTour}>Start Tour</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Step name="step1">
                    <Bullet background="purple" />
                </Step>
                <Step name="step2">
                    <Bullet background="blue" />
                </Step>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Step name="step3">
                    <Bullet background="cyan" />
                </Step>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div style={{ width: 'fit-content' }}>
                <Step name="step4">
                    <Bullet background="orange" />
                </Step>
            </div>
        </div>
    );
}

export const Template: StoryObj<typeof GuideProvider> = {
    render: () => {
        return (
            <GuideProvider>
                <Content />
            </GuideProvider>
        );
    }
};

export default meta;