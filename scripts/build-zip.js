const fs = require( 'fs' );
const path = require( 'path' );
const archiver = require( 'archiver' );

// 1. Create a file to stream the ZIP data into
const outputPath = path.resolve( __dirname, '../blockloom.zip' );
const output = fs.createWriteStream( outputPath );
const archive = new archiver.ZipArchive( {
	zlib: { level: 9 },
} );

/**
 * Exclude files that should not be shipped in the WordPress.org ZIP.
 *
 * @param {Object} entry Archive entry data.
 * @return {Object|false} Entry data or false to skip.
 */
function filterArchiveEntry( entry ) {
	const entryName = entry.name || '';

	if ( path.basename( entryName ) === '.DS_Store' ) {
		return false;
	}

	if (
		entryName === 'lint-php.php' ||
		entryName.endsWith( '/lint-php.php' )
	) {
		return false;
	}

	return entry;
}

// 2. Listen for total bytes written when finished
output.on( 'close', function () {
	/* eslint-disable no-console */
	console.log( `Success! ZIP created: ${ outputPath }` );
	console.log(
		`Total size: ${ ( archive.pointer() / 1024 / 1024 ).toFixed( 2 ) } MB`
	);
	/* eslint-enable no-console */
} );

// 3. Catch archiving errors explicitly
archive.on( 'error', function ( err ) {
	throw err;
} );

// 4. Pipe archive data to the file
archive.pipe( output );

// 5. Append directories and files
archive.directory( 'build/', 'blockloom/build', filterArchiveEntry );
archive.directory( 'includes/', 'blockloom/includes', filterArchiveEntry );
archive.directory( 'languages/', 'blockloom/languages', filterArchiveEntry );
archive.directory( 'src/', 'blockloom/src', filterArchiveEntry );
archive.directory( 'scripts/', 'blockloom/scripts', filterArchiveEntry );

archive.file( 'blockloom.php', { name: 'blockloom/blockloom.php' } );
archive.file( 'package.json', { name: 'blockloom/package.json' } );
archive.file( 'package-lock.json', { name: 'blockloom/package-lock.json' } );
archive.file( 'webpack.config.js', { name: 'blockloom/webpack.config.js' } );
archive.file( 'readme.txt', { name: 'blockloom/readme.txt' } );
archive.file( 'data/icons.json', { name: 'blockloom/data/icons.json' } );

// 6. Finalize the file (this closes the stream)
archive.finalize();
