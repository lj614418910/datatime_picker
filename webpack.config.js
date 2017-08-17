var path = require('path')

module.exports = {
    entry: {
        demo: __dirname + '/src/main.js'
    },
    output: {
        path: __dirname+'/asserts',
        publicPath: '/asserts/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader' 
            },
            {
                test: /\.scss$/,        
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
}