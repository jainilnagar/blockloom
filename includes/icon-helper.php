<?php
/**
 * Icon helper — reads a single icon's SVG data from icons.json.
 *
 * @package Blockloom
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns an inline SVG string for a given icon key.
 *
 * @param string $icon_key  e.g. "solid/star" or "brands/github".
 * @param int    $size      Width and height in px.
 * @param string $class_att Optional CSS class.
 * @return string           SVG HTML string or empty string if not found
 */
function blockloom_get_icon_svg( $icon_key, $size = 24, $class_att = '' ) {
	if ( empty( $icon_key ) ) {
		return '';
	}

	static $icons = null;

	// Load and cache the icons JSON once per request.
	if ( null === $icons ) {
		$json_path = plugin_dir_path( __DIR__ ) . 'data/icons.json';
		if ( ! file_exists( $json_path ) ) {
			return '';
		}
        $json  = file_get_contents( $json_path ); // phpcs:ignore
		$icons = json_decode( $json, true );
	}

	if ( empty( $icons[ $icon_key ] ) ) {
		return '';
	}

	$icon    = $icons[ $icon_key ];
	$viewbox = esc_attr( $icon['viewBox'] );
	$paths   = $icon['path'];

	$class_attr = $class_att ? ' class="' . esc_attr( $class_att ) . '"' : '';

	$svg = sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" width="%d" height="%d" fill="currentColor" aria-hidden="true"%s style="display:block;flex-shrink:0;">',
		$viewbox,
		$size,
		$size,
		$class_attr
	);

	foreach ( $paths as $path ) {
		$svg .= '<path d="' . esc_attr( $path ) . '"/>';
	}

	$svg .= '</svg>';

	return $svg;
}
