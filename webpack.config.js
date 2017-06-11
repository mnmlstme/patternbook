var path = require('path');

module.exports = {

    entry: './app.js',

    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
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
            '.html',
            '.css',
            '.md'
        ],

    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
