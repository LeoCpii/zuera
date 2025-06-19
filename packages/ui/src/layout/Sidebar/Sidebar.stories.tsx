import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';

import Sidebar from './Sidebar';
import SidebarButton from './SidebarButton';

const meta: Meta<typeof Sidebar> = {
    title: 'layout/Sidebar',
    component: Sidebar,
};

export const compact: StoryObj<typeof Sidebar> = {
    render: () => {
        return (
            <Sidebar
                compact
                upButtons={
                    <>
                        <SidebarButton path="iframe.html" icon={<Icon name="home" />} />
                        <SidebarButton icon={<Icon name="users-alt" />} />
                        <SidebarButton icon={<Icon name="bitcoin-circle" />} />
                    </>
                }
                downButtons={
                    <>
                        <SidebarButton icon={<Icon name="setting" />} />
                        <SidebarButton icon={<Icon name="signout" />} />
                    </>
                }
            />
        );
    }
};

export const WithLabel: StoryObj<typeof Sidebar> = {
    render: () => {
        return (
            <Sidebar
                upButtons={
                    <>
                        <SidebarButton label="Home" path="iframe.html" icon={<Icon name="home" />} />
                        <SidebarButton label="Profile" icon={<Icon name="users-alt" />} />
                        <SidebarButton label="Bitcoin" icon={<Icon name="bitcoin-circle" />} />
                    </>
                }
                downButtons={
                    <>
                        <SidebarButton label="Settings" icon={<Icon name="setting" />} />
                        <SidebarButton label="Logout" icon={<Icon name="signout" />} />
                    </>
                }
            />
        );
    }
};

export default meta;