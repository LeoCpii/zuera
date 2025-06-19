import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';

import Drawer from './Drawer';
import useDrawer from './useDrawer';
import DrawerFooter from './DrawerFooter';
import DrawerContent from './DrawerContent';
import Stack from '../Stack';

const meta: Meta<typeof Drawer> = {
    title: 'components/Drawer',
    component: Drawer,
};

export const WithOrientationRight: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer
                    orientation="right"
                    open={open}
                    onClose={toggle}
                    body={
                        <DrawerContent>
                            AAAA
                        </DrawerContent>
                    }
                />
            </div>
        );
    }
};

export const WithOrientationLeft: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer
                    orientation="left"
                    open={open}
                    onClose={toggle}
                    body={
                        <DrawerContent>
                            AAAA
                        </DrawerContent>
                    }
                />
            </div>
        );
    }
};

export const WithFooter: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer
                    open={open}
                    orientation="right"
                    onClose={toggle}
                    body={
                        <DrawerContent>
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                            AAAA
                            <br />
                        </DrawerContent>
                    }
                    footer={
                        <DrawerFooter>
                            <Stack orientation="row" justifyContent="flex-end">
                                <Button color="error">Button 1</Button>
                                <Button>Button 2</Button>
                            </Stack>
                        </DrawerFooter>
                    }
                />
            </div>
        );
    }
};

export const WithOrientationBottom: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer
                    open={open}
                    orientation="bottom"
                    onClose={toggle}
                    body={
                        <DrawerContent>
                            AAAA
                        </DrawerContent>
                    }
                />
            </div>
        );
    }
};

export default meta;
