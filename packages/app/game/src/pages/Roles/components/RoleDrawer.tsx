import Icon from '@zuera/ui/components/Icon';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Divider from '@zuera/ui/components/Divider';
import { useModal } from '@zuera/ui/components/Modal';
import Typography from '@zuera/ui/components/Typography';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@zuera/ui/components/Drawer';

import type { RoleConfig } from '@zuera/services/roles';

import DeleteRoleModal from './DeleteRoleModal';
import FormRoleModal from './FormRoleModal';

export default function UserDrawer({ isOpen, role, onToggleDrawer }: HelperDrawerProps<{ role?: RoleConfig }>) {
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
                                <Typography variant="h6" noMargin>{role?.name}</Typography>
                                <ButtonIcon color="text.secondary" onClick={toggleEditModal}>
                                    <Icon name="edit" />
                                </ButtonIcon>
                            </Stack>
                            <Typography variant="body2" noMargin color="text.secondary">
                                {role?.description}
                            </Typography>
                            <Divider />
                            <Typography variant="subtitle1" noMargin>
                                Permissões
                            </Typography>
                            {
                                role?.permissions.map(permission => (
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
                                deletar role
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
            <FormRoleModal
                role={role}
                isOpen={openEdit}
                onToggleModal={toggleEditModal}
            />
            <DeleteRoleModal
                role={role}
                isOpen={open}
                onToggleModal={toggleModal}
                onToggleDrawer={onToggleDrawer}
            />
        </>
    );
}