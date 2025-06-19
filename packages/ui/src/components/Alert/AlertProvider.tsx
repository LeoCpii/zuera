import React, { useState, useEffect, useMemo } from 'react';

import Alert from './Alert';
import Slide from '../../animations/Slide';
import useResize from '../../hooks/useResize';
import AlertModel, { AlertData } from './alertModel';
import AlertContext, { type IAlertContext } from './AlertContext';

import './Alert.scss';

interface AlertComponentProps { alert: AlertModel; onRemove: (alert: AlertModel) => void; }
const AlertComponent = ({ alert, onRemove }: AlertComponentProps) => {

    useEffect(() => { setTimeout(() => { onRemove(alert); }, alert.delay); }, []);

    return (
        <Alert
            icon={alert.icon}
            color={alert.color}
            variant="contained"
            sx={{
                backgroundColor: ({ text }) => text.primary,
                color: (palette) => palette[alert.color].main
            }}
            onClose={() => { onRemove(alert); }}
        >
            {alert.message}
        </Alert>
    );
};

interface AlertProviderProps { children: React.ReactNode; }
export default function AlertProvider({ children }: AlertProviderProps) {
    const [alerts, setAlerts] = useState<Array<AlertModel>>([]);
    const [isMobile, setIsMobile] = useState(false);

    const context: IAlertContext = useMemo(() => ({
        alerts,
        add: (alert) => { addAlert(alert); },
    }), [alerts]);

    const DIRECTION = isMobile ? 'top' : 'right';

    useResize({
        onXs: () => setIsMobile(true),
        onSm: () => setIsMobile(true),
        onMd: () => setIsMobile(false),
        onLg: () => setIsMobile(false),
        onXl: () => setIsMobile(false),
    }, []);

    const addAlert = (alert: AlertData) => {
        const built = new AlertModel(alert);
        setAlerts(prev => [...prev, built]);
    };

    const remove = (alert: AlertModel) => {
        setAlerts(prev => prev.map(a => {
            if (a.id === alert.id) { a.visible = false; }
            return a;
        }));
        setTimeout(() => { setAlerts(prev => prev.filter(a => a.id !== alert.id)); }, 500);
    };

    return (
        <AlertContext.Provider value={context}>
            <div className="ui-alert-container">
                {
                    alerts.map(alert => {
                        return (
                            <div key={alert.id} style={{ marginBottom: 15 }}>
                                <Slide direction={DIRECTION} enter={alert.visible}>
                                    <AlertComponent alert={alert} onRemove={remove} />
                                </Slide>
                            </div>
                        );
                    })
                }
            </div>
            {children}
        </AlertContext.Provider>
    );
}