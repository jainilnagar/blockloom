const fs       = require( 'fs' );
const path     = require( 'path' );
const archiver = require( 'archiver' );

// 1. Create a file to stream the ZIP data into
const outputPath = path.resolve( __dirname, '../blockloom.zip' );
const output     = fs.createWriteStream( outputPath );
const archive    = new archiver.ZipArchive( {
    zlib: { level: 9 },
} );

// 2. Listen for total bytes written when finished
output.on( 'close', function () {
    console.log( `Success! ZIP created: ${ outputPath }` );
    console.log( `Total size: ${ ( archive.pointer() / 1024 / 1024 ).toFixed( 2 ) } MB` );
} );

// 3. Catch archiving errors explicitly
archive.on( 'error', function ( err ) {
    throw err;
} );

// 4. Pipe archive data to the file
archive.pipe( output );

// 5. Append directories and files
archive.directory( 'build/',    'blockloom/build' );
archive.directory( 'includes/', 'blockloom/includes' );
archive.directory( 'languages/',    'blockloom/languages' );
archive.file( 'blockloom.php',       { name: 'blockloom/blockloom.php'   } );
archive.file( 'readme.txt',          { name: 'blockloom/readme.txt'      } );
archive.file( 'data/icons.json',     { name: 'blockloom/data/icons.json' } );

// 6. Finalize the file (this closes the stream)
archive.finalize();