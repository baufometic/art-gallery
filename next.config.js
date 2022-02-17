const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
	reactStrictMode: true,
	webpack(config, options) {
		const { isServer } = options;
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV: JSON.stringify(isDev)
			})
		);
		config.module.rules.push({
			test    : /\.(ogg|mp3|wav|mp4|mpe?g)$/i,
			exclude : config.exclude,
			use     : [
				{
					loader  : require.resolve("url-loader"),
					options : {
						limit      : config.inlineImageLimit,
						fallback   : require.resolve("file-loader"),
						publicPath : `${ config.assetPrefix }/_next/static/images/`,
						outputPath : `${ isServer ? "../" : "" }static/images/`,
						name       : "[name]-[hash].[ext]",
						esModule   : config.esModule || false,
					},
				},
			],
		});
		
		return config;
	},
};
