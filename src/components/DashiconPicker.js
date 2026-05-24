/**
 * DashiconPicker - A lightweight icon picker using WordPress Dashicons.
 * Replaces @10up/block-components IconPicker with no external dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';

// Curated list of common dashicons organised by category
const DASHICONS = [
	// Interface
	'menu',
	'admin-site',
	'dashboard',
	'admin-post',
	'admin-media',
	'admin-links',
	'admin-page',
	'admin-comments',
	'admin-appearance',
	'admin-plugins',
	'admin-users',
	'admin-tools',
	'admin-settings',
	'admin-network',
	'admin-home',
	'admin-generic',
	'admin-collapse',
	'filter',
	'admin-customizer',
	'admin-multisite',
	// Arrows
	'arrow-up',
	'arrow-down',
	'arrow-left',
	'arrow-right',
	'arrow-up-alt',
	'arrow-down-alt',
	'arrow-left-alt',
	'arrow-right-alt',
	'arrow-up-alt2',
	'arrow-down-alt2',
	'arrow-left-alt2',
	'arrow-right-alt2',
	// Misc
	'welcome-write-blog',
	'welcome-edit-page',
	'welcome-add-page',
	'welcome-view-site',
	'welcome-widgets-menus',
	'welcome-comments',
	'welcome-learn-more',
	// Formatting
	'format-aside',
	'format-image',
	'format-gallery',
	'format-video',
	'format-status',
	'format-quote',
	'format-chat',
	'format-audio',
	'camera',
	'images-alt',
	'images-alt2',
	'video-alt',
	'video-alt2',
	'video-alt3',
	// Media
	'media-archive',
	'media-audio',
	'media-code',
	'media-default',
	'media-document',
	'media-interactive',
	'media-spreadsheet',
	'media-text',
	'media-video',
	'playlist-audio',
	'playlist-video',
	'controls-play',
	'controls-pause',
	'controls-forward',
	'controls-skipforward',
	'controls-back',
	'controls-skipback',
	'controls-repeat',
	'controls-volumeon',
	'controls-volumeoff',
	// Image editing
	'image-crop',
	'image-rotate',
	'image-rotate-left',
	'image-rotate-right',
	'image-flip-vertical',
	'image-flip-horizontal',
	'image-filter',
	'undo',
	'redo',
	// Social
	'share',
	'share-alt',
	'share-alt2',
	'twitter',
	'rss',
	'email',
	'email-alt',
	'facebook',
	'facebook-alt',
	'instagram',
	'google',
	'linkedin',
	'youtube',
	'pinterest',
	'reddit',
	'spotify',
	'twitch',
	'github',
	// Post types
	'post-status',
	'edit',
	'trash',
	'sticky',
	// People / Users
	'groups',
	'businessman',
	'id',
	'id-alt',
	'products',
	'awards',
	'forms',
	// Notifications
	'bell',
	'yes',
	'yes-alt',
	'no',
	'no-alt',
	'plus',
	'plus-alt',
	'plus-alt2',
	'minus',
	'dismiss',
	'marker',
	'star-filled',
	'star-half',
	'star-empty',
	// Flags / Blocks
	'flag',
	'info',
	'warning',
	'lock',
	'unlock',
	'privacy',
	'hidden',
	'visibility',
	// Misc UI
	'search',
	'clock',
	'calendar',
	'calendar-alt',
	'heart',
	'thumbs-up',
	'thumbs-down',
	'tag',
	'category',
	'location',
	'location-alt',
	'phone',
	'megaphone',
	'clipboard',
	'lightbulb',
	'chart-bar',
	'chart-pie',
	'chart-line',
	'chart-area',
	'excerpt-view',
	'list-view',
	'grid-view',
	'block-default',
	'cloud',
	'cloud-upload',
	'cloud-saved',
	'cloud-saved',
	'download',
	'upload',
	'backup',
	'migrate',
	'performance',
	'superhero',
	'superhero-alt',
	'database',
	'database-add',
	'database-export',
	'database-import',
	'database-remove',
	'database-view',
	// Accessibility
	'universal-access',
	'universal-access-alt',
	'color-picker',
	'screenoptions',
	// Money/Commerce
	'cart',
	'money',
	'money-alt',
	'tickets',
	'tickets-alt',
];

export default function DashiconPicker( { value, onChange } ) {
	const [ search, setSearch ] = useState( '' );
	const [ isOpen, setIsOpen ] = useState( false );

	const filtered = search.trim()
		? DASHICONS.filter( ( icon ) => icon.includes( search.toLowerCase() ) )
		: DASHICONS;

	return (
		<div className="blockloom-dashicon-picker">
			<p
				style={ {
					fontSize: 11,
					fontWeight: 500,
					textTransform: 'uppercase',
					color: '#1e1e1e',
					marginBottom: 8,
				} }
			>
				{ __( 'Icon', 'blockloom' ) }
			</p>

			{ /* Preview + toggle */ }
			<div
				style={ {
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					marginBottom: 25,
				} }
			>
				<span
					style={ {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 75,
						height: 75,
						background: '#f0f0f0',
						borderRadius: 4,
						fontSize: 20,
					} }
				>
					{ value ? (
						<span
							className={ `dashicons dashicons-${ value }` }
							style={ { fontSize: 50, width: 50, height: 50 } }
						/>
					) : (
						<span style={ { color: '#bbb', fontSize: 30 } }>+</span>
					) }
				</span>
				<Button
					variant="secondary"
					size="small"
					onClick={ () => setIsOpen( ( o ) => ! o ) }
				>
					{ value
						? __( 'Change', 'blockloom' )
						: __( 'Select Icon', 'blockloom' ) }
				</Button>
				{ value && (
					<Button
						variant="secondary"
						size="small"
						isDestructive
						onClick={ () => {
							onChange( '' );
							setIsOpen( false );
						} }
					>
						{ __( 'Remove', 'blockloom' ) }
					</Button>
				) }
			</div>

			{ isOpen && (
				<div
					style={ {
						border: '1px solid #ddd',
						borderRadius: 4,
						padding: 8,
						background: '#fff',
						marginBottom: 8,
					} }
				>
					<TextControl
						placeholder={ __( 'Search icons…', 'blockloom' ) }
						value={ search }
						onChange={ setSearch }
						style={ { marginBottom: 8 } }
					/>
					<div
						style={ {
							display: 'grid',
							gridTemplateColumns: 'repeat(8, 1fr)',
							gap: 4,
							maxHeight: 200,
							overflowY: 'auto',
						} }
					>
						{ filtered.map( ( icon ) => (
							<button
								key={ icon }
								title={ icon }
								onClick={ () => {
									onChange( icon );
									setIsOpen( false );
									setSearch( '' );
								} }
								style={ {
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
									aspectRatio: '1',
									border:
										value === icon
											? '2px solid #007cba'
											: '1px solid transparent',
									borderRadius: 4,
									background:
										value === icon
											? '#e8f4fd'
											: 'transparent',
									cursor: 'pointer',
									padding: 4,
								} }
							>
								<span
									className={ `dashicons dashicons-${ icon }` }
									style={ {
										fontSize: 18,
										width: 18,
										height: 18,
										color: '#1e1e1e',
									} }
								/>
							</button>
						) ) }
						{ filtered.length === 0 && (
							<p
								style={ {
									gridColumn: '1/-1',
									textAlign: 'center',
									color: '#999',
									fontSize: 12,
								} }
							>
								{ __( 'No icons found.', 'blockloom' ) }
							</p>
						) }
					</div>
				</div>
			) }
		</div>
	);
}
