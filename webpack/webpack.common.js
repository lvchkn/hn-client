/* eslint-disable @typescript-eslint/no-var-requires */
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
	devServer: {
		// contentBase: 'app/ui/www',
		// devtool: 'eval',
		// hot: true,
		// inline: true,
		// port: 3000,
		// outputPath: buildPath,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../index.html"),
			favicon: path.resolve(__dirname, "../public/favicon.ico"),
		}),
	],
};
