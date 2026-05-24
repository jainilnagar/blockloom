import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import ColorControl from '../../components/ColorControl';

const TEMPLATE = [
	[
		'blockloom/faq-item',
		{
			question: 'What is your question?',
			answer: 'Your answer goes here.',
		},
	],
	[
		'blockloom/faq-item',
		{
			question: 'Another frequently asked question?',
			answer: 'Your answer goes here.',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		allowMultiple,
		defaultOpen,
		enableSchema,
		iconStyle,
		iconPosition,
		questionColor,
		answerColor,
		backgroundColor,
		activeBackgroundColor,
		borderColor,
		borderRadius,
		iconColor,
	} = attributes;

	const cssVars = {
		'--bl-faq-question-color': questionColor || undefined,
		'--bl-faq-answer-color': answerColor || undefined,
		'--bl-faq-bg': backgroundColor || undefined,
		'--bl-faq-active-bg': activeBackgroundColor || undefined,
		'--bl-faq-border-color': borderColor || '#e0e0e0',
		'--bl-faq-border-radius': borderRadius
			? `${ borderRadius }px`
			: undefined,
		'--bl-faq-icon-color': iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: `blockloom-faqs icon-${ iconPosition }`,
		style: cssVars,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Accordion Settings', 'blockloom' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __(
							'Allow multiple open at once',
							'blockloom'
						) }
						checked={ allowMultiple }
						onChange={ ( val ) =>
							setAttributes( { allowMultiple: val } )
						}
					/>
					<SelectControl
						label={ __( 'Default State', 'blockloom' ) }
						value={ defaultOpen }
						options={ [
							{
								label: __( 'All Closed', 'blockloom' ),
								value: 'none',
							},
							{
								label: __( 'First Open', 'blockloom' ),
								value: 'first',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { defaultOpen: val } )
						}
					/>
					<ToggleControl
						label={ __(
							'Enable FAQ Schema (JSON-LD)',
							'blockloom'
						) }
						help={ __(
							'Adds FAQPage structured data for SEO.',
							'blockloom'
						) }
						checked={ enableSchema }
						onChange={ ( val ) =>
							setAttributes( { enableSchema: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Icon', 'blockloom' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Icon Style', 'blockloom' ) }
						value={ iconStyle }
						options={ [
							{
								label: __( 'Chevron', 'blockloom' ),
								value: 'chevron',
							},
							{ label: __( 'Plus', 'blockloom' ), value: 'plus' },
							{
								label: __( 'Arrow', 'blockloom' ),
								value: 'arrow',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { iconStyle: val } )
						}
					/>
					<SelectControl
						label={ __( 'Icon Position', 'blockloom' ) }
						value={ iconPosition }
						options={ [
							{
								label: __(
									'After question (right)',
									'blockloom'
								),
								value: 'after',
							},
							{
								label: __(
									'Before question (left)',
									'blockloom'
								),
								value: 'before',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { iconPosition: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<ColorControl
						label={ __( 'Question Color', 'blockloom' ) }
						value={ questionColor }
						onChange={ ( val ) =>
							setAttributes( { questionColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Answer Color', 'blockloom' ) }
						value={ answerColor }
						onChange={ ( val ) =>
							setAttributes( { answerColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Item Background', 'blockloom' ) }
						value={ backgroundColor }
						onChange={ ( val ) =>
							setAttributes( { backgroundColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Active Item Background', 'blockloom' ) }
						value={ activeBackgroundColor }
						onChange={ ( val ) =>
							setAttributes( { activeBackgroundColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Border Color', 'blockloom' ) }
						value={ borderColor }
						onChange={ ( val ) =>
							setAttributes( { borderColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Icon Color', 'blockloom' ) }
						value={ iconColor }
						onChange={ ( val ) =>
							setAttributes( { iconColor: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border Radius', 'blockloom' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Border Radius (px)', 'blockloom' ) }
						value={ borderRadius }
						onChange={ ( val ) =>
							setAttributes( { borderRadius: val } )
						}
						min={ 0 }
						max={ 24 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ [ 'blockloom/faq-item' ] }
				/>
			</div>
		</>
	);
}
