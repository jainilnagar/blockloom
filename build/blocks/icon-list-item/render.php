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

$text      = $attributes['text'] ?? '';
$icon_name = $attributes['iconName'] ?? 'solid/check';
$icon_size = isset( $block->context['blockloom/iconSize'] ) ? (int) $block->context['blockloom/iconSize'] : 20;

if ( empty( $text ) ) {
	return;
}

if ( empty( $icon_name ) && isset( $block->context['blockloom/listIconName'] ) ) {
	$icon_name = $block->context['blockloom/listIconName'];
}

if ( empty( $icon_name ) ) {
	$icon_name = 'solid/check';
}

$icon_style_array = array(
	'font-size'       => 'var(--bl-list-icon-size)',
	'width'           => 'var(--bl-list-icon-size)',
	'height'          => 'var(--bl-list-icon-size)',
	'display'         => 'flex',
	'align-items'     => 'center',
	'justify-content' => 'center',
	'line-height'     => '1',
);

$style_parts = array_map(
	function ( $property, $value ) {
		return "$property:$value;";
	},
	array_keys( $icon_style_array ),
	$icon_style_array
);

$icon_style = implode( '', $style_parts );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'blockloom-icon-list-item',
	)
);

$icon_svg = blockloom_get_icon_svg( $icon_name, $icon_size );

$text_font_size = $icon_size * 0.8;
$text_style     = 'font-size: ' . $text_font_size . 'px';
?>
<li <?php echo $wrapper_attributes; ?>>
	<span class="blockloom-icon-list-item__icon">
		<span style="<?php echo esc_attr( $icon_style ); ?>">
            <?php echo $icon_svg; // phpcs:ignore ?>
		</span>
	</span>
	<span class="blockloom-icon-list-item__text" style="<?php echo esc_attr( $text_style ); ?>">
		<?php echo wp_kses_post( $text ); ?>
	</span>
</li>
