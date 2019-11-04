var path = require('path');
var unglifyJs = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var workingDirPath = process.cwd();
module.exports = {
    mode: 'production',
    target: 'node',
    node: {
        fs: 'empty',
        net: true
    },
    entry: {
        server: path.join(workingDirPath, './src/server/server.ts')
    },
    optimization: {
        minimize: true,
        minimizer: [
            new unglifyJs({
                cache: true,
                extractComments: false,
                include: ['main.js'],
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    ie8: true,
                    safari10: true,
                    compress: true,
                    warnings: false
                }
            })
        ],
        removeEmptyChunks: true,
        mergeDuplicateChunks: true
    }
};
