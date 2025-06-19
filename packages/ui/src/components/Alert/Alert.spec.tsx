import { render } from '@testing-library/react';

import Alert from './Alert';
import Icon from '../Icon';

const IDENTIFIER = 'alert';

describe('Alert', () => {
    it('Deve renderizar corretamente o componente', () => {
        const { getByTestId } = render(
            <Alert data-testid={IDENTIFIER}>Conteúdo renderizado</Alert>
        );

        const element = getByTestId(IDENTIFIER);

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Conteúdo renderizado');
        expect(element).toHaveClass('ui-alert');
        expect(element).toHaveClass('ui-alert--primary');
        expect(element).toHaveClass('ui-alert--primary--contained');
    });

    it('Aplica classes adicionais corretamente', () => {
        const { getByTestId } = render(
            <Alert
                fullWidth
                color="secondary"
                variant="opacity"
                className="custom-class"
                data-testid={IDENTIFIER}
            >
                Conteúdo renderizado
            </Alert>
        );

        const element = getByTestId(IDENTIFIER);

        expect(element).toHaveClass('ui-alert');
        expect(element).toHaveClass('ui-alert--secondary');
        expect(element).toHaveClass('ui-alert--secondary--opacity');
        expect(element).toHaveClass('custom-class');
        expect(element).toHaveClass('ui-alert--fullWidth');
    });

    it('Deve renderizar o icone', () => {
        const { getByTestId } = render(
            <Alert
                data-testid={IDENTIFIER}
                icon={
                    <Icon name="star" data-testid="icon" />
                }
            >
                Conteúdo renderizado
            </Alert>
        );

        const icon = getByTestId('icon');

        expect(icon).toBeInTheDocument();
    });
});