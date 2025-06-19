import { useEffect, useMemo, useState } from 'react';

import Input from '@zuera/ui/components/Input';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import Typography from '@zuera/ui/components/Typography';
import { Form, FormControl, useForm, Control } from '@zuera/ui/components/Form';
import { Modal, ModalFooter, HelperModalProps } from '@zuera/ui/components/Modal';
import Divider from '@zuera/ui/components/Divider';

import type { UserData } from '@zuera/services/user';

import { useAuth } from '@zuera/common/Auth';

import RoleList from '@/components/RolesList';
import PlanList from '@/components/PlansList';

import useUsers from '../useUsers';

export default function FormUserModal({
    user,
    isOpen,
    onToggleModal
}: HelperModalProps<{ user?: UserData; }>) {
    const { updateUser, getUsers } = useUsers();

    const { createByBackoffice } = useAuth();

    const [loading, setLoading] = useState(false);

    const isEdit = useMemo(() => Boolean(user), [user]);

    const [formGroup] = useForm<Pick<UserData, 'name' | 'email' | 'roles' | 'plans'>>({
        form: {
            name: new FormControl({ defaultValue: user?.name || '', required: true }),
            email: new FormControl({ defaultValue: user?.email || '', required: true }),
            roles: new FormControl({ defaultValue: user?.roles || [], required: true }),
            plans: new FormControl({ defaultValue: user?.plans || [], required: true }),
        },
        handle: {
            submit: (form) => {
                let promise!: Promise<any>;

                if (user) { promise = updateUser({ ...user, ...form.values }); }
                if (!user) {
                    promise = createByBackoffice({ ...form.values })
                        .then(getUsers);
                }

                promise
                    .then(onToggleModal)
                    .finally(() => setLoading(false));
            }
        }
    }, [isOpen, user]);

    useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            title={
                <Typography variant="h6" noMargin>
                    {
                        isEdit
                            ? 'Editar usuário'
                            : 'Adicionar usuário'
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
                            placeholder="Nome"
                            data-cy="name-user-backoffice"
                            value={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />
                    )}
                />
                <Control
                    controlName="email"
                    field={(control) => (
                        <Input
                            fullWidth
                            gutterBottom
                            disabled={isEdit}
                            placeholder="Email"
                            data-cy="email-user-backoffice"
                            value={control.value}
                            error={control.isInvalid}
                            helperText={control.messageError}
                        />
                    )}
                />
                <Typography noMargin variant="body1" color="text.secondary">Planos</Typography>
                <div style={{ maxHeight: 400, overflow: 'auto' }}>
                    <Control
                        type="object"
                        controlName="plans"
                        field={(control) => (
                            <PlanList value={control.value} />
                        )}
                    />
                </div>
                <Divider />
                <Typography noMargin variant="body1" color="text.secondary">Roles</Typography>
                <div style={{ maxHeight: 400, overflow: 'auto' }}>
                    <Control
                        type="object"
                        controlName="roles"
                        field={(control) => (
                            <RoleList value={control.value} />
                        )}
                    />
                </div>
                <ModalFooter>
                    <Button
                        type="button"
                        variant="outlined"
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
                        Salvar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}