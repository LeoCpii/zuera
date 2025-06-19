import { useEffect, useMemo, useState } from 'react';

import Page from '@zuera/ui/layout/Page';
import Icon from '@zuera/ui/components/Icon';
import Input from '@zuera/ui/components/Input';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import { debounce } from '@zuera/ui/utils';
import { useFilter } from '@zuera/ui/hooks';
import { useModal } from '@zuera/ui/components/Modal';
import { useDrawer } from '@zuera/ui/components/Drawer';
import { Grid, GridItem } from '@zuera/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@zuera/ui/components/Form';
import { Table, TableBody, TableCell, TableHeader } from '@zuera/ui/components/Table';

import { slug } from '@zuera/toolkit/string';

import type { UserData } from '@zuera/services/user';

import { useRoles } from '@zuera/common/Roles';
import { EmptyContent } from '@zuera/common/EmptyContent';

import { release } from '@/services/core';

import useUsers from './useUsers';
import UserRow from './components/UserRow';
import UserDrawer from './components/UserDrawer';
import CreateUserModal from './components/FormUserModal';
import RolesChip from './components/RolesChip';

export interface FilterForm {
    name: string;
    roles: string[];
}

export default function Users() {
    const [open, toggle] = useModal();
    const [openUserDrawer, toggleUserDrawer] = useDrawer();

    const { users, getUsers } = useUsers();
    const { roles } = useRoles();

    const { filter, filtered, reset } = useFilter(users, []);

    const [selectedUserId, setSelectedUserId] = useState<string>();
    const [currentSearch, setCurrentSearch] = useState('');
    const [loadingList, setLoadingList] = useState(true);

    const selectedUser = useMemo(() => users.find(u => u.id === selectedUserId), [users, selectedUserId]);

    const [formGroup] = useForm<FilterForm>({
        form: {
            name: new FormControl({ defaultValue: '' }),
            roles: new FormControl({ defaultValue: roles.map(r => r.id) }),
        },
        handle: {
            change: (form) => {
                const { name, roles } = form.values;

                filter((user) => user.roles.every(role => roles.includes(role)));

                if (currentSearch === name) { return; }

                debounce.delay(() => {
                    setLoadingList(true);

                    if (name.length < 4) {
                        reset();
                    } else {
                        filter((user) => slug(user.name).includes(slug(name)));
                    }

                    setCurrentSearch(name);

                    setTimeout(() => { setLoadingList(false); }, 1000);
                }, 500);
            }
        }
    }, [roles]);

    useEffect(() => { getUsers().then(() => setLoadingList(false)); }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleOpenDrawer = (user: UserData) => {
        setSelectedUserId(user.id);
        toggleUserDrawer();
    };

    return (
        <Page
            title="Usuários"
            subtitle="Aqui você pode visualizar e gerenciar todos os usuários"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Adicionar usuário
                </Button>
            }
        >
            <Stack>
                <Form formGroup={formGroup}>
                    <Grid xl={3} lg={4} md={6} sm={12} alignItems="center">
                        <GridItem>
                            <Control
                                action="onChange"
                                controlName="name"
                                field={(control) =>
                                    <Input
                                        fullWidth
                                        type="text"
                                        placeholder="Nome do usuário"
                                        startIcon={<Icon name="search" />}
                                        endIcon={
                                            control.value && (
                                                <ButtonIcon onClick={resetForm}>
                                                    <Icon name="times" />
                                                </ButtonIcon>
                                            )
                                        }
                                        value={control.value}
                                        error={control.isInvalid}
                                        helperText={control.messageError}
                                    />
                                }
                            />
                        </GridItem>
                        <GridItem>
                            <RolesChip />
                        </GridItem>
                    </Grid>
                </Form>
                {
                    loadingList && (
                        <Stack
                            orientation="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ height: 250 }}
                        >
                            <Loading size={50} />
                        </Stack>
                    )
                }
                {
                    !loadingList && Boolean(filtered.length) && (
                        <Table>
                            <TableHeader>
                                <TableCell style={{ width: 50 }}>Id</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell style={{ width: 200 }}>Roles</TableCell>
                                <TableCell align="center" style={{ width: 50 }}>Detalhes</TableCell>
                            </TableHeader>
                            <TableBody>
                                {
                                    filtered.map((user, i) => (
                                        <UserRow
                                            key={user.id}
                                            user={user}
                                            index={i}
                                            onView={handleOpenDrawer}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </Stack>
            {
                !loadingList && !filtered.length && (
                    <EmptyContent
                        message="Nenhum usuário encontrado"
                        icon="user-exclamation"
                    />
                )
            }
            <UserDrawer
                user={selectedUser}
                isOpen={openUserDrawer}
                onToggleDrawer={toggleUserDrawer}
            />
            <CreateUserModal
                isOpen={open}
                onToggleModal={toggle}
            />
        </Page>
    );
}