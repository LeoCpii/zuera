import React from 'react';
import { useMemo, useState } from 'react';

import GuideContext, { GuideContextData } from './GuideContext';
import type { StepData, StepLocalData } from './interface';

import './Guide.scss';

interface GuideProviderProps { children: React.JSX.Element; }
export default function GuideProvider({ children }: GuideProviderProps) {
    const [start, setStart] = useState(false);
    const [localSteps, setLocalSteps] = useState<StepLocalData[]>([]);

    const context: GuideContextData = useMemo(() => ({
        isStarted: start,
        steps: localSteps,
        next: () => { nextStep(); },
        finish: () => { finish(); },
        start: () => { setStart(true); },
        previous: () => { previousStep(); },
        goTo: (name: string) => { goTo(name); },
        set: (steps: StepData[]) => { updateSteps(steps); },
    }), [start, localSteps]);

    const currentStep = () => { return localSteps.findIndex((step) => step.visible); };

    const finish = () => {
        const index = currentStep();
        setStart(false);

        setLocalSteps(prev => {
            const mappedSteps = prev.map((step, i) => {
                if (i === 0) { return { ...step, visible: true }; }

                return { ...step, visible: false };
            });

            return mappedSteps;
        });

        const { callback } = localSteps[index];

        if (callback?.finish) { callback.finish(); }
    };

    const updateSteps = (steps: StepData[]) => {
        setLocalSteps(() => { return steps.map((step, i) => ({ ...step, visible: i === 0 })); });
    };

    const goTo = (name: string) => {
        const { callback } = localSteps.find((step) => step.name === name) as StepLocalData;

        if (callback?.start) { callback.start(); }

        setLocalSteps((prev) => {
            const mappedSteps = prev.map((item) => {
                if (item.name === name) { return { ...item, visible: true }; }

                return { ...item, visible: false };
            });

            return mappedSteps;
        });
    };

    const nextStep = () => {
        const index = currentStep();
        const length = localSteps.length;
        const nextIndex = index + 1;

        if (nextIndex === length) { return; }

        const { callback: previousCallback } = localSteps[nextIndex];

        if (previousCallback?.start) { previousCallback.start(); }

        setLocalSteps((prev) => {
            const mappedSteps = prev.map((step, i) => {
                if (i === index) { return { ...step, visible: false }; }
                if (i === nextIndex) { return { ...step, visible: true }; }

                return { ...step };
            });

            return mappedSteps;
        });
    };

    const previousStep = () => {
        const index = currentStep();
        const previousIndex = index - 1;

        if (previousIndex < 0) { return; }

        const { callback } = localSteps[previousIndex];

        if (callback?.start) { callback.start(); }

        setLocalSteps((prev) => {
            const mappedSteps = prev.map((step, i) => {
                if (i === index) { return { ...step, visible: false }; }
                if (i === previousIndex) { return { ...step, visible: true }; }

                return { ...step };
            });

            return mappedSteps;
        });
    };

    return (
        <GuideContext.Provider value={context}>
            {children}
            {start && <div className="ui-guide-overlay" onClick={finish} />}
        </GuideContext.Provider >
    );
}