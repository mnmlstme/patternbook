var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        bundle: './book.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svg-inline-loader',
                    query: {
                        idPrefix: true,
                        classPrefix: true,
                        removingTagAttrs: ['xmlns', 'xmlns:xlink', 'version']
                    }
                }
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react', 'env']
                        }
                    },
                    {
                        loader: 'patternbook'
                    }
                ]
            }
        ]
    },

    resolve: {
        alias: {
            TARGET: path.resolve(__dirname, 'patterns')
        },
        modules: ['../..', 'node_modules']
    },

    resolveLoader: {
        modules: ['../..', 'node_modules'],
        mainFields: ['loader', 'main']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],

    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true // Tell the dev-server we're using HMR
    }
}
