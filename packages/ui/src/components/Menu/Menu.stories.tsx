import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Menu from './Menu';
import useMenu from './useMenu';
import MenuButton from './MenuButton';

const meta: Meta<typeof Menu> = {
    title: 'components/Menu',
    component: Menu,
};

export const Left: StoryObj<typeof Menu> = {
    render: () => {
        const [open, el, toggle] = useMenu();

        return (
            <Stack alignItems="center">
                <Button onClick={toggle}>Toggle</Button>
                <Menu direction="left" anchorEl={el} open={open} onClose={toggle} width="fit-content">
                    <MenuButton label="Option 1" />
                    <MenuButton label="Option 2" />
                    <MenuButton label="Option 3" />
                </Menu>
            </Stack>
        );
    }
};

export const Right: StoryObj<typeof Menu> = {
    render: () => {
        const [open, el, toggle] = useMenu();

        return (
            <Stack alignItems="center">
                <Button onClick={toggle}>Toggle</Button>
                <Menu direction="right" anchorEl={el} open={open} onClose={toggle} width="fit-content">
                    <MenuButton label="Option 1" />
                    <MenuButton label="Option 2" />
                    <MenuButton label="Option 3" />
                </Menu>
            </Stack>
        );
    }
};

export const Center: StoryObj<typeof Menu> = {
    render: () => {
        const [open, el, toggle] = useMenu();

        return (
            <Stack alignItems="center">
                <Button onClick={toggle}>Toggle</Button>
                <Menu direction="center" anchorEl={el} open={open} onClose={toggle} width="fit-content">
                    <MenuButton label="Option 1" />
                    <MenuButton label="Option 2" />
                    <MenuButton label="Option 3" />
                </Menu>
            </Stack>
        );
    }
};

export const SameWidthTheTarget: StoryObj<typeof Menu> = {
    render: () => {
        const [open, el, toggle] = useMenu();

        return (
            <Stack alignItems="center">
                <Button onClick={toggle}>Toggle Menu</Button>
                <Menu direction="center" anchorEl={el} open={open} onClose={toggle}>
                    <MenuButton label="Option 1" />
                    <MenuButton label="Option 2" />
                    <MenuButton label="Option 3" />
                </Menu>
            </Stack>
        );
    }
};

export default meta;