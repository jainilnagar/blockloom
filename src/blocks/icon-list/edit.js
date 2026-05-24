import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import MultiColorControl from '../../components/MultiColorControl';
import IconPicker from '../../components/IconPicker';

const TEMPLATE = [
	[ 'blockloom/icon-list-item', { text: 'First item' } ],
	[ 'blockloom/icon-list-item', { text: 'Second item' } ],
	[ 'blockloom/icon-list-item', { text: 'Third item' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		layout,
		columns,
		gap,
		listIconName,
		iconSize,
		lineHeight,
		iconColor,
		iconHoverColor,
		textColor,
		textHoverColor,
		iconPosition,
		iconSpacing,
		showDivider,
		dividerColor,
		dividerHoverColor,
		alignment,
	} = attributes;

	const listColumns = layout === 'horizontal' && columns === 1 ? 2 : columns;

	const cssVars = {
		'--bl-list-gap': `${ gap }px`,
		'--bl-list-icon-color': iconColor || undefined,
		'--bl-list-icon-hover-color': iconHoverColor || iconColor || undefined,
		'--bl-list-text-color': textColor || undefined,
		'--bl-list-text-hover-color': textHoverColor || textColor || undefined,
		'--bl-list-divider-color': dividerColor || '#e0e0e0',
		'--bl-list-divider-hover-color':
			dividerHoverColor || dividerColor || '#e0e0e0',
		'--bl-list-icon-spacing': `${ iconSpacing }px`,
		'--bl-list-icon-position': iconPosition,
		'--bl-list-icon-size': `${ iconSize }px`,
		'--bl-list-grid-cols': `repeat(${ listColumns }, 1fr)`,
	};

	const listStyle = {
		...cssVars,
		columnGap: '15px',
		rowGap: `${ gap }px`,
		textAlign: alignment,
		lineHeight,
		listStyle: 'none',
		margin: 0,
		padding: 0,
	};

	const blockProps = useBlockProps( {
		className: `blockloom-icon-list layout-${ layout }${
			showDivider ? ' has-divider' : ''
		} align-${ alignment }`,
		style: listStyle,
	} );

	const ALIGNMENT_LABELS = {
		left: __( 'Align left', 'blockloom' ),
		center: __( 'Align center', 'blockloom' ),
		right: __( 'Align right', 'blockloom' ),
		justify: __( 'Align justify', 'blockloom' ),
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ [
						[ 'left', alignLeft ],
						[ 'center', alignCenter ],
						[ 'right', alignRight ],
					].map( ( [ align, icon ] ) => (
						<ToolbarButton
							key={ align }
							icon={ icon }
							label={
								ALIGNMENT_LABELS[ align ] ||
								__( 'Align', 'blockloom' )
							}
							isActive={ alignment === align }
							onClick={ () =>
								setAttributes( { alignment: align } )
							}
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Layout', 'blockloom' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Direction', 'blockloom' ) }
						value={ layout }
						options={ [
							{
								label: __( 'Vertical', 'blockloom' ),
								value: 'vertical',
							},
							{
								label: __( 'Horizontal', 'blockloom' ),
								value: 'horizontal',
							},
						] }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
					/>
					{ layout === 'horizontal' && (
						<RangeControl
							label={ __( 'Columns', 'blockloom' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 2 }
							max={ 4 }
						/>
					) }
					<RangeControl
						label={ __( 'Gap between items (px)', 'blockloom' ) }
						value={ gap }
						onChange={ ( val ) => setAttributes( { gap: val } ) }
						min={ 0 }
						max={ 64 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Icon', 'blockloom' ) }
					initialOpen={ false }
				>
					<IconPicker
						value={ listIconName }
						onChange={ ( val ) =>
							setAttributes( { listIconName: val } )
						}
					/>
					<RangeControl
						label={ __( 'Icon Size (px)', 'blockloom' ) }
						value={ iconSize }
						onChange={ ( val ) =>
							setAttributes( { iconSize: val } )
						}
						min={ 12 }
						max={ 64 }
					/>
					<SelectControl
						label={ __( 'Icon Position', 'blockloom' ) }
						value={ iconPosition }
						options={ [
							{
								label: __( 'Before text', 'blockloom' ),
								value: 'before',
							},
							{
								label: __( 'After text', 'blockloom' ),
								value: 'after',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { iconPosition: val } )
						}
					/>
					<RangeControl
						label={ __( 'Icon / Text Spacing (px)', 'blockloom' ) }
						value={ iconSpacing }
						onChange={ ( val ) =>
							setAttributes( { iconSpacing: val } )
						}
						min={ 4 }
						max={ 48 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Divider', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Divider', 'blockloom' ) }
						checked={ showDivider }
						onChange={ ( val ) =>
							setAttributes( { showDivider: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<MultiColorControl
						attributes={ attributes }
						setAttributes={ setAttributes }
						settings={ [
							{
								label: __( 'Icon Color', 'blockloom' ),
								valueKey: 'iconColor',
								hoverKey: 'iconHoverColor',
							},
							{
								label: __( 'Text Color', 'blockloom' ),
								valueKey: 'textColor',
								hoverKey: 'textHoverColor',
							},
							{
								label: __( 'Divider Color', 'blockloom' ),
								valueKey: 'dividerColor',
								hoverKey: 'dividerHoverColor',
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Typography', 'blockloom' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Line Height', 'blockloom' ) }
						value={ lineHeight }
						onChange={ ( val ) =>
							setAttributes( { lineHeight: val } )
						}
						min={ 1 }
						max={ 3 }
						step={ 0.1 }
					/>
				</PanelBody>
			</InspectorControls>

			<ul { ...blockProps }>
				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ [ 'blockloom/icon-list-item' ] }
				/>
			</ul>
		</>
	);
}
