import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

const ICONS = {
	chevron: (
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
	),
	plus: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			width="20"
			height="20"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
	arrow: (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			width="20"
			height="20"
		>
			<polyline points="9 6 15 12 9 18" />
		</svg>
	),
};

export default function Edit( { attributes, setAttributes, context } ) {
	const { question, answer } = attributes;
	const iconStyle = context[ 'blockloom/iconStyle' ] || 'chevron';

	const blockProps = useBlockProps( {
		className: 'blockloom-faq-item is-editor',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="blockloom-faq-item__trigger"
				style={ { pointerEvents: 'none' } }
			>
				<RichText
					tagName="span"
					className="blockloom-faq-item__question"
					value={ question }
					onChange={ ( val ) => setAttributes( { question: val } ) }
					placeholder={ __( 'Question…', 'blockloom' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
				<span className="blockloom-faq-item__icon" aria-hidden="true">
					{ ICONS[ iconStyle ] }
				</span>
			</div>
			<div
				className="blockloom-faq-item__answer"
				style={ { maxHeight: 'none', display: 'block' } }
			>
				<div className="blockloom-faq-item__answer-inner">
					<RichText
						tagName="p"
						value={ answer }
						onChange={ ( val ) => setAttributes( { answer: val } ) }
						placeholder={ __( 'Answer…', 'blockloom' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/link',
						] }
					/>
				</div>
			</div>
		</div>
	);
}
