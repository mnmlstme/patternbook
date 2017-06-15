var path = require('path');
const webpack = require('webpack');


module.exports = {

    entry: './book.js',

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
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
                            presets: ['react', 'es2015']
                        }
                    },
                    {
                        loader: 'patternbook/markdown-loader'
                    }
                ]
            },
        ]
    },

    resolve: {
        alias: {
            TARGET: path.resolve(__dirname, 'patterns')
        },

        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],

        extensions: [
            '.js'
        ],
    },

    resolveLoader : {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: [".js", ".json"],
        mainFields: ["loader", "main"]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],

    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true, // Tell the dev-server we're using HMR
    }
};
