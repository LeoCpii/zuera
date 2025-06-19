import { createContext } from 'react';

import type { StepData, StepLocalData } from './interface';

export interface GuideContextData {
    isStarted: boolean;
    next: () => void;
    start: () => void;
    finish: () => void;
    previous: () => void;
    goTo: (name: string) => void;
    steps: StepLocalData[];
    set: (steps: StepData[]) => void;
}

export default createContext<GuideContextData>({
    steps: [],
    isStarted: false,
    set: () => null,
    next: () => null,
    goTo: () => null,
    start: () => null,
    finish: () => null,
    previous: () => null,
});