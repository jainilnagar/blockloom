import { useBlockProps, RichText } from '@wordpress/block-editor';
import getIconSVG from '../../components/getIconSVG';

const RADIUS_MAP = { none: '0px', rounded: '8px', circle: '50%' };

export default function save( { attributes } ) {
	const {
		iconName,
		iconSize,
		iconColor,
		iconHoverColor,
		iconBackgroundColor,
		iconBgHoverColor,
		iconBorderRadius,
		iconPadding,
		layout,
		contentAlign,
		titleTag,
		title,
		titleColor,
		titleHoverColor,
		description,
		descriptionColor,
		descriptionHoverColor,
		backgroundColor,
		hoverBgColor,
		hoverBorderColor,
		borderWidth,
		borderColor,
		borderRadius,
		boxShadow,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		ctaText,
		ctaColor,
		ctaHoverColor,
		ctaUrl,
		ctaNewTab,
	} = attributes;

	const iconTotalSize = iconSize + iconPadding * 2;

	const boxStyle = {
		borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
		borderStyle: 'solid',
		borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
		boxShadow: boxShadow ? '0 4px 16px rgba(0,0,0,0.08)' : undefined,
		padding: `${ paddingTop }px ${ paddingRight }px ${ paddingBottom }px ${ paddingLeft }px`,
		'--bl-icon-color': iconColor || 'currentColor',
		'--bl-icon-bg': iconBackgroundColor || 'transparent',
		'--bl-icon-hover-color': iconHoverColor || undefined,
		'--bl-icon-hover-bg': iconBgHoverColor || undefined,
		'--bl-ib-bg': backgroundColor || undefined,
		'--bl-ib-border': borderColor || undefined,
		'--bl-ib-hover-bg': hoverBgColor || undefined,
		'--bl-ib-hover-border': hoverBorderColor || undefined,
		'--bl-title-color': titleColor || 'currentColor',
		'--bl-title-hover-color': titleHoverColor || undefined,
		'--bl-desc-color': descriptionColor || 'currentColor',
		'--bl-desc-hover-color': descriptionHoverColor || undefined,
		'--bl-cta-color': ctaColor || 'currentColor',
		'--bl-cta-hover-color': ctaHoverColor || undefined,
	};

	const iconWrapStyle = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: `${ iconTotalSize }px`,
		height: `${ iconTotalSize }px`,
		borderRadius: RADIUS_MAP[ iconBorderRadius ],
		flexShrink: 0,
	};

	const blockProps = useBlockProps.save( {
		className: `blockloom-info-box layout-${ layout } align-${ contentAlign }`,
		style: boxStyle,
	} );

	return (
		<div { ...blockProps }>
			{ iconName && (
				<span
					className="blockloom-info-box__icon"
					style={ iconWrapStyle }
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
			) }
			<div className="blockloom-info-box__content">
				{ title && (
					<RichText.Content
						tagName={ titleTag }
						className="blockloom-info-box__title"
						value={ title }
					/>
				) }
				{ description && (
					<RichText.Content
						tagName="p"
						className="blockloom-info-box__description"
						value={ description }
					/>
				) }
				{ ctaText && (
					<a
						className="blockloom-info-box__cta"
						href={ ctaUrl }
						target={ ctaNewTab ? '_blank' : undefined }
						rel={ ctaNewTab ? 'noopener noreferrer' : undefined }
					>
						{ ctaText }
					</a>
				) }
			</div>
		</div>
	);
}
