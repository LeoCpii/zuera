import { useState } from 'react';

import Icon from '@zuera/ui/components/Icon';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import type { RoleConfig } from '@zuera/services/roles';

import { useRoles } from '@zuera/common/Roles';

interface DeleteRoleModalProps { role?: RoleConfig; onToggleDrawer: () => void; }

export default function DeleteRoleModal({
    role,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeleteRoleModalProps>) {
    const { deleteRole } = useRoles();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteRole(role?.id || '')
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Deletar role</Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>Tem certeza que deseja deletar a role <strong>&quot;{role?.name}&quot;</strong>?</Typography>
            <ModalFooter>
                <Button
                    type="button"
                    variant="text"
                    color="primary"
                    onClick={onToggleModal}
                >
                    Cancelar
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    startIcon={<Icon name="trash" />}
                    loading={loading && <Loading />}
                    onClick={handleDelete}
                >
                    Deletar
                </Button>
            </ModalFooter>
        </Modal>
    );
}