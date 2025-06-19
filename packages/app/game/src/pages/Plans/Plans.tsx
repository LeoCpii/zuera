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
import { Grid, GridItem } from '@zuera/ui/components/Grid';
import { Form, Control, FormControl, useForm } from '@zuera/ui/components/Form';

import { slug } from '@zuera/toolkit/string';
import { orderByIndex } from '@zuera/toolkit/array';

import { Plan } from '@zuera/services/plans';

import { EmptyContent } from '@zuera/common/EmptyContent';
import { planPriorityOrder, usePlans } from '@zuera/common/Plans';

import { release } from '@/services/core';

import PlanCard from './components/PlanCard';
import PlanDrawer from './components/PlanDrawer';
import FormPlanModal from './components/FormPlanModal';

export default function Plans() {
    const [open, toggle] = useModal();
    const [openDrawer, toggleDrawer] = useDrawer();

    const { plans } = usePlans();
    const { filter, filtered, reset } = useFilter(plans, []);

    const [selectedPlanId, setSelectedPlanId] = useState<string>();
    const [currentSearch, setCurrentSearch] = useState('');
    const [loadingList, setLoadingList] = useState(false);

    const selectedPlan = useMemo(() => {
        return plans.find(r => r.id === selectedPlanId);
    }, [plans, selectedPlanId]);

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

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlanId(plan.id);
        toggleDrawer();
    };

    return (
        <Page
            title="Planos"
            subtitle="Aqui você pode visualizar e gerenciar todos os planos"
            release={release}
            action={
                <Button
                    variant="contained"
                    startIcon={<Icon name="plus" />}
                    onClick={toggle}
                >
                    Novo plano
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
                                        placeholder="Nome do plano"
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
                            alignItems="center"
                            justifyContent="center"
                            style={{ height: 100 }}
                        >
                            <Loading />
                        </Stack>
                    )
                }
                {
                    !loadingList && !filtered.length && (
                        <EmptyContent
                            icon="file-check-alt"
                            message="Nenhum plano foi encontrado"
                        />
                    )
                }
                {
                    !loadingList && Boolean(filtered.length) && (
                        <Grid xl={3} lg={4} md={6} sm={12}>
                            {
                                orderByIndex(filtered, 'id', planPriorityOrder)
                                    .map((plan, i) => (
                                        <GridItem key={plan.id}>
                                            <Slide enter delay={(i + 1) * 100}>
                                                <PlanCard
                                                    plan={plan}
                                                    onClick={() => handleSelectPlan(plan)}
                                                />
                                            </Slide>
                                        </GridItem>
                                    ))
                            }
                        </Grid>
                    )
                }
            </Stack>

            <FormPlanModal isOpen={open} onToggleModal={toggle} />

            <PlanDrawer
                plan={selectedPlan}
                isOpen={openDrawer}
                onToggleDrawer={toggleDrawer}
            />
        </Page>
    );
}