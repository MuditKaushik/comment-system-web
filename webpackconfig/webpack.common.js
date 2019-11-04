var webpack = require('webpack');
var path = require('path');
var copyWebpack = require('copy-webpack-plugin');
var miniCssExtract = require('mini-css-extract-plugin');
var workingDirPath = process.cwd();
module.exports = {
    context: path.resolve(workingDirPath, './src'),
    entry: {
        main: [
            path.resolve(workingDirPath, './src/app-main.ts'),
            path.resolve(workingDirPath, './src/style/app.style.scss')
        ],
        tooltip: [
            path.resolve(workingDirPath, './node_modules/popper.js/dist/popper.js'),
            path.resolve(workingDirPath, './node_modules/bootstrap/js/src/util.js'),
            path.resolve(workingDirPath, './node_modules/bootstrap/js/src/tooltip.js')
        ],
        pollyfills: path.resolve(workingDirPath, './src/pollyfills.ts')
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.scss', '.css']
    },
    plugins: [
        new miniCssExtract({
            filename: 'style.css',
        })
        ,
        new copyWebpack([
            {
                from: path.resolve(workingDirPath, './src/**/*.html')
            },
            {
                from: path.resolve(workingDirPath, './src/images/'),
                to: path.resolve(workingDirPath, './build/assets/images')
            },
            {
                from: path.resolve(workingDirPath, './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'),
                to: path.resolve(workingDirPath, './build/js')
            },
            {
                from: path.resolve(workingDirPath, './node_modules/jquery/dist/jquery.min.js'),
                to: path.resolve(workingDirPath, './build/js')
            },
            {
                from: path.resolve(workingDirPath, './node_modules/font-awesome/fonts/'),
                to: path.resolve(workingDirPath, './build/assets/fonts')
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: miniCssExtract.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: { configFile: path.resolve(workingDirPath, './tsconfig.json') }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2|otf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            }
        ]
    }
};
