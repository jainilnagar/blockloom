import { useBlockProps } from '@wordpress/block-editor';
import getIconSVG from '../../components/getIconSVG';

const RADIUS_MAP = { none: '0px', rounded: '8px', circle: '50%' };

export default function save( { attributes } ) {
	const {
		iconName,
		iconSize,
		iconColor,
		iconHoverColor,
		backgroundColor,
		bgHoverColor,
		borderRadius,
		padding,
		accessibilityLabel,
		linkUrl,
		linkNewTab,
		linkRel,
		alignment,
		hoverAnimation,
	} = attributes;

	const totalSize = iconSize + padding * 2;

	const wrapperStyle = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		verticalAlign: 'middle',
		width: `${ totalSize }px`,
		height: `${ totalSize }px`,
		borderRadius: RADIUS_MAP[ borderRadius ],
		lineHeight: 1,
	};

	const blockProps = useBlockProps.save( {
		className: `blockloom-icon align-${ alignment }`,
		style: {
			textAlign: alignment,
			lineHeight: 1,
			'--bl-icon-color': iconColor || 'currentColor',
			'--bl-icon-bg': backgroundColor || 'transparent',
			'--bl-icon-hover-color':
				iconHoverColor || iconColor || 'currentColor',
			'--bl-icon-hover-bg':
				bgHoverColor || backgroundColor || 'transparent',
		},
	} );

	const IconEl = (
		<span
			className={ `blockloom-icon__wrapper hover-${ hoverAnimation }` }
			style={ wrapperStyle }
			aria-label={ accessibilityLabel || undefined }
			role={ accessibilityLabel ? 'img' : undefined }
		>
			<span
				style={ {
					width: iconSize,
					height: iconSize,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				} }
			>
				{ getIconSVG( iconName, { size: iconSize } ) }
			</span>
		</span>
	);

	let linkedIcon = IconEl;
	if ( linkUrl ) {
		if ( linkNewTab ) {
			linkedIcon = (
				<a
					href={ linkUrl }
					className="blockloom-icon__link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={ accessibilityLabel || undefined }
				>
					{ IconEl }
				</a>
			);
		} else {
			linkedIcon = (
				<a
					href={ linkUrl }
					className="blockloom-icon__link"
					rel={ linkRel || undefined }
					aria-label={ accessibilityLabel || undefined }
				>
					{ IconEl }
				</a>
			);
		}
	}

	return <div { ...blockProps }>{ linkedIcon }</div>;
}
