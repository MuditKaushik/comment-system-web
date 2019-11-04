var path = require('path');
var webpack = require('webpack');
var workingDirPath = process.cwd();
module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    target: 'web',
    devServer: {
        contentBase: [
            path.resolve(workingDirPath, 'build/**/*')
        ],
        index: 'index.html',
        filename: 'main.js',
        historyApiFallback: true,
        port: 1990,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8200',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug',
                pathRewrite: { '^/api': 'http://localhost:8200' }
            }
        }
    }
};
