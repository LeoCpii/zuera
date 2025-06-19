import type { HTMLAttributes } from 'react';

import Box from '../../components/Box';
import { joinClass } from '../../utils';

import './Content.scss';

interface ContentProps extends HTMLAttributes<HTMLElement> { children: React.ReactNode; fullwidth?: boolean; }
export default function Content({ fullwidth, children, ...props }: ContentProps) {
    return (
        <Box
            className={joinClass([fullwidth ? 'ui-content-fullwidth' : 'ui-content'])}
            sx={{ backgroundColor: ({ background }) => background.paper }}
            {...props}
        >
            {children}
        </Box>
    );
}