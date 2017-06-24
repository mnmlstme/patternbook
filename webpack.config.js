var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/patternbook/index.js',

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
                include: /prismjs/,
                use: ['css-loader']
            }
        ]
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],

        extensions: ['.js']
    },

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'Patternbook'
    }
}
