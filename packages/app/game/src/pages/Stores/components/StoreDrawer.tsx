import { useCallback } from 'react';

import Icon from '@zuera/ui/components/Icon';
import Stack from '@zuera/ui/components/Stack';
import Button from '@zuera/ui/components/Button';
import Avatar from '@zuera/ui/components/Avatar';
import Divider from '@zuera/ui/components/Divider';
import { useModal } from '@zuera/ui/components/Modal';
import Typography from '@zuera/ui/components/Typography';
import ButtonIcon from '@zuera/ui/components/ButtonIcon';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@zuera/ui/components/Drawer';

import type { Site } from '@zuera/services/sites';

import { url } from '@/services/core';

import Color from './Color';

export default function StoreDrawer({ isOpen, site, onToggleDrawer }: HelperDrawerProps<{ site?: Site }>) {
    const [, toggleModal] = useModal();
    const [, toggleEditModal] = useModal();;

    const goToStore = useCallback(() => {
        window.open(`${url.store}/${site?.slug}/produtos`, '_blank');
    }, [site]);

    return (
        <>
            <Drawer
                orientation="right"
                open={isOpen}
                onClose={onToggleDrawer}
                body={
                    <DrawerContent>
                        <Stack orientation="column" spacing="medium">
                            <Stack>
                                <Stack orientation="row" justifyContent="space-between">
                                    <div style={{ width: '100%' }}>
                                        <Avatar
                                            src={site?.theme.logo}
                                            name={site?.information.name}
                                            sx={{
                                                color: ({ text }) => text.secondary,
                                                backgroundColor: ({ background }) => background.paper
                                            }}
                                        />
                                    </div>
                                    <Stack
                                        orientation="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                    >
                                        <ButtonIcon color="text.secondary" onClick={toggleEditModal}>
                                            <Icon name="edit" />
                                        </ButtonIcon>
                                        <ButtonIcon color="text.secondary" onClick={goToStore}>
                                            <Icon name="external-link-alt" />
                                        </ButtonIcon>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing="small">
                                <Typography variant="subtitle1" noMargin>
                                    {site?.information.name}
                                </Typography>
                                <Typography variant="body2" noMargin>
                                    {site?.information.description}
                                </Typography>
                            </Stack>
                            <Divider />
                            <Typography variant="subtitle1" noMargin>
                                Tema
                            </Typography>
                            <Stack orientation="row">
                                <Color color={site?.theme.primaryColor || ''} />
                                <Color color={site?.theme.secondaryColor || ''} />
                            </Stack>
                            <Divider />
                            <Typography variant="subtitle1" noMargin>
                                Redes sociais
                            </Typography>
                            <Stack orientation="column">
                                {
                                    Object
                                        .entries((site?.socials || []) as Site['socials'])
                                        .map(([key, value]) => (
                                            value && (
                                                <Stack
                                                    key={key}
                                                    orientation="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Stack orientation="row" alignItems="center">
                                                        <Avatar icon={<Icon name={key} />} />
                                                        <Typography noMargin color="text.secondary">
                                                            {value}
                                                        </Typography>
                                                    </Stack>
                                                    <ButtonIcon color="info.main">
                                                        <Icon name="external-link-alt" />
                                                    </ButtonIcon>
                                                </Stack>
                                            )
                                        ))
                                }
                            </Stack>
                        </Stack>
                    </DrawerContent>
                }
                footer={
                    <DrawerFooter>
                        <Stack orientation="row" justifyContent="center">
                            <Button
                                color="error"
                                onClick={toggleModal}
                                startIcon={<Icon name="trash" />}
                            >
                                deletar loja
                            </Button>
                        </Stack>
                    </DrawerFooter>
                }
            />
        </>
    );
}