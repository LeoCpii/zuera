import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';

import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'components/Tooltip',
    component: Tooltip,
};

export const horizontal: StoryObj<typeof Tooltip> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Tooltip label="Top" direction="right">
                        <div style={{ background: 'red', height: 12, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Right" direction="right">
                        <div style={{ background: 'red', height: 25, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Bottom" direction="right">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Left" direction="right">
                        <div style={{ background: 'red', height: 150, width: 50 }}></div>
                    </Tooltip>
                </Stack>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Tooltip label="Top" direction="left">
                        <div style={{ background: 'red', height: 12, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Right" direction="left">
                        <div style={{ background: 'red', height: 25, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Bottom" direction="left">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Left" direction="left">
                        <div style={{ background: 'red', height: 150, width: 50 }}></div>
                    </Tooltip>
                </Stack>
            </>
        );
    }
};

export const verti: StoryObj<typeof Tooltip> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" alignItems="center">
                    <Tooltip label="Top" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 12 }}></div>
                    </Tooltip>
                    <Tooltip label="Right" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 25 }}></div>
                    </Tooltip>
                    <Tooltip label="Bottom" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Left" direction="bottom">
                        <div style={{ background: 'red', height: 50, width: 150 }}></div>
                    </Tooltip>
                </Stack>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Tooltip label="Top" direction="top">
                        <div style={{ background: 'red', height: 50, width: 12 }}></div>
                    </Tooltip>
                    <Tooltip label="Right" direction="top">
                        <div style={{ background: 'red', height: 50, width: 25 }}></div>
                    </Tooltip>
                    <Tooltip label="Bottom" direction="top">
                        <div style={{ background: 'red', height: 50, width: 50 }}></div>
                    </Tooltip>
                    <Tooltip label="Left" direction="top">
                        <div style={{ background: 'red', height: 50, width: 150 }}></div>
                    </Tooltip>
                </Stack>
            </>
        );
    }
};

export default meta;