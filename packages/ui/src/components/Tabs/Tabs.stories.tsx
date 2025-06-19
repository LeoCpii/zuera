import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';

import Tabs from './Tabs';
import Tab from './TabButton';
import useTabs from './useTabs';
import TabContent from './TabContent';

const meta: Meta<typeof Tabs> = {
    title: 'components/Tabs',
    component: Tabs,
};

export const Line: StoryObj<typeof Tabs> = {
    render: () => {
        const { current, setTab } = useTabs(0);

        return (
            <>
                <Tabs onChange={setTab} current={current}>
                    <Tab label="Tab 1" icon={<Icon name="sun" />} />
                    <Tab label="Tab 2" icon={<Icon name="moon" />} />
                    <Tab label="Tab 3" icon={<Icon name="star" />} />
                </Tabs>
                <TabContent current={current} value={0}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={1}>
                    <p>BBBBBBBBB</p>
                </TabContent>
                <TabContent current={current} value={2}>
                    <p>CCCCCCCCC</p>
                </TabContent>
            </>
        );
    }
};

export const LineDisabled: StoryObj<typeof Tabs> = {
    render: () => {
        const { current, setTab } = useTabs(0);

        return (
            <>
                <Tabs onChange={setTab} current={current}>
                    <Tab label="Tab 1" icon={<Icon name="sun" />} disabled />
                    <Tab label="Tab 2" icon={<Icon name="moon" />} />
                    <Tab label="Tab 3" icon={<Icon name="star" />} />
                </Tabs>
                <TabContent current={current} value={0}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={1}>
                    <p>BBBBBBBBB</p>
                </TabContent>
                <TabContent current={current} value={2}>
                    <p>CCCCCCCCC</p>
                </TabContent>
            </>
        );
    }
};

export const Rounded: StoryObj<typeof Tabs> = {
    render: () => {
        const { current, setTab } = useTabs(0);

        return (
            <>
                <Tabs onChange={setTab} current={current} variant="rounded">
                    <Tab label="Tab 1" icon={<Icon name="sun" />} />
                    <Tab label="Tab 2" icon={<Icon name="moon" />} />
                    <Tab label="Tab 3" icon={<Icon name="star" />} />
                    <Tab label="Tab 4" icon={<Icon name="sun" />} />
                    <Tab label="Tab 5" icon={<Icon name="moon" />} />
                </Tabs>
                <TabContent current={current} value={0}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={1}>
                    <p>BBBBBBBBB</p>
                </TabContent>
                <TabContent current={current} value={2}>
                    <p>CCCCCCCCC</p>
                </TabContent><TabContent current={current} value={3}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={4}>
                    <p>BBBBBBBBB</p>
                </TabContent>
            </>
        );
    }
};

export const RoundedDisabled: StoryObj<typeof Tabs> = {
    render: () => {
        const { current, setTab } = useTabs(0);

        return (
            <>
                <Tabs onChange={setTab} current={current} variant="rounded">
                    <Tab label="Tab 1" icon={<Icon name="sun" />} disabled />
                    <Tab label="Tab 2" icon={<Icon name="moon" />} />
                    <Tab label="Tab 3" icon={<Icon name="star" />} />
                    <Tab label="Tab 4" icon={<Icon name="sun" />} />
                    <Tab label="Tab 5" icon={<Icon name="moon" />} />
                </Tabs>
                <TabContent current={current} value={0}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={1}>
                    <p>BBBBBBBBB</p>
                </TabContent>
                <TabContent current={current} value={2}>
                    <p>CCCCCCCCC</p>
                </TabContent><TabContent current={current} value={3}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={4}>
                    <p>BBBBBBBBB</p>
                </TabContent>
            </>
        );
    }
};

export const WithScrollInto: StoryObj<typeof Tabs> = {
    render: () => {
        const { current, setTab } = useTabs(1);

        return (
            <>
                <Tabs onChange={setTab} current={current}>
                    <Tab label="Some text to Tab 1" />
                    <Tab label="Some text to Tab 2" />
                    <Tab label="Some text to Tab 3" />
                </Tabs>
                <TabContent current={current} value={0}>
                    <p>AAAAAAAAA</p>
                </TabContent>
                <TabContent current={current} value={1}>
                    <p>BBBBBBBBB</p>
                </TabContent>
                <TabContent current={current} value={2}>
                    <p>CCCCCCCCC</p>
                </TabContent>
            </>
        );
    }
};

export default meta;
