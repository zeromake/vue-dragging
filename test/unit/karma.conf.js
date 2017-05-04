const path = require('path')
const srcPath = path.resolve(__dirname, '../../')

const babelConfig = {
    loader: 'babel-loader',
    options: {
        presets: ['es2015']
    }
}

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
                        test: /\.js/,
                        use: [
                            'istanbul-instrumenter-loader',
                            babelConfig
                        ],
                        include: [path.resolve(srcPath, 'vue-dragging.js')]
                    },
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        use: babelConfig
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
        concurrency: Infinity,
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
