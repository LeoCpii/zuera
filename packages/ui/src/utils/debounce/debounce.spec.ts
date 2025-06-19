import debounce from './debounce';

jest.useFakeTimers();

describe('Debounce', () => {
    let mockFn: jest.Mock;

    beforeEach(() => {
        mockFn = jest.fn();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    it('deve chamar a função após o tempo padrão de 500ms', () => {
        debounce.delay(mockFn);

        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('deve chamar a função imediatamente se o tempo for 0', () => {
        debounce.delay(mockFn, 0);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('deve resetar o timer se delay for chamado novamente antes de completar', () => {
        debounce.delay(mockFn, 300);
        jest.advanceTimersByTime(200);
        debounce.delay(mockFn, 300); // reseta o timer

        jest.advanceTimersByTime(200); // ainda não executa
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100); // total de 300 após último delay
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});