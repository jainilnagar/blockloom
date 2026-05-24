<?php
/**
 * Register a custom block category for Blockloom blocks.
 *
 * @package Blockloom
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add the Blockloom block category.
 *
 * @param array $categories Existing block categories.
 * @return array Modified block categories.
 */
function blockloom_register_block_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'blockloom',
				'title' => __( 'Blockloom', 'blockloom' ),
				'icon'  => null,
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'blockloom_register_block_category' );
