/**
 * IconPicker — searchable Font Awesome Free icon picker.
 * Renders selected icon as inline SVG. Editor only.
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import { TextControl, Button, SelectControl } from '@wordpress/components';
import ICONS from '../data/icons.json';

const STYLE_OPTIONS = [
	{ label: __( 'All', 'blockloom' ), value: 'all' },
	{ label: __( 'Solid', 'blockloom' ), value: 'solid' },
	{ label: __( 'Regular', 'blockloom' ), value: 'regular' },
	{ label: __( 'Brands', 'blockloom' ), value: 'brands' },
];

// Render an inline SVG from icon data
export function renderIconSVG( iconKey, style = {} ) {
	const icon = ICONS[ iconKey ];
	if ( ! icon ) {
		return null;
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={ icon.viewBox }
			style={ {
				display: 'block',
				width: '1em',
				height: '1em',
				...style,
			} }
			aria-hidden="true"
			fill="currentColor"
		>
			{ icon.path.map( ( d, i ) => (
				<path key={ i } d={ d } />
			) ) }
		</svg>
	);
}

export default function IconPicker( { value, onChange } ) {
	const [ search, setSearch ] = useState( '' );
	const [ styleFilter, setStyleFilter ] = useState( 'all' );
	const [ isOpen, setIsOpen ] = useState( false );
	const [ page, setPage ] = useState( 0 );

	const PER_PAGE = 80;

	const filtered = useMemo( () => {
		const term = search.toLowerCase().trim();
		return Object.entries( ICONS ).filter( ( [ , data ] ) => {
			const styleMatch =
				styleFilter === 'all' || data.style === styleFilter;
			const termMatch =
				! term ||
				data.name.includes( term ) ||
				data.label.toLowerCase().includes( term ) ||
				data.search.some( ( t ) => t.includes( term ) );
			return styleMatch && termMatch;
		} );
	}, [ search, styleFilter ] );

	const paged = filtered.slice( 0, ( page + 1 ) * PER_PAGE );
	const hasMore = paged.length < filtered.length;
	const selected = value ? ICONS[ value ] : null;
	const loadMoreLabel = sprintf(
		/* translators: %d: number of icons remaining to load */
		__( 'Load more (%d remaining)', 'blockloom' ),
		filtered.length - paged.length
	);

	return (
		<div className="blockloom-icon-picker">
			<p
				style={ {
					fontSize: 11,
					fontWeight: 500,
					textTransform: 'uppercase',
					color: '#757575',
					marginBottom: 8,
				} }
			>
				{ __( 'Icon', 'blockloom' ) }
			</p>

			{ /* Preview + toggle button */ }
			<div
				style={ {
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					marginBottom: 30,
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
					{ selected ? (
						renderIconSVG( value, { width: 40, height: 40 } )
					) : (
						<span style={ { color: '#bbb', fontSize: 32 } }>+</span>
					) }
				</span>
				<Button
					variant="secondary"
					size="small"
					onClick={ () => {
						setIsOpen( ( o ) => ! o );
						setPage( 0 );
					} }
				>
					{ selected
						? __( 'Change Icon', 'blockloom' )
						: __( 'Select Icon', 'blockloom' ) }
				</Button>
				{ selected && (
					<Button
						variant="tertiary"
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
					{ /* Filters */ }
					<SelectControl
						value={ styleFilter }
						options={ STYLE_OPTIONS }
						onChange={ ( val ) => {
							setStyleFilter( val );
							setPage( 0 );
						} }
						style={ { marginBottom: 8 } }
					/>
					<TextControl
						placeholder={ __( 'Search icons…', 'blockloom' ) }
						value={ search }
						onChange={ ( val ) => {
							setSearch( val );
							setPage( 0 );
						} }
						style={ { marginBottom: 8 } }
					/>

					{ /* Grid */ }
					<div
						style={ {
							display: 'grid',
							gridTemplateColumns: 'repeat(8, 1fr)',
							gap: 4,
							maxHeight: 240,
							overflowY: 'auto',
						} }
					>
						{ paged.map( ( [ key, data ] ) => (
							<button
								key={ key }
								title={ `${ data.label } (${ data.style })` }
								onClick={ () => {
									onChange( key );
									setIsOpen( false );
									setSearch( '' );
								} }
								style={ {
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									aspectRatio: '1',
									border:
										value === key
											? '2px solid #007cba'
											: '1px solid transparent',
									borderRadius: 4,
									background:
										value === key
											? '#e8f4fd'
											: 'transparent',
									cursor: 'pointer',
									padding: 6,
									fontSize: 16,
									color: '#1e1e1e',
								} }
							>
								{ renderIconSVG( key, {
									width: 16,
									height: 16,
								} ) }
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

					{ /* Load more */ }
					{ hasMore && (
						<Button
							variant="tertiary"
							size="small"
							onClick={ () => setPage( ( p ) => p + 1 ) }
							style={ { marginTop: 8, width: '100%' } }
						>
							{ loadMoreLabel }
						</Button>
					) }
				</div>
			) }
		</div>
	);
}
