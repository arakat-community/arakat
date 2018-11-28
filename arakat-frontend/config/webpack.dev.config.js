const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
require('@babel/polyfill');

module.exports = env => {
    console.log('env.API_WORKSPACE:' + env.API_WORKSPACE);
    return {
        mode: "development",
        entry: ["@babel/polyfill", "./src/index.tsx"],
        output: {
            path: path.resolve(__dirname, "../", "dist"),
            filename: "bundle.js",
            publicPath: "/"
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx']
        },
        devServer: {
            inline: true,
            // hot: true,
            port: 3000,
            contentBase: path.join(__dirname, "../", "dist"),
            open: true,
            overlay: true, // shows when an error occurrs on page.
            progress: true,
            watchContentBase: true, // when true, the source under dist file changes will force browser to be refreshed
            // redirects all fallbacks to index.html
            publicPath: "/",
            historyApiFallback: true,
            watchOptions: {
                poll: true,
                ignored: [/config/,"package.json", /node_modules/]
            }
        },
        watchOptions: {
            poll: true,
            ignored: [/config/,"package.json", /node_modules/]
        },
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.(tsx|js)?$/,
                    include: path.resolve(__dirname, "../", 'src'),
                    exclude: /node_modules/,
                    use: [{
                            // convert es6 to es5
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true
                            }
                        },
                        {
                            // converts type-script code to es6
                            loader: "ts-loader",
                            options: {
                                configFile: 'config/tsconfig.json',
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192',
                    options: {
                        fallback: 'responsive-loader',
                        quality: 85,
                        publicPath: 'http://localhost:3000/',
                    }
                },
                {
                    test: /\.(jsx?)$/,
                    include: path.resolve(__dirname, "../", 'src'),
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }],
                    exclude: [/node_modules/],
                },
            ]
        },
        plugins: [
            new Dotenv({
                path: './config/.env'
            }),
            new webpack.EnvironmentPlugin({
                API_WORKSPACE: env.API_WORKSPACE
            }),
            new StatsPlugin('stats.json', {
                chunkModules: true,
                exclude: [/node_modules[\\\/]react/]
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CaseSensitivePathsPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new ForkTsCheckerWebpackPlugin({
                async: true,
                tsconfig: './config/tsconfig.json',
                tslint: './config/tslint.json',
                watch: "src",
                workers: 7
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                hash: true,
                title: "ASTARUS - DEVELOPMENT",
                template: "./config/index.ejs",
            }),
            new CopyWebpackPlugin([{
                from: "./assets",
                to: "assets"
            }], {
                debug: 'warning'
            }),
            // new BundleAnalyzerPlugin()
        ],
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        stats: 'errors-only'
    };

}
