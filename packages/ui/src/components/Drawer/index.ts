export { default as Drawer } from './Drawer';
export { default as useDrawer } from './useDrawer';
export { default as DrawerFooter } from './DrawerFooter';
export { default as DrawerContent } from './DrawerContent';

export type HelperDrawerProps<T = unknown> = {
    isOpen: boolean;
    onToggleDrawer: () => void;
} & T;