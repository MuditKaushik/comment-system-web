var webpackMerge = require('webpack-merge');
var webpackCommon = require('./webpackconfig/webpack.common');
var webpackDev = require('./webpackconfig/webpack.dev');
var webpackProd = require('./webpackconfig/webpack.prod');

module.exports = env => {
    if (env && env.production) {
        return webpackMerge(webpackCommon, webpackProd);
    } else {
        return webpackMerge(webpackCommon, webpackDev);
    }
}
