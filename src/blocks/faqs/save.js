import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
		className: `blockloom-faqs icon-${ iconPosition }`,
		style: {
			'--bl-faq-question-color': questionColor || undefined,
			'--bl-faq-answer-color': answerColor || undefined,
			'--bl-faq-bg': backgroundColor || undefined,
			'--bl-faq-active-bg': activeBackgroundColor || undefined,
			'--bl-faq-border-color': borderColor || '#e0e0e0',
			'--bl-faq-border-radius': borderRadius
				? `${ borderRadius }px`
				: undefined,
			'--bl-faq-icon-color': iconColor || undefined,
		},
		'data-allow-multiple': allowMultiple ? 'true' : 'false',
		'data-default-open': defaultOpen,
		'data-icon-style': iconStyle,
		'data-schema': enableSchema ? 'true' : 'false',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
