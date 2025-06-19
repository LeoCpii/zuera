import Icon from '@zuera/ui/components/Icon';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Divider from '@zuera/ui/components/Divider';
import { useModal } from '@zuera/ui/components/Modal';
import Typography from '@zuera/ui/components/Typography';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@zuera/ui/components/Drawer';
import Chip from '@zuera/ui/components/Chip';

import { maskCurrency } from '@zuera/toolkit/mask';

import type { Plan } from '@zuera/services/plans';

import Dot from './Dot';
import DeletePlanModal from './DeletePlanModal';
import FormPlansModal from './FormPlanModal';

export default function PlanDrawer({
    isOpen,
    plan,
    onToggleDrawer
}: HelperDrawerProps<{ plan?: Plan }>) {
    const [open, toggleModal] = useModal();
    const [openEdit, toggleEditModal] = useModal();

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
                                <Stack orientation="row" alignItems="center">
                                    <Typography variant="h6" noMargin>{plan?.name}</Typography>
                                    <Dot color={plan?.color || ''} />
                                </Stack>
                                <ButtonIcon color="text.secondary" onClick={toggleEditModal}>
                                    <Icon name="edit" />
                                </ButtonIcon>
                            </Stack>
                            <Typography variant="body2" noMargin color="text.secondary">
                                {plan?.description}
                            </Typography>
                            <div style={{ width: 'fit-content' }}>
                                <Chip
                                    label={maskCurrency(plan?.price)}
                                    color="success"
                                    icon={
                                        <Icon name="usd-circle" />
                                    }
                                />
                            </div>
                            <Divider />
                            <Typography variant="subtitle1" noMargin>
                                Permissões
                            </Typography>
                            {
                                plan?.permissions.map(permission => (
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
                                deletar plano
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
            <FormPlansModal
                plan={plan}
                isOpen={openEdit}
                onToggleModal={toggleEditModal}
            />
            <DeletePlanModal
                integration={plan}
                isOpen={open}
                onToggleModal={toggleModal}
                onToggleDrawer={onToggleDrawer}
            />
        </>
    );
}