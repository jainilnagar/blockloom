import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import IconPicker, { renderIconSVG } from '../../components/IconPicker';
import MultiColorControl from '../../components/MultiColorControl';
import PaddingControl from '../../components/PaddingControl';

const RADIUS_MAP = { none: '0px', rounded: '8px', circle: '50%' };

export default function Edit( { attributes, setAttributes } ) {
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
		transition: 'color 0.2s ease, background-color 0.2s ease',
	};

	const blockProps = useBlockProps( {
		className: `blockloom-info-box layout-${ layout } align-${ contentAlign }`,
		style: boxStyle,
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
						[ 'right', alignRight ],
					].map( ( [ align, icon ] ) => (
						<ToolbarButton
							key={ align }
							icon={ icon }
							label={
								ALIGNMENT_LABELS[ align ] ||
								__( 'Align', 'blockloom' )
							}
							isActive={ contentAlign === align }
							onClick={ () =>
								setAttributes( { contentAlign: align } )
							}
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Layout', 'blockloom' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Icon Position', 'blockloom' ) }
						value={ layout }
						options={ [
							{
								label: __( 'Icon Top', 'blockloom' ),
								value: 'icon-top',
							},
							{
								label: __( 'Icon Left', 'blockloom' ),
								value: 'icon-left',
							},
							{
								label: __( 'Icon Right', 'blockloom' ),
								value: 'icon-right',
							},
						] }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
					/>
					<SelectControl
						label={ __( 'Title Tag', 'blockloom' ) }
						value={ titleTag }
						options={ [ 'h2', 'h3', 'h4', 'h5', 'p' ].map(
							( t ) => ( { label: t.toUpperCase(), value: t } )
						) }
						onChange={ ( val ) =>
							setAttributes( { titleTag: val } )
						}
						help={ __(
							'Choose the correct heading level for SEO.',
							'blockloom'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Icon', 'blockloom' ) }
					initialOpen={ true }
				>
					<IconPicker
						value={ iconName }
						onChange={ ( val ) =>
							setAttributes( { iconName: val } )
						}
					/>
					<RangeControl
						label={ __( 'Icon Size (px)', 'blockloom' ) }
						value={ iconSize }
						onChange={ ( val ) =>
							setAttributes( { iconSize: val } )
						}
						min={ 16 }
						max={ 120 }
					/>
					<RangeControl
						label={ __(
							'Icon Background Padding (px)',
							'blockloom'
						) }
						value={ iconPadding }
						onChange={ ( val ) =>
							setAttributes( { iconPadding: val } )
						}
						min={ 0 }
						max={ 40 }
					/>
					<SelectControl
						label={ __( 'Background Shape', 'blockloom' ) }
						value={ iconBorderRadius }
						options={ [
							{ label: __( 'None', 'blockloom' ), value: 'none' },
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
							setAttributes( { iconBorderRadius: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'CTA Link', 'blockloom' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Text', 'blockloom' ) }
						value={ ctaText }
						onChange={ ( val ) =>
							setAttributes( { ctaText: val } )
						}
					/>
					<TextControl
						label={ __( 'URL', 'blockloom' ) }
						value={ ctaUrl }
						onChange={ ( val ) => setAttributes( { ctaUrl: val } ) }
						type="url"
						placeholder="https://"
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'blockloom' ) }
						checked={ ctaNewTab }
						onChange={ ( val ) =>
							setAttributes( { ctaNewTab: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Icon Colors', 'blockloom' ) }
					initialOpen={ true }
				>
					<MultiColorControl
						attributes={ attributes }
						setAttributes={ setAttributes }
						settings={ [
							{
								label: __( 'Icon Color', 'blockloom' ),
								valueKey: 'iconColor',
								hoverKey: 'iconHoverColor',
							},
							{
								label: __( 'Icon Background', 'blockloom' ),
								valueKey: 'iconBackgroundColor',
								hoverKey: 'iconBgHoverColor',
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Text Colors', 'blockloom' ) }
					initialOpen={ false }
				>
					<MultiColorControl
						attributes={ attributes }
						setAttributes={ setAttributes }
						settings={ [
							{
								label: __( 'Title Color', 'blockloom' ),
								valueKey: 'titleColor',
								hoverKey: 'titleHoverColor',
							},
							{
								label: __( 'Description Color', 'blockloom' ),
								valueKey: 'descriptionColor',
								hoverKey: 'descriptionHoverColor',
							},
							{
								label: __( 'CTA Color', 'blockloom' ),
								valueKey: 'ctaColor',
								hoverKey: 'ctaHoverColor',
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Box Style', 'blockloom' ) }
					initialOpen={ false }
				>
					<MultiColorControl
						attributes={ attributes }
						setAttributes={ setAttributes }
						settings={ [
							{
								label: __( 'Background Color', 'blockloom' ),
								valueKey: 'backgroundColor',
								hoverKey: 'hoverBgColor',
							},
							{
								label: __( 'Border Color', 'blockloom' ),
								valueKey: 'borderColor',
								hoverKey: 'hoverBorderColor',
							},
						] }
					/>
					<hr
						style={ { margin: '12px 0', borderColor: '#e0e0e0' } }
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
						{ renderIconSVG( iconName, {
							width: iconSize,
							height: iconSize,
						} ) }
					</span>
				</span>
				<div className="blockloom-info-box__content">
					<RichText
						tagName={ titleTag }
						className="blockloom-info-box__title"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Info Box Title…', 'blockloom' ) }
						allowedFormats={ [] }
					/>
					<RichText
						tagName="p"
						className="blockloom-info-box__description"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __( 'Description…', 'blockloom' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/link',
						] }
					/>
					{ ctaText && (
						<a
							className="blockloom-info-box__cta"
							href={ ctaUrl || '#' }
							target={ ctaNewTab ? '_blank' : undefined }
							rel={
								ctaNewTab ? 'noopener noreferrer' : undefined
							}
						>
							{ ctaText }
						</a>
					) }
				</div>
			</div>
		</>
	);
}
