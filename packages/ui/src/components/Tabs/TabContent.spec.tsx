import { render } from '@testing-library/react';

import TabContent from './TabContent';

describe('TabContent', () => {
    it('Should render component correctly', () => {
        const { getByTestId } = render(
            <TabContent data-testid="first-tab-content" value={1} current={1}>
                <span>Conteúdo renderizado</span>
            </TabContent>
        );

        expect(getByTestId('first-tab-content')).toBeInTheDocument();
        expect(getByTestId('first-tab-content')).toHaveTextContent('Conteúdo renderizado');
    });

    it('Should be hidden when value is different from current', () => {
        const { container } = render(
            <TabContent data-testid="second-tab-content" value={1} current={2}>
                <span>Conteúdo renderizado</span>
            </TabContent>
        );

        expect(container.firstChild).toBeNull();
    });

    it('Should not be hidden when value is equal to current', () => {
        const { getByTestId } = render(
            <TabContent data-testid="third-tab-content" value={1} current={1}>
                <span>Conteúdo renderizado</span>
            </TabContent>
        );

        expect(getByTestId('third-tab-content')).not.toHaveAttribute('hidden');
    });
});
