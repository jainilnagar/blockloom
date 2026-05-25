/**
 * Returns a raw SVG string for a given icon key.
 * Used in save.js to output inline SVG in the saved HTML.
 * Import is tree-shaken — only used icons' paths end up in the output.
 */
import ICONS from '../../data/icons.json';

export default function getIconSVG( iconKey, extraProps = {} ) {
	const icon = ICONS[ iconKey ];
	if ( ! icon ) {
		return null;
	}

	const { className = '', style = {}, size } = extraProps;

	const svgStyle = {
		display: 'block',
		width: size ? `${ size }px` : '1em',
		height: size ? `${ size }px` : '1em',
		...style,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={ icon.viewBox }
			fill="currentColor"
			aria-hidden="true"
			className={ className || undefined }
			style={ svgStyle }
		>
			{ icon.path.map( ( d, i ) => (
				<path key={ i } d={ d } />
			) ) }
		</svg>
	);
}
