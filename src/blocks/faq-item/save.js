import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { question, answer } = attributes;

	if ( ! question && ! answer ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'blockloom-faq-item',
	} );

	return (
		<div { ...blockProps }>
			<button
				className="blockloom-faq-item__trigger"
				aria-expanded="false"
				type="button"
			>
				<RichText.Content
					tagName="span"
					className="blockloom-faq-item__question"
					value={ question }
				/>
				<span className="blockloom-faq-item__icon" aria-hidden="true">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						width="20"
						height="20"
					>
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</span>
			</button>
			<div className="blockloom-faq-item__answer" role="region">
				<div className="blockloom-faq-item__answer-inner">
					<div className="blockloom-faq-item__answer-content">
						<RichText.Content tagName="p" value={ answer } />
					</div>
				</div>
			</div>
		</div>
	);
}
