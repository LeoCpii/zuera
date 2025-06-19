import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';
import Typography from '@/components/Typography';

import Modal from './Modal';
import ModalFooter from './ModalFooter';
import useModal from './useModal';

const meta: Meta<typeof Modal> = {
    title: 'components/Modal',
    component: Modal,
};

export const Component: StoryObj<typeof Modal> = {
    render: () => {
        const [isOpen, toggleModal] = useModal();

        return (
            <>
                <Button onClick={toggleModal}>Open Modal</Button>
                <Modal
                    isOpen={isOpen}
                    title={<Typography variant="h6" noMargin>Title</Typography>}
                    subtitle={<Typography variant="subtitle2" noMargin weight="normal">Subtitle</Typography>}
                    onClose={toggleModal}
                >
                    <ModalFooter>
                        <Button variant="text" color="primary" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
};

export default meta;