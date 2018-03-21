const webpack = require('webpack');
const path = require('path');
const env = process.env.WEBPACK_ENV;

const PATHS = {
    entry: path.join(__dirname, 'entry/'),
    dist: path.join(__dirname, 'dist/'),
    // source: path.join(__dirname, 'assets/'),
    // build: path.join(__dirname, '../assets/components/app/web/')
}

// Main Settings config
module.exports = {
    entry: {
        home: PATHS.entry + 'home.js',
        about: PATHS.entry + 'about.js',
        contacts: PATHS.entry + 'contacts.js',
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            use: [
                'file-loader?name=[name].css',
                'extract-loader',
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
            use: [{
                    loader: "css-loader",
                    options: {
                        minimize: env === 'production' ? true : false
                    }
                },
                'postcss-loader'
            ]
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
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
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
