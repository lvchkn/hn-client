/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        minimize: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
};
