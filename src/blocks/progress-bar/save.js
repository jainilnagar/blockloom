import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	const displayValue =
		customLabel.trim() !== '' ? customLabel : `${ fillPercent }%`;

	const blockProps = useBlockProps.save( {
		className: 'blockloom-progress-bar',
		style: {
			'--bl-pb-filled': filledColor || '#000000',
			'--bl-pb-track': trackColor || '#E3DEDE',
			'--bl-pb-value': valueColor || undefined,
			'--bl-pb-title': titleColor || undefined,
		},
	} );

	const fillClasses = [
		'blockloom-progress-bar__fill',
		striped ? 'is-striped' : '',
		animateStripes ? 'is-stripes-animated' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const Bar = (
		<div
			className={ `blockloom-progress-bar__track${
				animateOnScroll ? ' is-animated' : ''
			}` }
			style={ { height: barHeight, borderRadius: barRadius } }
			data-fill={ fillPercent }
		>
			<div
				className={ fillClasses }
				style={ {
					// Start at 0 if animated, full width if not
					width: animateOnScroll ? '0%' : `${ fillPercent }%`,
					borderRadius: barRadius,
					transition: animateOnScroll ? 'width 0.8s ease' : undefined,
				} }
			/>
		</div>
	);

	const Header = (
		<div className="blockloom-progress-bar__header">
			<RichText.Content
				tagName="span"
				className="blockloom-progress-bar__title"
				value={ title }
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
		<div { ...blockProps }>
			{ labelPosition === 'above' && Header }
			{ Bar }
			{ labelPosition === 'below' && Header }
		</div>
	);
}
