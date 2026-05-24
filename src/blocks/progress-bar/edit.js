import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import ColorControl from '../../components/ColorControl';

export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		titleColor,
		fillPercent,
		customLabel,
		barHeight,
		barRadius,
		labelPosition,
		filledColor,
		trackColor,
		valueColor,
		striped,
		animateStripes,
		animateOnScroll,
	} = attributes;

	// Show custom label if provided, otherwise show percentage
	const displayValue =
		customLabel.trim() !== '' ? customLabel : `${ fillPercent }%`;

	const blockProps = useBlockProps( {
		className: 'blockloom-progress-bar',
		style: {
			'--bl-pb-filled': filledColor || '#000000',
			'--bl-pb-track': trackColor || '#E3DEDE',
			'--bl-pb-value': valueColor || undefined,
			'--bl-pb-title': titleColor || undefined,
		},
	} );

	const fillStyle = {
		width: `${ fillPercent }%`,
		borderRadius: barRadius,
	};

	const Bar = (
		<div
			className="blockloom-progress-bar__track"
			style={ { height: barHeight, borderRadius: barRadius } }
		>
			<div
				className={ [
					'blockloom-progress-bar__fill',
					striped ? 'is-striped' : '',
					animateStripes ? 'is-stripes-animated' : '',
				]
					.filter( Boolean )
					.join( ' ' ) }
				style={ fillStyle }
			/>
		</div>
	);

	const Header = ( title || true ) && (
		<div className="blockloom-progress-bar__header">
			<RichText
				tagName="span"
				className="blockloom-progress-bar__title"
				value={ title }
				onChange={ ( val ) => setAttributes( { title: val } ) }
				placeholder={ __( 'Label…', 'blockloom' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				style={ { color: titleColor || undefined } }
			/>
			<span
				className="blockloom-progress-bar__value"
				style={ { color: valueColor || undefined } }
			>
				{ displayValue }
			</span>
		</div>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Progress', 'blockloom' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Fill Percentage', 'blockloom' ) }
						value={ fillPercent }
						onChange={ ( val ) =>
							setAttributes( { fillPercent: val } )
						}
						min={ 0 }
						max={ 100 }
						step={ 1 }
					/>
					<TextControl
						label={ __( 'Custom Label', 'blockloom' ) }
						value={ customLabel }
						onChange={ ( val ) =>
							setAttributes( { customLabel: val } )
						}
						placeholder={ __(
							'Leave empty to show percentage',
							'blockloom'
						) }
						help={ __(
							'Overrides the auto percentage value e.g. "8 / 10 completed"',
							'blockloom'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Bar', 'blockloom' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Height (px)', 'blockloom' ) }
						value={ barHeight }
						onChange={ ( val ) =>
							setAttributes( { barHeight: val } )
						}
						min={ 4 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'blockloom' ) }
						value={ barRadius }
						onChange={ ( val ) =>
							setAttributes( { barRadius: val } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<SelectControl
						label={ __( 'Label Position', 'blockloom' ) }
						value={ labelPosition }
						options={ [
							{
								label: __( 'Above bar', 'blockloom' ),
								value: 'above',
							},
							{
								label: __( 'Below bar', 'blockloom' ),
								value: 'below',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { labelPosition: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Animate on scroll', 'blockloom' ) }
						help={ __(
							'Bar fills when scrolled into view.',
							'blockloom'
						) }
						checked={ animateOnScroll }
						onChange={ ( val ) =>
							setAttributes( { animateOnScroll: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Striped Fill', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Striped', 'blockloom' ) }
						checked={ striped }
						onChange={ ( val ) =>
							setAttributes( { striped: val } )
						}
					/>
					{ striped && (
						<ToggleControl
							label={ __( 'Animate Stripes', 'blockloom' ) }
							help={ __(
								'Stripes move continuously.',
								'blockloom'
							) }
							checked={ animateStripes }
							onChange={ ( val ) =>
								setAttributes( { animateStripes: val } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<ColorControl
						label={ __( 'Fill Color', 'blockloom' ) }
						value={ filledColor }
						onChange={ ( val ) =>
							setAttributes( { filledColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Track Color', 'blockloom' ) }
						value={ trackColor }
						onChange={ ( val ) =>
							setAttributes( { trackColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Title Color', 'blockloom' ) }
						value={ titleColor }
						onChange={ ( val ) =>
							setAttributes( { titleColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Value Color', 'blockloom' ) }
						value={ valueColor }
						onChange={ ( val ) =>
							setAttributes( { valueColor: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ labelPosition === 'above' && Header }
				{ Bar }
				{ labelPosition === 'below' && Header }
			</div>
		</>
	);
}
