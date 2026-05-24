const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Silence the Dart Sass legacy JS API deprecation warning.
// sass-loader in @wordpress/scripts currently uses the legacy API;
// this option opts into the modern API without waiting for an upstream fix.
const sassLoaderOptions = {
	sassOptions: {
		silenceDeprecations: [ 'legacy-js-api' ],
	},
};

/**
 * Patch every sass-loader rule in the default config to add our options.
 *
 * @param {import('webpack').RuleSetRule[]} rules
 * @return {import('webpack').RuleSetRule[]} The modified array of Webpack ruleset rules.
 */
function patchSassLoader( rules ) {
	return rules.map( ( rule ) => {
		if ( rule.use && Array.isArray( rule.use ) ) {
			return {
				...rule,
				use: rule.use.map( ( loader ) => {
					if (
						loader &&
						typeof loader === 'object' &&
						loader.loader &&
						loader.loader.includes( 'sass-loader' )
					) {
						return {
							...loader,
							options: {
								...( loader.options || {} ),
								...sassLoaderOptions,
							},
						};
					}
					return loader;
				} ),
			};
		}
		return rule;
	} );
}

module.exports = {
	...defaultConfig,

	entry: {
		'blocks/icon/index': path.resolve(
			__dirname,
			'src/blocks/icon/index.js'
		),
		'blocks/icon-list/index': path.resolve(
			__dirname,
			'src/blocks/icon-list/index.js'
		),
		'blocks/icon-list-item/index': path.resolve(
			__dirname,
			'src/blocks/icon-list-item/index.js'
		),
		'blocks/info-box/index': path.resolve(
			__dirname,
			'src/blocks/info-box/index.js'
		),
		'blocks/faqs/index': path.resolve(
			__dirname,
			'src/blocks/faqs/index.js'
		),
		'blocks/faq-item/index': path.resolve(
			__dirname,
			'src/blocks/faq-item/index.js'
		),
		'blocks/team-member/index': path.resolve(
			__dirname,
			'src/blocks/team-member/index.js'
		),
		'blocks/rating/index': path.resolve(
			__dirname,
			'src/blocks/rating/index.js'
		),
		'blocks/progress-bar/index': path.resolve(
			__dirname,
			'src/blocks/progress-bar/index.js'
		),
		frontend: path.resolve( __dirname, 'src/frontend.js' ),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
	},

	module: {
		...defaultConfig.module,
		rules: patchSassLoader( defaultConfig.module.rules ),
	},

	performance: {
		hints: false,
	},
};
