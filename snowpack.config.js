// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
const RemovePlugin = require('remove-files-webpack-plugin');
const path = require('path');

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
          config.plugins.push(new RemovePlugin({
            after: {
              root: './build',
              test: [
                {
                  folder: '.',
                  method: (absoluteItemPath) => {
                    return new RegExp(/\.js$/, 'm').test(absoluteItemPath);
                  }
                },
                {
                  folder: './_snowpack',
                  method: () => true,
                  recursive: true
                }
              ],
            }
          }))
          // config.optimization.splitChunks ={
          //   cacheGroups: {
          //     vendor: {
          //         test: /node_modules/,
          //         chunks: 'initial',
          //         name: 'vendor',
          //         enforce: true
          //     }
          //   },            
          // };
          return config;
        },
      }
    ]
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
    port: 3030,
    output: "stream",
    hmr: true
  },
  buildOptions: {
    out: 'build',
    sourcemap: process.env.NODE_ENV === 'development'
  },
  // optimize: {
  //   bundle: true,
  //   minify: true,
  //   target: 'es2018',
  //   treeshake: true,
  //   sourcemap: false
  // }
};