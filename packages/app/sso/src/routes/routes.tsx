import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Signin from '@/pages/Signin';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/signin' />,
            },
            {
                path: '/signin',
                loader: () => document.title = 'Zuera - Login',
                element: <Signin />,
            },
            {
                path: '*',
                element: <Navigate to='/signin' />,
            }
        ]
    },
]);
