import { render } from '@testing-library/react';

import Typography from './Typography';

describe('Typography', () => {
    it('Deve renderizar corretamente o componente', () => {
        const { getByTestId } = render(
            <Typography data-testid="text">Conteúdo renderizado</Typography>
        );

        const element = getByTestId('text');

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Conteúdo renderizado');
    });

    it('Usa a tag correta para o variant "h2"', () => {
        const { getByTestId } = render(
            <Typography variant="h2" data-testid="text">Conteúdo renderizado</Typography>
        );

        const element = getByTestId('text');

        expect(element.tagName).toBe('H2');
        expect(element).toHaveClass('ui-typography--h2');
    });

    it('Aplica classes adicionais corretamente', () => {
        const { getByTestId } = render(
            <Typography
                noMargin
                gutterBottom
                variant="body2"
                weight="bold"
                className="custom-class"
                data-testid="text"
            >
                Conteúdo renderizado
            </Typography>
        );

        const element = getByTestId('text');

        expect(element).toHaveClass('ui-typography');
        expect(element).toHaveClass('ui-typography--body2');
        expect(element).toHaveClass('ui-typography--no-margin');
        expect(element).toHaveClass('ui-typography--weight-bold');
        expect(element).toHaveClass('ui-typography--gutter-bottom');
        expect(element).toHaveClass('custom-class');
    });
});