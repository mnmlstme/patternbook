var path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        loader: './src/markdown-loader/index.js'
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
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

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'library',
        libraryTarget: 'commonjs2'
    }
}
