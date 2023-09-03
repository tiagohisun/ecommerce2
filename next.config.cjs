const path = require('path');
const withOptimizedImages = require('next-optimized-images');
const webpack = require('webpack');

const config = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['via.placeholder.com'],
  },
  webpack5: true,
  webpack: (config, { isServer, defaultLoaders }) => {
    config.module.rules.push(
      // Add a rule to handle TypeScript files using the ts-loader
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      // Add the node-loader for .node files
      {
        test: /\.node$/,
        use: 'node-loader',
      }
    );

    // Add the externals configuration for sharp and @napi-rs/snappy-win32-x64-msvc on the server-side
    if (isServer) {
      config.externals = {
        ...config.externals,
        sharp: 'commonjs sharp',
        '@napi-rs/snappy-win32-x64-msvc': 'commonjs @napi-rs/snappy-win32-x64-msvc',
      };
    }

    return config;
  },
};

module.exports = withOptimizedImages(config);
