var path = require('path');

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
                        loader: 'react-markdown-loader'
                    }
                ]
            },
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'patterns'),
            'node_modules'
        ],

        extensions: [
            '.js',
            '.jsx',
            '.html',
            '.css',
            '.md'
        ],
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },

    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};
