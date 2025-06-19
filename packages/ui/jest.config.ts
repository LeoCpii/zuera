import type { Config } from 'jest';

const config: Config = {
    // Indica que estamos usando TypeScript
    preset: 'ts-jest',

    // Ambiente de testes semelhante ao navegador (ideal para React)
    testEnvironment: 'jsdom',

    // Mapeia caminhos para importar arquivos de estilo ou estáticos
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    },

    // Define onde estão os arquivos de teste
    testMatch: ['**/*.spec.(ts|tsx)'],

    // Suporte a arquivos JSX/TSX
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json'
            },
        ],
    },

    // Ignora node_modules durante transformações
    transformIgnorePatterns: ['/node_modules/'],

    // Configurações adicionais para resolver módulos do React
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],

    // Define o diretório base do projeto (opcional)
    rootDir: './src',
};

export default config;