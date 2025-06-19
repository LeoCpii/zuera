import { useMemo, useState } from 'react';

import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import { UserData } from '@zuera/services/user';

import useUsers from '../useUsers';

interface StatusUserModalProps { user?: UserData; onToggleDrawer: () => void; }

export default function StatusUserModal({
    user,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<StatusUserModalProps>) {
    const { updateUser } = useUsers();

    const [loading, setLoading] = useState(false);

    const isActive = useMemo(() => user?.status === 'active', [user]);

    const handleChangeStatus = () => {
        setLoading(true);

        if (!user) { return; }

        updateUser({ ...user, status: isActive ? 'inactive' : 'active' })
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    {
                        isActive
                            ? 'Desativar usuário'
                            : 'Ativar usuário'
                    }
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>
                Tem certeza que deseja
                {isActive ? ' desativar ' : ' ativar '}
                o usuário <strong>&quot;{user?.name}&quot;?</strong>
            </Typography>
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
                    color={isActive ? 'error' : 'success'}
                    variant="contained"
                    loading={loading && <Loading />}
                    onClick={handleChangeStatus}
                >
                    {isActive ? 'Desativar' : 'Ativar'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}