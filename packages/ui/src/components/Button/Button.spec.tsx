import { render } from '@testing-library/react';

import Button from './Button';

const IDENTIFIER = 'button';

describe('Button', () => {
    it('Deve renderizar corretamente o componente', () => {
        const { getByTestId } = render(
            <Button data-testid={IDENTIFIER}>Conteúdo renderizado</Button>
        );

        const element = getByTestId(IDENTIFIER);

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Conteúdo renderizado');
        expect(element).toHaveClass('ui-button');
        expect(element).toHaveClass('ui-button--medium');
        expect(element).toHaveClass('ui-button--primary');
        expect(element).toHaveClass('ui-button--primary--contained');
        expect(element).not.toHaveClass('ui-button--noHover');
        expect(element).not.toHaveClass('ui-button--fullWidth');
    });

    it('Aplica classes adicionais corretamente', () => {
        const { getByTestId } = render(
            <Button
                noHover
                fullWidth
                size="small"
                color="secondary"
                variant="outlined"
                className="custom-class"
                data-testid={IDENTIFIER}
            >
                Conteúdo renderizado
            </Button>
        );

        const element = getByTestId(IDENTIFIER);

        expect(element).toHaveClass('ui-button');
        expect(element).toHaveClass('ui-button--small');
        expect(element).toHaveClass('ui-button--secondary');
        expect(element).toHaveClass('ui-button--secondary--outlined');
        expect(element).toHaveClass('custom-class');
        expect(element).toHaveClass('ui-button--noHover');
        expect(element).toHaveClass('ui-button--fullWidth');
    });
});