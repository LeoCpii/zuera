import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProfilePage from '@zuera/common/Profile';

import App from '@/App';
import { storage, userServices } from '@/services/core';

const RolesPage = lazy(() => import('@/pages/Roles'));
const PlansPage = lazy(() => import('@/pages/Plans'));
const UsersPage = lazy(() => import('@/pages/Users'));
const StoresPage = lazy(() => import('@/pages/Stores'));
const IntegrationsPage = lazy(() => import('@/pages/Integrations'));

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />,
            },
            {
                path: '/users',
                loader: () => document.title = 'Clube do afiliado - Usuários',
                element: (
                    <UsersPage />
                ),
            },
            {
                path: '/roles',
                loader: () => document.title = 'Clube do afiliado - Permissões',
                element: (
                    <RolesPage />
                ),
            },
            {
                path: '/plans',
                loader: () => document.title = 'Clube do afiliado - Planos',
                element: (
                    <PlansPage />
                ),
            },
            {
                path: '/integrations',
                loader: () => document.title = 'Clube do afiliado - Integrações',
                element: (
                    <IntegrationsPage />
                ),
            },
            {
                path: '/stores',
                loader: () => document.title = 'Clube do afiliado - Lojas',
                element: (
                    <StoresPage />
                ),
            },
            {
                path: '/profile',
                loader: () => document.title = 'Clube do afiliado - Meu perfil',
                element: (
                    <ProfilePage
                        storage={storage}
                        onUpdateUser={(user) => userServices.update(user)}
                    />
                ),
            },
            {
                path: '*',
                element: <Navigate to='/users' />,
            }
        ],
    }
]);
