import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@zuera/ui/components/Box';
import Icon from '@zuera/ui/components/Icon';
import Slide from '@zuera/ui/animations/Slide';
import Stack from '@zuera/ui/components/Stack';
import Content from '@zuera/ui/layout/Content';
import Loading from '@zuera/ui/components/Loading';
import Tooltip from '@zuera/ui/components/Tooltip';
import { Menu, MenuButton, useMenu } from '@zuera/ui/components';
import { Sidebar, SidebarButton } from '@zuera/ui/layout/Sidebar';
import { Header, ButtonMode, ButtonProfile } from '@zuera/ui/layout/Header';
import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@zuera/ui/theme';

import { useAuth } from '@zuera/common/Auth';

import { url } from '@/services/core';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
    const navigate = useNavigate();

    const [open, el, toggle] = useMenu();
    const { theme, updateTheme } = useTheme();

    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(true);

    const themes = {
        light: themeDefaultLight,
        dark: themeDefaultDark,
    };

    useEffect(() => {
        if (user) { setLoading(false); }
    }, [user]);

    const toggleTheme = () => {
        updateTheme(createTheme(theme.palette.mode === 'dark'
            ? themes.light
            : themes.dark
        ));
    };

    const goToByMenu = () => {
        navigate('/profile');
        toggle();
    };

    const handleLogout = async () => {
        return logout()
            .then(() => window.open(url.sso, '_self'));
    };

    return (
        <Box sx={{ backgroundColor: ({ background }) => background.default }}>
            <Slide enter direction="top" timeout={.3}>
                <Header
                    actions={<ButtonMode onUpdateMode={toggleTheme} />}
                    buttonProfile={
                        <ButtonProfile
                            user={{
                                name: user?.name || '',
                                email: user?.email || '',
                                picture: user?.picture || '',
                            }}
                            onProfile={toggle}
                        />
                    }
                />
                <Menu
                    open={open}
                    anchorEl={el}
                    onClose={toggle}
                    direction="right"
                    width="fit-content"
                >
                    <MenuButton
                        justifyContent="flex-start"
                        label="Minha conta"
                        icon={<Icon name="user" />}
                        onClick={goToByMenu}
                    />
                    <MenuButton
                        label="Sair"
                        justifyContent="flex-start"
                        color="error"
                        icon={<Icon color="error.main" name="signout" />}
                        onClick={logout}
                    />
                </Menu>
            </Slide>
            <Stack orientation="row" nogap>
                <Slide enter direction="left" timeout={.3}>
                    <Sidebar
                        compact
                        upButtons={
                            <div>
                                <Tooltip label="Usuários" direction="right">
                                    <SidebarButton
                                        path="users"
                                        icon={<Icon name="users-alt" />}
                                        onClick={() => navigate('/users')}
                                    />
                                </Tooltip>
                                <Tooltip label="Lojas" direction="right">
                                    <SidebarButton
                                        path="stores"
                                        icon={<Icon name="store-alt" />}
                                        onClick={() => navigate('/stores')}
                                    />
                                </Tooltip>
                                <Tooltip label="Integrações" direction="right">
                                    <SidebarButton
                                        path="integrations"
                                        icon={<Icon name="channel" />}
                                        onClick={() => navigate('/integrations')}
                                    />
                                </Tooltip>
                                <Tooltip label="Roles" direction="right">
                                    <SidebarButton
                                        path="roles"
                                        icon={<Icon name="constructor" />}
                                        onClick={() => navigate('/roles')}
                                    />
                                </Tooltip>
                                <Tooltip label="Planos" direction="right">
                                    <SidebarButton
                                        path="plans"
                                        icon={<Icon name="file-check-alt" />}
                                        onClick={() => navigate('/plans')}
                                    />
                                </Tooltip>
                            </div>
                        }
                        downButtons={
                            <div>
                                <SidebarButton
                                    icon={<Icon name="setting" />}
                                    onClick={goToByMenu}
                                />
                                <SidebarButton
                                    icon={<Icon name="signout" />}
                                    onClick={handleLogout}
                                />
                            </div>
                        }
                    />
                </Slide>
                <Content>
                    {
                        loading
                            ? (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ height: 300 }}
                                >
                                    <Loading size={70} />
                                </Stack>
                            )
                            : children
                    }
                </Content>
            </Stack>
        </Box>
    );
}