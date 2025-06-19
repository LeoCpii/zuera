import { join, dirname } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

import { StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],
    typescript: {
        reactDocgen: false,
        reactDocgenTypescriptOptions: {
            tsconfigPath: '../tsconfig.json'
        }
    },
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
    viteFinal: (config) => {
        config.plugins = [
            ...(config.plugins || []),
            tsconfigPaths(),
        ];

        config.css = {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "../../styles/main.scss" as *;
                    `,
                },
            },
        };

        return config;
    },
};

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')));
}

export default config;