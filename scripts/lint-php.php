<?php
/**
 * PHP syntax checker — cross-platform replacement for find + php -l.
 * Usage: php scripts/lint-php.php
 *
 * @package Blockloom
 */

$exclude = array( 'node_modules', 'vendor', 'build', 'dist' );
$errors  = 0;
$checked = 0;

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator( '.', RecursiveDirectoryIterator::SKIP_DOTS )
);

foreach ( $iterator as $file ) {
    if ( $file->getExtension() !== 'php' ) {
        continue;
    }

    $path = $file->getPathname();

    // Skip excluded directories.
    foreach ( $exclude as $dir ) {
        if ( strpos( $path, DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR ) !== false ) {
            continue 2;
        }
    }

    $output = array();
    $code   = 0;
    exec( 'php -l ' . escapeshellarg( $path ), $output, $code );

    ++$checked;

    if ( 0 !== $code ) {
        echo implode( PHP_EOL, $output ) . PHP_EOL;
        ++$errors;
    }
}

if ( $errors > 0 ) {
    echo PHP_EOL . "Found {$errors} file(s) with syntax errors." . PHP_EOL;
    exit( 1 );
}

echo "No syntax errors detected in {$checked} file(s)." . PHP_EOL;
