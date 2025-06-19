import { useMemo, useState } from 'react';

import Page from '@zuera/ui/layout/Page';
import { debounce } from '@zuera/ui/utils';
import { useFilter } from '@zuera/ui/hooks';
import Icon from '@zuera/ui/components/Icon';
import Stack from '@zuera/ui/components/Stack';
import Input from '@zuera/ui/components/Input';
import Slide from '@zuera/ui/animations/Slide';
import Button from '@zuera/ui/components/Button';
import Loading from '@zuera/ui/components/Loading';
import { useModal } from '@zuera/ui/components/Modal';
import { useDrawer } from '@zuera/ui/components/Drawer';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import Typography from '@zuera/ui/components/Typography';
import { Grid, GridItem } from '@zuera/ui/components/Grid';
import { Card, CardContent } from '@zuera/ui/components/Card';
import { Form, Control, FormControl, useForm } from '@zuera/ui/components/Form';
import Avatar from '@zuera/ui/components/Avatar';

import { slug } from '@zuera/toolkit/string';

import { RoleConfig } from '@zuera/services/roles';

import { useRoles } from '@zuera/common/Roles';
import { EmptyContent } from '@zuera/common/EmptyContent';

import { release } from '@/services/core';

import RoleDrawer from './components/RoleDrawer';
import FormRoleModal from './components/FormRoleModal';

export default function Roles() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { roles } = useRoles();
    const { filter, filtered, reset } = useFilter(roles, []);

    const [loadingList, setLoadingList] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState<string>();

    const selectedRole = useMemo(() => roles.find(r => r.id === selectedRoleId), [roles, selectedRoleId]);

    const [formGroup] = useForm<{ name: string; }>({
        form: {
            name: new FormControl({ defaultValue: '' }),
        },
        handle: {
            change: (form) => {
                const { name } = form.values;

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
    }, []);

    const resetForm = () => { formGroup.setValues({ name: '' }); };

    const handleSelectRole = (role: RoleConfig) => {
        setSelectedRoleId(role.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Roles"
            subtitle="Aqui você pode visualizar e gerenciar todas as roles"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Nova role
                </Button>
            }
        >
            <Stack>
                <Grid xl={3} lg={4} md={6} sm={12}>
                    <GridItem>
                        <Form formGroup={formGroup}>
                            <Control
                                action="onChange"
                                controlName="name"
                                field={(control) =>
                                    <Input
                                        fullWidth
                                        type="text"
                                        placeholder="Nome da role"
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
                        </Form>
                    </GridItem>
                </Grid>
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
                        <Grid xl={3} lg={4} md={6} sm={12}>
                            {
                                filtered.map((role, i) => (
                                    <GridItem key={role.id}>
                                        <Slide enter delay={(i + 1) * 100}>
                                            <Card onClick={() => handleSelectRole(role)}>
                                                <CardContent>
                                                    <Stack orientation="row" alignItems="center">
                                                        <Avatar icon={<Icon name="shield" />} />
                                                        <Typography noMargin variant="body1" color="text.secondary">
                                                            {role.name}
                                                        </Typography>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        </Slide>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    )
                }
                {
                    !loadingList && !filtered.length && (
                        <EmptyContent
                            icon="constructor"
                            message="Nenhuma role foi encontrada"
                        />
                    )
                }
            </Stack>
            <FormRoleModal isOpen={open} onToggleModal={toggle} />
            <RoleDrawer
                role={selectedRole}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}