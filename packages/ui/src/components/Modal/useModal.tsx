import { useState } from 'react';

interface UseModalProps { open?: boolean; }
export default function useModal({ open = false }: UseModalProps = {}): [boolean, () => void] {
    const [_open, setOpen] = useState(open);

    const toggle = () => setOpen((prev) => !prev);

    return [_open, toggle];
};