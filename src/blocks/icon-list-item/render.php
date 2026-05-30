<?php
/**
 * PHP Native Render Template for Icon List Item Block.
 *
 * WordPress automatically makes these variables available:
 * - $attributes (array)
 * - $content (string)
 * - $block (WP_Block instance)
 *
 * @package Blockloom
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'blockloom_get_icon_svg' ) ) {
	require_once dirname( __DIR__, 3 ) . '/includes/icon-helper.php';
}

$blockloom_text      = $attributes['text'] ?? '';
$blockloom_icon_name = $attributes['iconName'] ?? 'solid/check';
$blockloom_icon_size = isset( $block->context['blockloom/iconSize'] ) ? (int) $block->context['blockloom/iconSize'] : 20;

if ( empty( $blockloom_text ) ) {
	return;
}

if ( empty( $blockloom_icon_name ) && isset( $block->context['blockloom/listIconName'] ) ) {
	$blockloom_icon_name = $block->context['blockloom/listIconName'];
}

if ( empty( $blockloom_icon_name ) ) {
	$blockloom_icon_name = 'solid/check';
}

$blockloom_icon_style_array = array(
	'font-size'       => 'var(--bl-list-icon-size)',
	'width'           => 'var(--bl-list-icon-size)',
	'height'          => 'var(--bl-list-icon-size)',
	'display'         => 'flex',
	'align-items'     => 'center',
	'justify-content' => 'center',
	'line-height'     => '1',
);

$blockloom_style_parts = array_map(
	function ( $property, $value ) {
		return "$property:$value;";
	},
	array_keys( $blockloom_icon_style_array ),
	$blockloom_icon_style_array
);

$blockloom_icon_style = implode( '', $blockloom_style_parts );

$blockloom_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'blockloom-icon-list-item',
	)
);

$blockloom_icon_svg = blockloom_get_icon_svg( $blockloom_icon_name, $blockloom_icon_size );

$blockloom_text_font_size = $blockloom_icon_size * 0.8;
$blockloom_text_style     = 'font-size: ' . $blockloom_text_font_size . 'px';
?>
<li <?php echo wp_kses_data( $blockloom_wrapper_attributes ); ?>>
	<span class="blockloom-icon-list-item__icon">
		<span style="<?php echo esc_attr( $blockloom_icon_style ); ?>">
            <?php echo $blockloom_icon_svg; // phpcs:ignore ?>
		</span>
	</span>
	<span class="blockloom-icon-list-item__text" style="<?php echo esc_attr( $text_style ); ?>">
		<?php echo wp_kses_post( $blockloom_text ); ?>
	</span>
</li>
