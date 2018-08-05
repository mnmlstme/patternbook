var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        book: './book.js'
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'env'],
                        plugins: ['syntax-dynamic-import']
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
                include: [
                    path.resolve(__dirname, 'patterns')
                ],
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
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js'],
        mainFields: ['loader', 'main']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],

    output: {
      filename: '[name].bundle.js',
      chunkFilename: 'chunk.[id].js',
      publicPath: '/'
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true // Tell the dev-server we're using HMR
    }
}
