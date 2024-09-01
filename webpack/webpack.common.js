/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
        }),
    ],
};
