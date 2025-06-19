import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';

import Popover from './Popover';

const meta: Meta<typeof Popover> = {
    title: 'components/Popover',
    component: Popover,
};

export const horizontal: StoryObj<typeof Popover> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Popover label="Top" direction="right">
                        <div style={{ background: 'red', height: 12, width: 50 }}></div>
                    </Popover>
                    <Popover label="Right" direction="right">
                        <div style={{ background: 'red', height: 25, width: 50 }}></div>
                    </Popover>
                    <Popover label="Bottom" direction="right">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Popover>
                    <Popover label="Left" direction="right">
                        <div style={{ background: 'red', height: 150, width: 50 }}></div>
                    </Popover>
                </Stack>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Popover label="Top" direction="left">
                        <div style={{ background: 'red', height: 12, width: 50 }}></div>
                    </Popover>
                    <Popover label="Right" direction="left">
                        <div style={{ background: 'red', height: 25, width: 50 }}></div>
                    </Popover>
                    <Popover label="Bottom" direction="left">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Popover>
                    <Popover label="Left" direction="left">
                        <div style={{ background: 'red', height: 150, width: 50 }}></div>
                    </Popover>
                </Stack>
            </>
        );
    }
};

export const verti: StoryObj<typeof Popover> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" alignItems="center">
                    <Popover label="Top" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 12 }}></div>
                    </Popover>
                    <Popover label="Right" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 25 }}></div>
                    </Popover>
                    <Popover label="Bottom" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Popover>
                    <Popover label="Left" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 150 }}></div>
                    </Popover>
                </Stack>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Popover label="Top" direction="top">
                        <div style={{ background: 'red', height: 50, width: 12 }}></div>
                    </Popover>
                    <Popover label="Right" direction="top">
                        <div style={{ background: 'red', height: 50, width: 25 }}></div>
                    </Popover>
                    <Popover label="Bottom" direction="top">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Popover>
                    <Popover label="Left" direction="top">
                        <div style={{ background: 'red', height: 50, width: 150 }}></div>
                    </Popover>
                </Stack>
            </>
        );
    }
};

export default meta;