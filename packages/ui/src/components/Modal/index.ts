export { default as Modal } from './Modal';
export { default as useModal } from './useModal';
export { default as ModalFooter } from './ModalFooter';

export type HelperModalProps<T = unknown> = {
    isOpen: boolean;
    onToggleModal: () => void;
} & T;