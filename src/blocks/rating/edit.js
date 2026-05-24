import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import ColorControl from '../../components/ColorControl';
import StarRating from '../../components/StarRating';

function formatNumeric( rating, format ) {
	switch ( format ) {
		case 'value':
			return `${ rating }`;
		case 'value-scale':
			return `${ rating } / 5`;
		case 'value-text':
			return `${ rating } out of 5`;
		default:
			return `${ rating }`;
	}
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		displayStyle,
		rating,
		showNumeric,
		numericFormat,
		starSize,
		barHeight,
		barRadius,
		title,
		titleTag,
		titleColor,
		filledColor,
		emptyColor,
		numericColor,
		alignment,
		enableSchema,
		schemaItemName,
		schemaRatingCount,
		barAnimateOnScroll,
	} = attributes;

	const TitleTag = titleTag;

	const blockProps = useBlockProps( {
		className: `blockloom-rating align-${ alignment }`,
		style: {
			textAlign: alignment,
			'--bl-rating-align': alignment || 'left',
			'--bl-rating-filled': filledColor || '#f59e0b',
			'--bl-rating-empty': emptyColor || '#e5e7eb',
			'--bl-rating-numeric': numericColor || undefined,
		},
	} );

	const fillPercent = ( rating / 5 ) * 100;

	const numericFontSize =
		displayStyle === 'stars'
			? starSize * 0.8 // 60% of star size — so 32px stars = ~19px number
			: barHeight * 1.6; // 180% of bar height — so 12px bar = ~22px number

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
					title={ __( 'Rating', 'blockloom' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Display Style', 'blockloom' ) }
						value={ displayStyle }
						options={ [
							{
								label: __( 'Stars', 'blockloom' ),
								value: 'stars',
							},
							{ label: __( 'Bar', 'blockloom' ), value: 'bar' },
						] }
						onChange={ ( val ) =>
							setAttributes( { displayStyle: val } )
						}
					/>
					<RangeControl
						label={ __( 'Rating (out of 5)', 'blockloom' ) }
						value={ rating }
						onChange={ ( val ) => setAttributes( { rating: val } ) }
						min={ 0 }
						max={ 5 }
						step={ 0.5 }
					/>
					{ displayStyle === 'stars' && (
						<RangeControl
							label={ __( 'Star Size (px)', 'blockloom' ) }
							value={ starSize }
							onChange={ ( val ) =>
								setAttributes( { starSize: val } )
							}
							min={ 16 }
							max={ 64 }
						/>
					) }
					{ displayStyle === 'bar' && (
						<>
							<RangeControl
								label={ __( 'Bar Height (px)', 'blockloom' ) }
								value={ barHeight }
								onChange={ ( val ) =>
									setAttributes( { barHeight: val } )
								}
								min={ 4 }
								max={ 32 }
							/>
							<RangeControl
								label={ __(
									'Bar Border Radius (px)',
									'blockloom'
								) }
								value={ barRadius }
								onChange={ ( val ) =>
									setAttributes( { barRadius: val } )
								}
								min={ 0 }
								max={ 32 }
							/>
							<ToggleControl
								label={ __( 'Animate on scroll', 'blockloom' ) }
								help={ __(
									'Bar fills when scrolled into view.',
									'blockloom'
								) }
								checked={ barAnimateOnScroll }
								onChange={ ( val ) =>
									setAttributes( { barAnimateOnScroll: val } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Numeric Value', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Numeric Value', 'blockloom' ) }
						checked={ showNumeric }
						onChange={ ( val ) =>
							setAttributes( { showNumeric: val } )
						}
					/>
					{ showNumeric && (
						<>
							<SelectControl
								label={ __( 'Format', 'blockloom' ) }
								value={ numericFormat }
								options={ [
									{
										label: __( '4.5', 'blockloom' ),
										value: 'value',
									},
									{
										label: __( '4.5 / 5', 'blockloom' ),
										value: 'value-scale',
									},
									{
										label: __(
											'4.5 out of 5',
											'blockloom'
										),
										value: 'value-text',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { numericFormat: val } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Title', 'blockloom' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Title Text', 'blockloom' ) }
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'e.g. Overall Rating', 'blockloom' ) }
					/>
					{ title && (
						<SelectControl
							label={ __( 'Title Tag', 'blockloom' ) }
							value={ titleTag }
							options={ [ 'p', 'h3', 'h4', 'h5' ].map(
								( t ) => ( {
									label: t.toUpperCase(),
									value: t,
								} )
							) }
							onChange={ ( val ) =>
								setAttributes( { titleTag: val } )
							}
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Schema', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Enable AggregateRating Schema',
							'blockloom'
						) }
						help={ __(
							'Adds JSON-LD structured data for SEO.',
							'blockloom'
						) }
						checked={ enableSchema }
						onChange={ ( val ) =>
							setAttributes( { enableSchema: val } )
						}
					/>
					{ enableSchema && (
						<>
							<TextControl
								label={ __( 'Item Name', 'blockloom' ) }
								value={ schemaItemName }
								onChange={ ( val ) =>
									setAttributes( { schemaItemName: val } )
								}
								placeholder={ __(
									'e.g. Blockloom Plugin',
									'blockloom'
								) }
								help={ __(
									'The name of the thing being rated.',
									'blockloom'
								) }
							/>
							<RangeControl
								label={ __( 'Rating Count', 'blockloom' ) }
								value={ schemaRatingCount }
								onChange={ ( val ) =>
									setAttributes( { schemaRatingCount: val } )
								}
								min={ 1 }
								max={ 100000 }
								help={ __(
									'Total number of ratings received.',
									'blockloom'
								) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<ColorControl
						label={ __( 'Filled Color', 'blockloom' ) }
						value={ filledColor }
						onChange={ ( val ) =>
							setAttributes( { filledColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Empty Color', 'blockloom' ) }
						value={ emptyColor }
						onChange={ ( val ) =>
							setAttributes( { emptyColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Numeric Value Color', 'blockloom' ) }
						value={ numericColor }
						onChange={ ( val ) =>
							setAttributes( { numericColor: val } )
						}
					/>
					{ title && (
						<ColorControl
							label={ __( 'Title Color', 'blockloom' ) }
							value={ titleColor }
							onChange={ ( val ) =>
								setAttributes( { titleColor: val } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>

			{ /* Editor preview */ }
			<div { ...blockProps }>
				{ title && (
					<TitleTag
						className="blockloom-rating__title"
						style={ { color: titleColor || undefined } }
					>
						{ title }
					</TitleTag>
				) }

				<div className="blockloom-rating__row">
					{ displayStyle === 'stars' && (
						<StarRating
							rating={ rating }
							size={ starSize }
							uid="edit"
						/>
					) }

					{ displayStyle === 'bar' && (
						<span
							className="blockloom-rating__bar-wrap"
							style={ {
								height: barHeight,
								borderRadius: barRadius,
							} }
						>
							<span
								className="blockloom-rating__bar-fill"
								style={ {
									width: `${ fillPercent }%`,
									borderRadius: barRadius,
								} }
							/>
						</span>
					) }

					{ showNumeric && (
						<span
							className="blockloom-rating__numeric"
							style={ { fontSize: numericFontSize } }
						>
							{ formatNumeric( rating, numericFormat ) }
						</span>
					) }
				</div>
			</div>
		</>
	);
}
