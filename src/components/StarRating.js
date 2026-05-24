/**
 * StarRating — renders 5 SVG stars (full, half, or empty) based on a rating value.
 * Uses a unique linearGradient ID per instance for half-star support.
 * Color is driven by CSS custom properties set on the parent block wrapper.
 */

const SCALE = 5;

/**
 * Returns the star type for a given slot index.
 *
 * @param {number} rating The rating value (e.g. 4.5)
 * @param {number} index  Zero-based star slot index (0–4)
 * @return {'full'|'half'|'empty'} Star display type
 */
function getStarType( rating, index ) {
	const slot = index + 1;
	if ( rating >= slot ) {
		return 'full';
	}
	if ( rating >= slot - 0.5 ) {
		return 'half';
	}
	return 'empty';
}

/**
 * Single SVG star.
 *
 * @param {Object}                props
 * @param {'full'|'half'|'empty'} props.type
 * @param {number}                props.size       Width/height in px
 * @param {string}                props.gradientId Unique ID for the half-star gradient
 */
function Star( { type, size, gradientId } ) {
	const starPath =
		'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
	let fill = 'var(--bl-rating-empty, #e5e7eb)';
	if ( type === 'full' ) {
		fill = 'var(--bl-rating-filled, #f59e0b)';
	} else if ( type === 'half' ) {
		fill = `url(#${ gradientId })`;
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ size }
			height={ size }
			viewBox="0 0 24 24"
			aria-hidden="true"
			style={ { display: 'block', flexShrink: 0 } }
		>
			{ type === 'half' && (
				<defs>
					<linearGradient
						id={ gradientId }
						x1="0"
						x2="1"
						y1="0"
						y2="0"
					>
						<stop
							offset="50%"
							stopColor="var(--bl-rating-filled, #f59e0b)"
						/>
						<stop
							offset="50%"
							stopColor="var(--bl-rating-empty, #e5e7eb)"
						/>
					</linearGradient>
				</defs>
			) }
			<path d={ starPath } fill={ fill } stroke="none" />
		</svg>
	);
}

/**
 * Renders a row of 5 stars for the given rating.
 *
 * @param {Object} props
 * @param {number} props.rating 0–5, supports 0.5 increments
 * @param {number} props.size   Star size in px
 * @param {string} props.uid    Unique string to namespace gradient IDs
 */
export default function StarRating( { rating, size = 32, uid = 'r' } ) {
	return (
		<span
			className="blockloom-rating__stars"
			role="img"
			style={ {
				display: 'inline-flex',
				alignItems: 'center',
				gap: 2,
				lineHeight: 1,
			} }
		>
			{ Array.from( { length: SCALE }, ( _, i ) => {
				const type = getStarType( rating, i );
				const gradientId = `bl-half-${ uid }-${ i }`;
				return (
					<Star
						key={ i }
						type={ type }
						size={ size }
						gradientId={ gradientId }
					/>
				);
			} ) }
		</span>
	);
}

export { getStarType };
