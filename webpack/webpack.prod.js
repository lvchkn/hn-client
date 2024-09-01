/* eslint-disable @typescript-eslint/no-require-imports */
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_AUTH_ENABLED": JSON.stringify(true),
            "process.env.REACT_APP_USE_CUSTOM_API": JSON.stringify(true),
            "process.env.REACT_APP_BASE_URL": JSON.stringify(
                "https://api.myhnfeed.com"
            ),
            "process.env.REACT_APP_CLIENT_URL": JSON.stringify(
                "https://www.myhnfeed.com"
            ),
        }),
    ],
});
