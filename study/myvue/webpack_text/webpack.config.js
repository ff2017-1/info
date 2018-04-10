const path = require('path');
// import a from "./src/js/1.js"
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var webpack=require('webpack')
module.exports = {
    entry: './main.js',     //入口文件
    output: {
        filename: './js/bundle.js',     //出口文件
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
         contentBase: './dist',
         port:8888
   },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',

            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':src'],

                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("/css/styles.css"),
        new HtmlWebpackPlugin(
            {
                title:"webpack",
                filename:"index1.html",
                template:"index.html"
            }
        ),
        new UglifyJsPlugin(
            {
                test: /\.js($|\?)/i,
                exclude: /\/node_modules/
            }
        )
    ]
};