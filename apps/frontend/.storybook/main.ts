import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,

        '@': path.resolve(__dirname, '../src'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@layouts': path.resolve(__dirname, '../src/layouts'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@scripts': path.resolve(__dirname, '../src/scripts'),
        '@styles': path.resolve(__dirname, '../src/styles'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@data': path.resolve(__dirname, '../src/data'),
        '@types': path.resolve(__dirname, '../src/types'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@lib': path.resolve(__dirname, '../src/lib'),
      },
    };

    return config;
  },
};

export default config;
