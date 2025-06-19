import { useState } from 'react';
type UseMenu = [
    boolean,
    HTMLElement | null,
    (event?: React.MouseEvent<HTMLButtonElement>) => void,
];

export default function useMenu(): UseMenu {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event ? event.currentTarget : null);
    };

    const handleClose = () => { setAnchorEl(null); };

    const handleToggle = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        open ? handleClose() : handleOpen(event);
    };

    return [open, anchorEl, handleToggle];
}