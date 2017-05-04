const path = require('path')
const webpack = require('webpack')
const srcPath = path.resolve(__dirname, './src')
const isProd = process.env.NODE_ENV === 'production'
const config = {
    entry: {
        'vue-dragging': path.resolve(__dirname, './vue-dragging.js')
    },
    output: {
        path: __dirname,
        library: "VueDragging",
        filename: "[name].es5.js",
        libraryTarget: 'umd2'
    },
    devtool: '#source-map',
    resolve: {
        alias: {
            '@': srcPath
        },
        extensions: ['.js']
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}
if (isProd) {
    config.devtool = false
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}
module.exports = config
