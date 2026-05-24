import { useBlockProps } from '@wordpress/block-editor';
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

export default function save( { attributes } ) {
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
	const fillPercent = ( rating / 5 ) * 100;

	const blockProps = useBlockProps.save( {
		className: `blockloom-rating align-${ alignment }`,
		style: {
			textAlign: alignment,
			'--bl-rating-align': alignment || 'left',
			'--bl-rating-filled': filledColor || '#f59e0b',
			'--bl-rating-empty': emptyColor || '#e5e7eb',
			'--bl-rating-numeric': numericColor || undefined,
		},
		// Schema data attrs read by frontend.js
		'data-schema': enableSchema ? 'true' : undefined,
		'data-item-name': enableSchema ? schemaItemName : undefined,
		'data-rating-value': enableSchema ? String( rating ) : undefined,
		'data-rating-count': enableSchema
			? String( schemaRatingCount )
			: undefined,
	} );

	const numericFontSize =
		displayStyle === 'stars'
			? starSize * 0.8 // 60% of star size — so 32px stars = ~19px number
			: barHeight * 1.6; // 180% of bar height — so 12px bar = ~22px number

	return (
		<div { ...blockProps }>
			{ title && (
				<TitleTag
					className="blockloom-rating__title"
					style={ { color: titleColor || undefined } }
				>
					{ title }
				</TitleTag>
			) }

			<div
				className="blockloom-rating__row"
				role="img"
				aria-label={ `Rated ${ rating } out of 5` }
			>
				{ displayStyle === 'stars' && (
					<StarRating rating={ rating } size={ starSize } uid="s" />
				) }

				{ displayStyle === 'bar' && (
					<span
						className={ `blockloom-rating__bar-wrap${
							barAnimateOnScroll ? ' is-animated' : ''
						}` }
						style={ { height: barHeight, borderRadius: barRadius } }
						data-fill={ fillPercent }
					>
						<span
							className="blockloom-rating__bar-fill"
							style={ {
								// In editor shows full width; frontend.js handles animation
								width: barAnimateOnScroll
									? '0%'
									: `${ fillPercent }%`,
								borderRadius: barRadius,
								transition: barAnimateOnScroll
									? 'width 0.8s ease'
									: undefined,
							} }
						/>
					</span>
				) }

				{ showNumeric && (
					<span
						className="blockloom-rating__numeric"
						style={ { fontSize: numericFontSize } }
						aria-hidden="true"
					>
						{ formatNumeric( rating, numericFormat ) }
					</span>
				) }
			</div>
		</div>
	);
}
