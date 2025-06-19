import { useMemo } from 'react';

import Chip from '@zuera/ui/components/Chip';
import Icon from '@zuera/ui/components/Icon';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Divider from '@zuera/ui/components/Divider';
import Typography from '@zuera/ui/components/Typography';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import { useModal } from '@zuera/ui/components/Modal';
import { generateSupportColors, getOpacityColor } from '@zuera/ui/theme';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@zuera/ui/components/Drawer';

import type { Integration } from '@zuera/services/integrations';

import { usePlans } from '@zuera/common/Plans';

import DeleteIntegrationModal from './DeleteIntegrationModal';
import FormIntegrationsModal from './FormIntegrationsModal';

export default function UserDrawer({
    isOpen,
    integration,
    onToggleDrawer
}: HelperDrawerProps<{ integration?: Integration }>) {
    const [open, toggleModal] = useModal();
    const [openEdit, toggleEditModal] = useModal();

    const { plans } = usePlans();

    const plan = useMemo(() => plans.find(p => p.id === integration?.plan), [integration]);

    return (
        <>
            <Drawer
                orientation="right"
                open={isOpen}
                onClose={onToggleDrawer}
                body={
                    <DrawerContent>
                        <Stack orientation="column" spacing="medium">
                            <Stack orientation="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" noMargin>{integration?.name}</Typography>
                                <ButtonIcon onClick={toggleEditModal} color="text.secondary">
                                    <Icon name="edit" />
                                </ButtonIcon>
                            </Stack>
                            <Divider />
                            <Stack orientation="row" alignItems="center">
                                <Typography variant="subtitle1" noMargin>
                                    Plano:
                                </Typography>
                                <div style={{ width: 'fit-content' }}>
                                    {
                                        plan && (
                                            <Chip
                                                label={plan.name}
                                                style={{
                                                    border: 'none',
                                                    color: generateSupportColors(plan.color).dark,
                                                    background: getOpacityColor(plan.color || '#ffffff', 0.2)
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </Stack>
                            <Divider />
                            <Typography variant="subtitle1" noMargin>
                                Permissões
                            </Typography>
                            {
                                integration?.permissions.map(permission => (
                                    <Typography
                                        noMargin
                                        key={permission}
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {permission}
                                    </Typography>
                                ))
                            }
                        </Stack>
                    </DrawerContent>
                }
                footer={
                    <DrawerFooter>
                        <Stack orientation="row" justifyContent="center">
                            <Button
                                color="error"
                                onClick={toggleModal}
                                startIcon={<Icon name="trash" />}
                            >
                                deletar integração
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
            <FormIntegrationsModal
                integration={integration}
                isOpen={openEdit}
                onToggleModal={toggleEditModal}
            />
            <DeleteIntegrationModal
                integration={integration}
                isOpen={open}
                onToggleModal={toggleModal}
                onToggleDrawer={onToggleDrawer}
            />
        </>
    );
}