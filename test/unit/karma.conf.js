const path = require('path')
const srcPath = path.resolve(__dirname, '../../')

module.exports = function(config) {
    config.set({
        webpack: {
            devtool: 'inline-source-map',//'#source-map',
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    '@': srcPath
                }
            },
            module: {
                rules: [
                    {
                        test: /vue-dragging\.js/,
                        enforce: 'pre',
                        use: 'istanbul-instrumenter-loader',
                        include: [path.resolve(srcPath, 'vue-dragging.js')]
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
        },
        frameworks: ['mocha', 'sinon-chai'],
        files: [
            './index.js'
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage-istanbul'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        singleRun: false,
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true,
            'report-config': {
                html: {
                    subdir: 'html'
                }
            }
        }
    })
}
