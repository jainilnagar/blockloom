const fs = require( 'fs' );
const path = require( 'path' );

const meta = require( '@fortawesome/fontawesome-free/metadata/icon-families.json' );

const output = {};

Object.entries( meta ).forEach( ( [ name, data ] ) => {
	// Only include icons available in free license
	const freeStyles = data.familyStylesByLicense?.free || [];
	if ( ! freeStyles.length ) {
		return;
	}

	freeStyles.forEach( ( { family, style } ) => {
		const svgData = data.svgs?.[ family ]?.[ style ];
		if ( ! svgData ) {
			return;
		}

		// viewBox is an array [x, y, width, height]
		const viewBox = Array.isArray( svgData.viewBox )
			? svgData.viewBox.join( ' ' )
			: svgData.viewBox;

		// path is a direct string (maybe compound for some icons, check raw)
		let paths = [];
		if ( svgData.path ) {
			paths = [ svgData.path ];
		} else if ( svgData.raw ) {
			const matches = [
				...svgData.raw.matchAll( /<path[^>]+d="([^"]+)"/g ),
			];
			paths = matches.map( ( m ) => m[ 1 ] );
		}

		if ( ! paths.length || ! viewBox ) {
			return;
		}

		// Key format: style/name e.g. "solid/star", "brands/github"
		const key = `${ style }/${ name }`;

		output[ key ] = {
			name,
			style,
			label: data.label || name,
			search: data.search?.terms || [],
			viewBox,
			path: paths,
		};
	} );
} );

fs.mkdirSync( path.resolve( __dirname, '../data' ), { recursive: true } );

fs.writeFileSync(
	path.resolve( __dirname, '../data/icons.json' ),
	JSON.stringify( output )
);

process.stdout.write( `Generated ${ Object.keys( output ).length } icons\n` );
