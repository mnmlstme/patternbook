var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './patternbook/index.js',
        loader: './patternbook/markdown-loader/index.js'
    },

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                include: /prism(js|-\w+)/,
                use: ['css-loader']
            }
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'library',
        libraryTarget: 'commonjs2'
    }
}
