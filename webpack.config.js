const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const env = process.env.WEBPACK_ENV;

let entry = {}
glob.sync(path.join(__dirname, 'entry/*.js')).forEach(row => {
    entry[path.parse(row).name] = row
})

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist/'),
        chunkFilename: 'chunks/[name].bundle.js',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test : /\.js$/,
            use: [
                'babel-loader',
                {
                    loader: require.resolve('webpack-bem-loader'),
                    options: {
                        naming: 'origin',
                        levels: [path.join(__dirname, 'common.blocks/')],
                        techs: ['js', 'css', 'less', 'html'],
                        generators: {
                            js: (files) => files.map(file => `import('${file.path}')`).join(',\n')
                        }
                    }
                }
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader/url',
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css',
                        outputPath: 'css/'
                    }
                },
                'extract-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader/url',
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css',
                        outputPath: 'css/'
                    }
                },
                'extract-loader',
                'css-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.(png|jpg|gif|svg)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../img/',
                    outputPath: 'img/'
                }
            }]
        }, {
            test: /\.(webm|mp4|ogv|webm)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/'
                }
            }]
        }, {
            test: /\.(eot|woff|woff2|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
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
        new webpack.DefinePlugin({
            BUNDLED: true,
            VERSION: '1.0'
        }),
    ]

};
