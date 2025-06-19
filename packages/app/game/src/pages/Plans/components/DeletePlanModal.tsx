import { useState } from 'react';

import Icon from '@zuera/ui/components/Icon';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import type { Plan } from '@zuera/services/plans';

import { usePlans } from '@zuera/common/Plans';

interface DeletePlanModalProps { integration?: Plan; onToggleDrawer: () => void; }

export default function DeletePlanModal({
    integration,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeletePlanModalProps>) {
    const { deletePlan } = usePlans();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deletePlan(integration?.id || '')
            .then(onToggleModal)
            .then(onToggleDrawer)
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>Deletar integration</Typography>
            }
            onClose={onToggleModal}
        >
            <Typography>
                Tem certeza que deseja deletar a integration <strong>&quot;{integration?.name}&quot;</strong>?
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