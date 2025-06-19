import { fireEvent, render } from '@testing-library/react';

import Tabs from './Tabs';
import Tab from './TabButton';
import TabContent from './TabContent';

describe('Tabs', () => {

    window.HTMLElement.prototype.scrollIntoView = function () { };
    it('Should render component correctly', () => {
        const { getByTestId } = render(
            <Tabs data-testid="tabs">
                <Tab label="Primeira Aba" />
                <Tab label="Segunda Aba" />
                <Tab label="Terceira Aba" />
                <Tab label="Quarta Aba" />
            </Tabs>
        );

        expect(getByTestId('tabs')).toBeInTheDocument();
    });

    it('Should render tabs with correct label', () => {
        const tabs = render(
            <Tabs>
                <Tab label="Primeira Aba" />
                <Tab label="Segunda Aba" />
            </Tabs>
        );

        expect(tabs.container).toHaveTextContent('Primeira Aba');
        expect(tabs.container).toHaveTextContent('Segunda Aba');
    });

    it('Should render active tab with highlight', () => {
        const { getByTestId } = render(
            <Tabs>
                <Tab label="Primeira Aba" data-testid="first-tab-button" />
                <Tab label="Segunda Aba" data-testid="second-tab-button" />
            </Tabs>
        );

        const firstTab = getByTestId('first-tab-button');
        expect(firstTab.className).toMatch(/active/);

        const secondTab = getByTestId('second-tab-button');
        fireEvent.click(secondTab);

        expect(secondTab.className).toMatch(/active/);
        expect(firstTab.className).not.toMatch(/active/);
    });

    it('Should render tab content correctly', () => {
        const { getByTestId, queryByTestId } = render(
            <>
                <Tabs>
                    <Tab label="Primeira Aba" data-testid="first-tab-button" />
                    <Tab label="Segunda Aba" data-testid="second-tab-button" />
                </Tabs>

                <TabContent value={1} current={1} data-testid="first-tab-content">
                    <span>Primeira Aba</span>
                </TabContent>
                <TabContent value={2} current={1} data-testid="second-tab-content">
                    <span>Segunda Aba</span>
                </TabContent>
            </>
        );

        const firstTab = getByTestId('first-tab-content');
        const secondTab = queryByTestId('second-tab-content');

        expect(firstTab).toHaveTextContent('Primeira Aba');
        expect(firstTab).toBeInTheDocument();
        expect(secondTab).not.toBeInTheDocument();
    });
});
