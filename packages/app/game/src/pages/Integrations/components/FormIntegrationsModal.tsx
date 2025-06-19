import { useEffect, useMemo, useState } from 'react';

import Input from '@zuera/ui/components/Input';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Select, Option } from '@zuera/ui/components/Select';
import { Form, FormControl, useForm, Control } from '@zuera/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import permissions from '@zuera/services/permissions';
import type { Integration } from '@zuera/services/integrations';

import { useIntegrations } from '@zuera/common/Integrations';
import { usePlans } from '@zuera/common/Plans';

import { PermissionsList } from '@/components';

export default function FormIntegrationModal({
    integration,
    isOpen,
    onToggleModal
}: HelperModalProps<{ integration?: Integration }>) {
    const { plans } = usePlans();
    const { createIntegration, updateIntegration } = useIntegrations();

    const [loading, setLoading] = useState(false);

    const isEdit = useMemo(() => Boolean(integration), [integration]);

    const [formGroup] = useForm<Omit<Integration, 'id'>>({
        form: {
            name: new FormControl({ defaultValue: integration?.name || '', required: true }),
            plan: new FormControl({ defaultValue: integration?.plan || '', required: true }),
            image: new FormControl({ defaultValue: integration?.image || '', required: true }),
            permissions: new FormControl({ defaultValue: integration?.permissions || [], required: true }),
        },
        handle: {
            submit: (form) => {
                const { name, permissions, image, plan } = form.values;

                let promise!: Promise<void>;

                if (integration) { promise = updateIntegration({ ...integration, image, plan, permissions }); }
                if (!integration) { promise = createIntegration({ name, image, permissions, plan }); }

                promise
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        },
        validator: {
            image: (form) => {
                const { image } = form.values;
                // eslint-disable-next-line
                const regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

                if (!regex.test(image)) { return 'Insira uma url válida'; }

                return;
            }
        }
    }, [integration]);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    const handleSelectAll = () => {
        formGroup.setValues({ permissions: permissions as any[] });
    };

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    {
                        isEdit
                            ? 'Editar integração'
                            : 'Criar nova integração'
                    }
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
                <Stack spacing="small">
                    <Control
                        controlName="name"
                        field={(control) => (
                            <Input
                                fullWidth
                                gutterBottom
                                disabled={isEdit}
                                placeholder="Nome"
                                data-cy="name-role"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Control
                        controlName="image"
                        field={(control) => (
                            <Input
                                fullWidth
                                gutterBottom
                                placeholder="Url da imagem"
                                data-cy="image-role"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />
                        )}
                    />
                    <Control controlName="plan"
                        field={(control) => (
                            <Select fullWidth autoClose placeholder="Selecione um valor" value={control.value}>
                                {
                                    plans.map(plan => (
                                        <Option key={plan.id} value={plan.id}>{plan.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    />
                    <Stack orientation="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Typography noMargin variant="body1" color="text.secondary">Permissões</Typography>
                        <Button
                            size="small"
                            type="button"
                            variant="text"
                            onClick={handleSelectAll}
                        >
                            Selecionar tudo
                        </Button>
                    </Stack>
                    <div style={{ maxHeight: 400, overflow: 'auto' }}>
                        <Control
                            type="object"
                            controlName="permissions"
                            field={(control) => (
                                <PermissionsList value={control.value} />
                            )}
                        />
                    </div>
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
                            type="submit"
                            variant="contained"
                            loading={loading && <Loading />}
                        >
                            {isEdit ? 'Salvar' : 'Criar'}
                        </Button>
                    </ModalFooter>
                </Stack>
            </Form>
        </Modal>
    );
}