import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { alignLeft, alignCenter } from '@wordpress/icons';
import ColorControl from '../../components/ColorControl';
import PaddingControl from '../../components/PaddingControl';
import { renderIconSVG } from '../../components/IconPicker';

const SHAPE_RADIUS = { square: '0px', rounded: '12px', circle: '50%' };

const SOCIALS = [
	{ key: 'socialLinkedIn', label: 'LinkedIn', iconKey: 'brands/linkedin-in' },
	{ key: 'socialTwitter', label: 'X / Twitter', iconKey: 'brands/x-twitter' },
	{ key: 'socialGitHub', label: 'GitHub', iconKey: 'brands/github' },
	{ key: 'socialFacebook', label: 'Facebook', iconKey: 'brands/facebook-f' },
	{ key: 'socialInstagram', label: 'Instagram', iconKey: 'brands/instagram' },
	{ key: 'socialYouTube', label: 'YouTube', iconKey: 'brands/youtube' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		mediaId,
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
		enablePersonSchema,
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

	const blockProps = useBlockProps( {
		className: `blockloom-team-member image-${ imagePosition } text-${ textAlignment } ${
			socialIconOnly ? ' icons-only' : ''
		} ${
			socialIconShape !== 'default' ? ' icons-styled' : ''
		} icon-${ socialIconShape }`,
		style: cardStyle,
	} );

	const ALIGNMENT_LABELS = {
		left: __( 'Align left', 'blockloom' ),
		center: __( 'Align center', 'blockloom' ),
		right: __( 'Align right', 'blockloom' ),
		justify: __( 'Align justify', 'blockloom' ),
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ [
						[ 'left', alignLeft ],
						[ 'center', alignCenter ],
					].map( ( [ align, icon ] ) => (
						<ToolbarButton
							key={ align }
							icon={ icon }
							label={
								ALIGNMENT_LABELS[ align ] ||
								__( 'Align', 'blockloom' )
							}
							isActive={ textAlignment === align }
							onClick={ () =>
								setAttributes( { textAlignment: align } )
							}
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Image', 'blockloom' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Image Position', 'blockloom' ) }
						value={ imagePosition }
						options={ [
							{
								label: __( 'Top', 'blockloom' ),
								value: 'top',
							},
							{
								label: __( 'Left', 'blockloom' ),
								value: 'left',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { imagePosition: val } )
						}
					/>
					<SelectControl
						label={ __( 'Image Shape', 'blockloom' ) }
						value={ imageShape }
						options={ [
							{
								label: __( 'Square', 'blockloom' ),
								value: 'square',
							},
							{
								label: __( 'Rounded', 'blockloom' ),
								value: 'rounded',
							},
							{
								label: __( 'Circle', 'blockloom' ),
								value: 'circle',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { imageShape: val } )
						}
					/>
					<RangeControl
						label={ __( 'Image Size (px)', 'blockloom' ) }
						value={ imageSize }
						onChange={ ( val ) =>
							setAttributes( { imageSize: val } )
						}
						min={ 48 }
						max={ 300 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Visibility', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Designation', 'blockloom' ) }
						checked={ showDesignation }
						onChange={ ( val ) =>
							setAttributes( { showDesignation: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Bio', 'blockloom' ) }
						checked={ showBio }
						onChange={ ( val ) =>
							setAttributes( { showBio: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Social Links', 'blockloom' ) }
						checked={ showSocial }
						onChange={ ( val ) =>
							setAttributes( { showSocial: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Social Links', 'blockloom' ) }
					initialOpen={ false }
				>
					{ SOCIALS.map( ( { key, label } ) => (
						<TextControl
							key={ key }
							label={ label }
							value={ attributes[ key ] }
							onChange={ ( val ) =>
								setAttributes( { [ key ]: val } )
							}
							type="url"
							placeholder="https://"
						/>
					) ) }
					<TextControl
						label={ __( 'Custom URL', 'blockloom' ) }
						value={ socialCustom }
						onChange={ ( val ) =>
							setAttributes( { socialCustom: val } )
						}
						type="url"
						placeholder="https://"
					/>
					<TextControl
						label={ __( 'Custom Label', 'blockloom' ) }
						value={ socialCustomLabel }
						onChange={ ( val ) =>
							setAttributes( { socialCustomLabel: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Icons only (hide labels)', 'blockloom' ) }
						checked={ socialIconOnly }
						onChange={ ( val ) =>
							setAttributes( { socialIconOnly: val } )
						}
					/>
					<SelectControl
						label={ __( 'Icon Shape', 'blockloom' ) }
						value={ socialIconShape }
						options={ [
							{
								label: __( 'Default', 'blockloom' ),
								value: 'default',
							},
							{
								label: __( 'Square', 'blockloom' ),
								value: 'square',
							},
							{
								label: __( 'Rounded', 'blockloom' ),
								value: 'rounded',
							},
							{
								label: __( 'Circle', 'blockloom' ),
								value: 'circle',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { socialIconShape: val } )
						}
					/>
					<RangeControl
						label={ __( 'Icon gap (px)', 'blockloom' ) }
						value={ socialGap }
						onChange={ ( val ) =>
							setAttributes( { socialGap: val } )
						}
						min={ 4 }
						max={ 40 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'SEO', 'blockloom' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Enable Person Schema (JSON-LD)',
							'blockloom'
						) }
						help={ __(
							'Adds structured data with name, role, image and social URLs.',
							'blockloom'
						) }
						checked={ enablePersonSchema }
						onChange={ ( val ) =>
							setAttributes( { enablePersonSchema: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Text Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<ColorControl
						label={ __( 'Name Color', 'blockloom' ) }
						value={ nameColor }
						onChange={ ( val ) =>
							setAttributes( { nameColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Designation Color', 'blockloom' ) }
						value={ designationColor }
						onChange={ ( val ) =>
							setAttributes( { designationColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Bio Color', 'blockloom' ) }
						value={ bioColor }
						onChange={ ( val ) =>
							setAttributes( { bioColor: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Social Icon Colors', 'blockloom' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Social Icon Color', 'blockloom' ) }
						value={ socialIconColor }
						onChange={ ( val ) =>
							setAttributes( { socialIconColor: val } )
						}
						hoverValue={ socialHoverColor }
						onHoverChange={ ( val ) =>
							setAttributes( { socialHoverColor: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Card Style', 'blockloom' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Background Color', 'blockloom' ) }
						value={ backgroundColor }
						onChange={ ( val ) =>
							setAttributes( { backgroundColor: val } )
						}
					/>
					<ColorControl
						label={ __( 'Border Color', 'blockloom' ) }
						value={ borderColor }
						onChange={ ( val ) =>
							setAttributes( { borderColor: val } )
						}
					/>
					<RangeControl
						label={ __( 'Border Width (px)', 'blockloom' ) }
						value={ borderWidth }
						onChange={ ( val ) =>
							setAttributes( { borderWidth: val } )
						}
						min={ 0 }
						max={ 8 }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'blockloom' ) }
						value={ borderRadius }
						onChange={ ( val ) =>
							setAttributes( { borderRadius: val } )
						}
						min={ 0 }
						max={ 48 }
					/>
					<ToggleControl
						label={ __( 'Box Shadow', 'blockloom' ) }
						checked={ boxShadow }
						onChange={ ( val ) =>
							setAttributes( { boxShadow: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Padding', 'blockloom' ) }
					initialOpen={ false }
				>
					<PaddingControl
						values={ {
							top: paddingTop,
							right: paddingRight,
							bottom: paddingBottom,
							left: paddingLeft,
						} }
						onChange={ ( v ) =>
							setAttributes( {
								paddingTop: v.top,
								paddingRight: v.right,
								paddingBottom: v.bottom,
								paddingLeft: v.left,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( {
								mediaId: media.id,
								mediaUrl: media.url,
								mediaAlt: media.alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						value={ mediaId }
						render={ ( { open } ) => (
							<button
								type="button"
								className="blockloom-team-member__image-wrap"
								onClick={ open }
								style={ {
									cursor: 'pointer',
									border: 'none',
									padding: 0,
									background: 'transparent',
								} }
							>
								{ mediaUrl ? (
									<img
										src={ mediaUrl }
										alt={ mediaAlt }
										style={ imgStyle }
									/>
								) : (
									<div
										style={ {
											...imgStyle,
											background: '#f0f0f0',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#999',
											fontSize: 13,
											margin:
												textAlignment === 'center'
													? '0 auto 1rem'
													: '0 0 1rem',
										} }
									>
										{ __( '+ Photo', 'blockloom' ) }
									</div>
								) }
							</button>
						) }
					/>
				</MediaUploadCheck>

				<div className="blockloom-team-member__info">
					<RichText
						tagName="h3"
						className="blockloom-team-member__name"
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
						placeholder={ __( 'Full Name', 'blockloom' ) }
						allowedFormats={ [] }
						style={ { color: nameColor || undefined } }
					/>

					{ showDesignation && (
						<RichText
							tagName="p"
							className="blockloom-team-member__designation"
							value={ designation }
							onChange={ ( val ) =>
								setAttributes( { designation: val } )
							}
							placeholder={ __(
								'Job Title / Role',
								'blockloom'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							style={ { color: designationColor || undefined } }
						/>
					) }

					{ showBio && (
						<RichText
							tagName="p"
							className="blockloom-team-member__bio"
							value={ bio }
							onChange={ ( val ) =>
								setAttributes( { bio: val } )
							}
							placeholder={ __( 'Short bio…', 'blockloom' ) }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/link',
							] }
							style={ { color: bioColor || undefined } }
						/>
					) }

					{ showSocial && (
						<div
							className="blockloom-team-member__social"
							style={ { gap: `${ socialGap }px` } }
						>
							{ SOCIALS.filter(
								( { key } ) => attributes[ key ]
							).map( ( { key, label, iconKey } ) => (
								<a
									key={ key }
									href={ attributes[ key ] }
									className="blockloom-team-member__social-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="blockloom-team-member__social-icon">
										{ renderIconSVG( iconKey, {
											width: 18,
											height: 18,
										} ) }
									</span>
									{ ! socialIconOnly && (
										<span>{ label }</span>
									) }
								</a>
							) ) }
							{ socialCustom && (
								<a
									href={ socialCustom }
									className="blockloom-team-member__social-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="blockloom-team-member__social-icon">
										{ renderIconSVG( 'solid/globe', {
											width: 18,
											height: 18,
										} ) }
									</span>
									{ ! socialIconOnly && (
										<span>{ socialCustomLabel }</span>
									) }
								</a>
							) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
