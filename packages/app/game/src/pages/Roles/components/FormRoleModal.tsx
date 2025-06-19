import { useEffect, useMemo, useState } from 'react';

import Input from '@zuera/ui/components/Input';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@zuera/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';

import permissions from '@zuera/services/permissions';
import type { RoleConfig } from '@zuera/services/roles';

import { useRoles } from '@zuera/common/Roles';

import { PermissionsList } from '@/components';

export default function FormRoleModal({ role, isOpen, onToggleModal }: HelperModalProps<{ role?: RoleConfig }>) {
    const { createRole, updateRole } = useRoles();

    const [loading, setLoading] = useState(false);

    const isEdit = useMemo(() => Boolean(role), [role]);

    const [formGroup] = useForm<Omit<RoleConfig, 'id'>>({
        form: {
            name: new FormControl({ defaultValue: role?.name || '', required: true }),
            description: new FormControl({ defaultValue: role?.description || '', required: true }),
            permissions: new FormControl({ defaultValue: role?.permissions || [], required: true }),
        },
        handle: {
            submit: (form) => {
                const { name, description, permissions } = form.values;

                let promise!: Promise<void>;

                if (role) { promise = updateRole({ ...role, name, description, permissions }); }
                if (!role) { promise = createRole({ name, description, permissions }); }

                promise
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        }
    }, [role, isOpen]);

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
                            ? 'Editar role'
                            : 'Criar nova role'
                    }
                </Typography>
            }
            onClose={onToggleModal}
        >
            <Form formGroup={formGroup}>
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
                    controlName="description"
                    field={(control) => (
                        <Input
                            fullWidth
                            gutterBottom
                            placeholder="Descrição"
                            data-cy="description-role"
                            value={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />
                    )}
                />
                <Stack orientation="row" justifyContent="space-between">
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
            </Form>
        </Modal>
    );
}