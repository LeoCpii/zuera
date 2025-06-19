import { cloneElement, CSSProperties, PropsWithChildren, useState } from 'react';

import { useResize } from '../../hooks';
import Slide from '../../animations/Slide';
import Loading from '../../components/Loading';
import Typography from '../../components/Typography';
import { ButtonProps } from '../../components/Button';
import Stack, { type Orientation } from '../../components/Stack';

import './Page.scss';

export interface BaseProps extends PropsWithChildren {
    title?: string;
    release?: string;
    loading?: boolean;
    subtitle?: string;
    action?: React.JSX.Element;
    backAction?: React.JSX.Element;
};
export default function BasePage({
    title,
    action,
    release,
    loading,
    subtitle,
    backAction,
    children
}: BaseProps) {
    const [{ orientation, align, fullWidth }, setPreferences] = useState<{
        orientation: Orientation; align: CSSProperties['alignItems'], fullWidth: boolean;
    }>({ align: 'center', orientation: 'row', fullWidth: false });

    useResize({
        onXs: () => setPreferences({ orientation: 'column', align: 'baseline', fullWidth: true }),
        onSm: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
        onMd: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
        onLg: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
        onXl: () => setPreferences({ orientation: 'row', align: 'center', fullWidth: false }),
    }, []);

    const renderAction = (actionButton: React.JSX.Element) => {
        return cloneElement<ButtonProps>(actionButton, {
            fullWidth,
            disabled: loading,
        });
    };

    return (
        <Stack
            justifyContent="space-between"
            className="ui-page-container"
            style={{ height: '100%', flexWrap: 'nowrap' }}
        >
            <Slide enter direction="top">
                <div>
                    {backAction}
                    <Stack
                        sx={{ mb: 4 }}
                        alignItems={align}
                        orientation={orientation}
                        justifyContent="space-between"
                    >
                        {
                            (title || subtitle) && (
                                <Stack orientation="row" alignItems="center" style={{ width: 'auto' }}>
                                    <div>
                                        {
                                            title && (
                                                <Typography variant="h5" noMargin>{title}</Typography>
                                            )
                                        }
                                        {
                                            subtitle && (
                                                <Typography
                                                    noMargin
                                                    weight="normal"
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                >
                                                    {subtitle}
                                                </Typography>
                                            )
                                        }
                                    </div>
                                </Stack>
                            )
                        }

                        {action && renderAction(action as React.JSX.Element)}
                    </Stack>
                    {
                        loading ? (
                            <Stack justifyContent="center" alignItems="center" className="ui-page__loading-container">
                                <Loading size={70} />
                            </Stack>
                        ) : children
                    }
                </div>
            </Slide>

            {
                release && (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{ color: ({ text }) => text.secondary }}
                    >
                        <span>Versão: {release}</span>
                    </Stack>
                )
            }
        </Stack>
    );
}