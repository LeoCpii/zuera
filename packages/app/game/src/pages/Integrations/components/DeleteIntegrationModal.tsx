import { useState } from 'react';

import Icon from '@zuera/ui/components/Icon';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import type { Integration } from '@zuera/services/integrations';

import { useIntegrations } from '@zuera/common/Integrations';

interface DeleteIntegrationModalProps { integration?: Integration; onToggleDrawer: () => void; }

export default function DeleteIntegrationModal({
    integration,
    isOpen,
    onToggleModal,
    onToggleDrawer
}: HelperModalProps<DeleteIntegrationModalProps>) {
    const { deleteIntegration } = useIntegrations();

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        deleteIntegration(integration?.id || '')
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
                Tem certeza que deseja deletar a integração <strong>&quot;{integration?.name}&quot;</strong>?
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