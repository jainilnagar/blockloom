<?php
/**
 * Plugin Name: Blockloom
 * Plugin URI: https://github.com/jainilnagar/blockloom
 * Description: A collection of lightweight, zero-dependency Gutenberg blocks — Icon, Icon List, Info Box, FAQs, Team Member, Rating, and Progress Bar.
 * Version: 1.0.0
 * Author: Jainil Nagar
 * Author URI: https://profiles.wordpress.org/jainilnagar
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: blockloom
 * Domain Path: /languages
 *
 * @package Blockloom
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLOCKLOOM_VERSION', '1.0.0' );
define( 'BLOCKLOOM_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'BLOCKLOOM_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once BLOCKLOOM_PLUGIN_DIR . 'includes/block-category.php';
require_once BLOCKLOOM_PLUGIN_DIR . 'includes/icon-helper.php';

/**
 * Register all Blockloom blocks.
 */
function blockloom_register_blocks() {
	$blocks = array(
		'icon',
		'icon-list',
		'icon-list-item',
		'info-box',
		'faqs',
		'faq-item',
		'team-member',
		'rating',
		'progress-bar',
	);

	foreach ( $blocks as $block ) {
		$block_dir = BLOCKLOOM_PLUGIN_DIR . 'build/blocks/' . $block;
		if ( file_exists( $block_dir . '/block.json' ) ) {
			register_block_type( $block_dir );
		}
	}
}
add_action( 'init', 'blockloom_register_blocks' );

/**
 * Enqueue Dashicons and frontend script on the frontend.
 * Dashicons are loaded in wp-admin by default; we need them on the front too
 * because our blocks use them to render icons.
 */
function blockloom_enqueue_frontend_assets() {
	// Only enqueue on pages that actually contain a Blockloom block.
	if ( ! blockloom_page_has_block() ) {
		return;
	}

	// Dashicons — WordPress built-in, just needs enqueueing on the front.
	wp_enqueue_style( 'dashicons' );

	// FAQ accordion + schema script.
	if ( file_exists( BLOCKLOOM_PLUGIN_DIR . 'build/frontend.js' ) ) {
		wp_enqueue_script(
			'blockloom-frontend',
			BLOCKLOOM_PLUGIN_URL . 'build/frontend.js',
			array(),
			BLOCKLOOM_VERSION,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'blockloom_enqueue_frontend_assets' );

/**
 * Check if the current page contains any Blockloom block.
 *
 * @return bool
 */
function blockloom_page_has_block() {
	$post = get_post();
	if ( ! $post ) {
		return false;
	}

	$blockloom_blocks = array(
		'blockloom/icon',
		'blockloom/icon-list',
		'blockloom/info-box',
		'blockloom/faqs',
		'blockloom/team-member',
		'blockloom/rating',
		'blockloom/progress-bar',
	);

	foreach ( $blockloom_blocks as $block_name ) {
		if ( has_block( $block_name, $post ) ) {
			return true;
		}
	}

	return false;
}
