// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
const RemovePlugin = require('remove-files-webpack-plugin');

const configuredRemovePlugin = new RemovePlugin({
    after: {
        root: './build',
        test: [
            {
                folder: '.',
                method: (absoluteItemPath) =>
                    new RegExp(/\.js$/, 'm').test(absoluteItemPath),
            },
            {
                folder: './_snowpack',
                method: () => true,
                recursive: true,
            },
        ],
    },
});

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    root: '.',
    mount: {
        src: { url: '/' },
        public: { url: '/', static: true, resolve: false },
    },
    plugins: [
        '@snowpack/plugin-postcss',
        [
            '@snowpack/plugin-webpack',
            {
                sourceMap: false,
                extendConfig: (config) => {
                    config.plugins.push(configuredRemovePlugin);
                    return config;
                },
            },
        ],
        [
            '@snowpack/plugin-run-script',
            {
                cmd: 'yarn run eslint src --ext .js,.jsx,.ts,.tsx',
                // Optional: Use npm package "eslint-watch" to run on every file change
                watch: 'yarn run esw -w --clear src --ext .js,.jsx,.ts,.tsx',
            },
        ],
    ],
    devOptions: {
        tailwindConfig: './tailwind.config.js',
        port: 3030,
        output: 'stream',
        hmr: true,
    },
    buildOptions: {
        out: 'build',
        sourcemap: process.env.NODE_ENV === 'development',
    },
};
