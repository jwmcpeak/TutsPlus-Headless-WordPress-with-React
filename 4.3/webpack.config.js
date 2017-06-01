const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        publicPath: '/assets/js/',
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080
    }
};