import { useBlockProps, RichText } from '@wordpress/block-editor';
import getIconSVG from '../../components/getIconSVG';

const SHAPE_RADIUS = { square: '0px', rounded: '12px', circle: '50%' };

const SOCIALS = [
	{ key: 'socialLinkedIn', label: 'LinkedIn', iconKey: 'brands/linkedin-in' },
	{ key: 'socialTwitter', label: 'X / Twitter', iconKey: 'brands/x-twitter' },
	{ key: 'socialGitHub', label: 'GitHub', iconKey: 'brands/github' },
	{ key: 'socialFacebook', label: 'Facebook', iconKey: 'brands/facebook-f' },
	{ key: 'socialInstagram', label: 'Instagram', iconKey: 'brands/instagram' },
	{ key: 'socialYouTube', label: 'YouTube', iconKey: 'brands/youtube' },
];

export default function save( { attributes } ) {
	const {
		mediaUrl,
		mediaAlt,
		imagePosition,
		imageShape,
		imageSize,
		name,
		nameColor,
		designation,
		designationColor,
		bio,
		bioColor,
		showBio,
		showDesignation,
		showSocial,
		socialLinkedIn,
		socialTwitter,
		socialGitHub,
		socialFacebook,
		socialInstagram,
		socialYouTube,
		socialCustom,
		socialCustomLabel,
		socialIconOnly,
		socialIconShape,
		socialIconColor,
		socialHoverColor,
		socialGap,
		backgroundColor,
		borderWidth,
		borderColor,
		borderRadius,
		boxShadow,
		textAlignment,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
	} = attributes;

	const cardStyle = {
		backgroundColor: backgroundColor || undefined,
		border: borderWidth
			? `${ borderWidth }px solid ${ borderColor || '#e0e0e0' }`
			: undefined,
		borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
		boxShadow: boxShadow ? '0 4px 16px rgba(0,0,0,0.08)' : undefined,
		padding: `${ paddingTop }px ${ paddingRight }px ${ paddingBottom }px ${ paddingLeft }px`,
		textAlign: textAlignment,
		flexDirection: imagePosition === 'top' ? 'column' : 'row',
		alignItems: imagePosition === 'left' ? 'center' : undefined,
		'--bl-tm-social-color': socialIconColor || 'currentColor',
		'--bl-tm-social-hover-color':
			socialHoverColor || socialIconColor || undefined,
		'--bl-tm-social-gap': `${ socialGap }px`,
	};

	const imgStyle = {
		width: `${ imageSize }px`,
		height: `${ imageSize }px`,
		borderRadius: SHAPE_RADIUS[ imageShape ],
		objectFit: 'cover',
		display: 'block',
		margin: textAlignment === 'center' ? '0 auto' : '0 0',
		maxWidth: '100%',
	};

	const socialAttrValues = {
		socialLinkedIn,
		socialTwitter,
		socialGitHub,
		socialFacebook,
		socialInstagram,
		socialYouTube,
	};

	const blockProps = useBlockProps.save( {
		className: `blockloom-team-member image-${ imagePosition } text-${ textAlignment } ${
			socialIconOnly ? ' icons-only' : ''
		} ${
			socialIconShape !== 'default' ? ' icons-styled' : ''
		} icon-${ socialIconShape }`,
		'data-person-schema': attributes.enablePersonSchema
			? 'true'
			: undefined,
		style: cardStyle,
	} );

	return (
		<div { ...blockProps }>
			{ mediaUrl && (
				<div className="blockloom-team-member__image-wrap">
					<img
						src={ mediaUrl }
						alt={ mediaAlt }
						style={ imgStyle }
						loading="lazy"
						decoding="async"
						width={ imageSize }
						height={ imageSize }
					/>
				</div>
			) }

			<div className="blockloom-team-member__info">
				<RichText.Content
					tagName="h3"
					className="blockloom-team-member__name"
					value={ name }
					style={ { color: nameColor || undefined } }
				/>

				{ showDesignation && designation && (
					<RichText.Content
						tagName="p"
						className="blockloom-team-member__designation"
						value={ designation }
						style={ { color: designationColor || undefined } }
					/>
				) }

				{ showBio && bio && (
					<RichText.Content
						tagName="p"
						className="blockloom-team-member__bio"
						value={ bio }
						style={ { color: bioColor || undefined } }
					/>
				) }

				{ showSocial && (
					<div
						className="blockloom-team-member__social"
						style={ { gap: `${ socialGap }px` } }
					>
						{ SOCIALS.filter(
							( { key } ) => socialAttrValues[ key ]
						).map( ( { key, label, iconKey } ) => (
							<a
								key={ key }
								href={ socialAttrValues[ key ] }
								className="blockloom-team-member__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={ label }
							>
								<span className="blockloom-team-member__social-icon">
									{ getIconSVG( iconKey, { size: 18 } ) }
								</span>
								{ ! socialIconOnly && (
									<span className="blockloom-team-member__social-label">
										{ label }
									</span>
								) }
							</a>
						) ) }
						{ socialCustom && (
							<a
								href={ socialCustom }
								className="blockloom-team-member__social-link"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={ socialCustomLabel }
							>
								<span className="blockloom-team-member__social-icon">
									{ getIconSVG( 'solid/globe', {
										size: 18,
									} ) }
								</span>
								{ ! socialIconOnly && (
									<span className="blockloom-team-member__social-label">
										{ socialCustomLabel }
									</span>
								) }
							</a>
						) }
					</div>
				) }
			</div>
		</div>
	);
}
