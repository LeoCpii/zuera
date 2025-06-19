import { render } from '@testing-library/react';

import Stack from './Stack';

describe('Stack', () => {
    it('Deve renderizar corretamente o componente', () => {
        const { getByTestId } = render(
            <Stack data-testid="stack">Conteúdo renderizado</Stack>
        );

        const element = getByTestId('stack');

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('ui-stack__spacing--medium');
        expect(element).toHaveClass('ui-stack__orientation--column');
        expect(element).toHaveTextContent('Conteúdo renderizado');
    });

    it('Aplica classes adicionais corretamente', () => {
        const { getByTestId } = render(
            <Stack
                spacing="small"
                orientation="row"
                className="custom-class"
                data-testid="stack"
            >
                Conteúdo renderizado
            </Stack>
        );

        const element = getByTestId('stack');

        expect(element).toHaveClass('ui-stack');
        expect(element).toHaveClass('ui-stack__spacing--small');
        expect(element).toHaveClass('ui-stack__orientation--row');
        expect(element).toHaveClass('custom-class');
    });

    it('Aplica a classe noGap corretamente', () => {
        const { getByTestId } = render(
            <Stack
                nogap
                data-testid="stack"
            >
                Conteúdo renderizado
            </Stack>
        );

        const element = getByTestId('stack');

        expect(element).toHaveClass('ui-stack__spacing--nogap');
        expect(element).not.toHaveClass('ui-stack__spacing--medium');
    });
});