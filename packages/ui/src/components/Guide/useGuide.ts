import { useContext, useEffect } from 'react';

import GuideContext from './GuideContext';
import type { StepData } from './interface';

export default function useGuide(steps: StepData[]) {
    const { set, start } = useContext(GuideContext);

    if (!set) { throw new Error('useGuide must be used within a GuideProvider'); }

    useEffect(() => { set(steps); }, []);

    return { start };
}