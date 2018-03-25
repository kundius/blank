const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const env = process.env.WEBPACK_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let entry = {}
glob.sync(path.join(__dirname, 'templates/**/*.js')).forEach(row => {
    entry[path.parse(row).name] = row
})

module.exports = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'dist/'),
        chunkFilename: 'chunks/[name].bundle.js',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test : /\.js$/,
            loader: require.resolve('webpack-bem-loader'),
            options: {
                naming: 'origin',
                levels: [path.join(__dirname, 'common.blocks/')],
                techs: ['js', 'css', 'less', 'html'],
                generators: {
                    js: (files) => files.map(file => `import('${file.path}')`).join(',\n')
                }
            }
        }, {
            test: /\.less$/,
            use: [
                /*'file-loader?name=[name].css',
                'extract-loader',*/
                'style-loader',
                {
                    loader: "css-loader",
                    options: {
                        minimize: env === 'production' ? true : false
                    }
                },
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader'
                ]
            })
        }, {
            test: /\.(png|jpg|gif|svg)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'img/'
                }
            }]
        }, {
            test: /\.(webm|mp4|ogv|webm)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'img/'
                }
            }]
        }, {
            test: /\.(eot|woff|woff2|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'fonts/'
                }
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: 'file-loader?name=[name].[ext]'
            }, {
                loader: 'extract-loader'
            }, {
                loader: 'html-loader'
            }]
        }]
    },

    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            BUNDLED: true,
            VERSION: '1.0'
        }),
    ]

};
