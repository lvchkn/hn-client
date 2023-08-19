/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    devServer: {
        proxy: {
            "/api/**": { target: "https://localhost:7245", secure: false },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_AUTH_ENABLED": JSON.stringify(true),
        }),
    ],
});
