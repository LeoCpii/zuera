import React from 'react';

import Alert, { type AlertData } from './alertModel';

export interface IAlertContext {
    alerts: Array<Alert>;
    add: (alert: AlertData) => void;
}

export default React.createContext<IAlertContext>({ alerts: [], add: () => { } });