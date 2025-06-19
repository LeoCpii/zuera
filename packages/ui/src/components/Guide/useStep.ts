import { useContext, useEffect, useState } from 'react';

import GuideContext from './GuideContext';
import { StepLocalData } from './interface';

export default function useStep(name: string) {
    const { steps, isStarted, goTo, next, previous } = useContext(GuideContext);
    const [step, setStep] = useState<StepLocalData>();

    useEffect(() => { setStep(steps.find(step => step.name === name)); }, [steps]);

    return {
        goTo,
        next,
        steps,
        previous,
        isStarted,
        current: step as StepLocalData
    };
}