import joinClass from './joinClass';

describe('joinClass', () => {
    it('deve juntar apenas as strings válidas com espaço', () => {
        expect(joinClass(['btn', 'primary', 'active'])).toBe('btn primary active');
    });

    it('deve ignorar valores falsy como false, null e undefined', () => {
        expect(joinClass(['btn', false, null, undefined, 'active'])).toBe('btn active');
    });

    it('deve retornar uma string vazia se todos os valores forem falsy', () => {
        expect(joinClass([false, null, undefined])).toBe('');
    });

    it('deve aceitar um array vazio', () => {
        expect(joinClass([])).toBe('');
    });

    it('deve ignorar strings vazias ("")', () => {
        expect(joinClass(['btn', '', 'active'])).toBe('btn active');
    });
});