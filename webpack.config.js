var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/patternbook/index.js',
        bundle: './book.js'
    },

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                }
            },
            {
                test: /\.css$/,
                include: /prism(js|-\w+)/,
                use: ['css-loader']
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react', 'es2015', 'stage-0']
                        }
                    },
                    {
                        loader: 'patternbook/markdown-loader'
                    }
                ]
            }
        ]
    },

    resolve: {
        alias: {
            TARGET: path.resolve(__dirname, 'src/patternbook')
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js'],
        mainFields: ['loader', 'main']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'Patternbook'
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
