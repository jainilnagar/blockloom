import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import IconPicker, { renderIconSVG } from '../../components/IconPicker';
import MultiColorControl from '../../components/MultiColorControl';

const RADIUS_MAP = { none: '0px', rounded: '8px', circle: '50%' };

export default function Edit( { attributes, setAttributes } ) {
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

	// Additive padding: wrapper grows with padding, icon stays iconSize
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

	const blockProps = useBlockProps( {
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
							isActive={ alignment === align }
							onClick={ () =>
								setAttributes( { alignment: align } )
							}
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
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
						label={ __( 'Size (px)', 'blockloom' ) }
						value={ iconSize }
						onChange={ ( val ) =>
							setAttributes( { iconSize: val } )
						}
						min={ 16 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Background Padding (px)', 'blockloom' ) }
						value={ padding }
						onChange={ ( val ) =>
							setAttributes( { padding: val } )
						}
						min={ 0 }
						max={ 64 }
						help={ __(
							'Adds space around the icon inside the background.',
							'blockloom'
						) }
					/>
					<SelectControl
						label={ __( 'Background Shape', 'blockloom' ) }
						value={ borderRadius }
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
							setAttributes( { borderRadius: val } )
						}
					/>
					<SelectControl
						label={ __( 'Hover Animation', 'blockloom' ) }
						value={ hoverAnimation }
						options={ [
							{ label: __( 'None', 'blockloom' ), value: 'none' },
							{
								label: __( 'Scale Up', 'blockloom' ),
								value: 'scale-up',
							},
							{
								label: __( 'Scale Down', 'blockloom' ),
								value: 'scale-down',
							},
							{
								label: __( 'Rotate Right', 'blockloom' ),
								value: 'rotate-right',
							},
							{
								label: __( 'Rotate Left', 'blockloom' ),
								value: 'rotate-left',
							},
							{ label: __( 'Fade', 'blockloom' ), value: 'fade' },
						] }
						onChange={ ( val ) =>
							setAttributes( { hoverAnimation: val } )
						}
					/>
					<TextControl
						label={ __( 'Accessibility Label', 'blockloom' ) }
						value={ accessibilityLabel }
						onChange={ ( val ) =>
							setAttributes( { accessibilityLabel: val } )
						}
						help={ __(
							'Screen reader text. Not visible on page.',
							'blockloom'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Link', 'blockloom' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'URL', 'blockloom' ) }
						value={ linkUrl }
						onChange={ ( val ) =>
							setAttributes( { linkUrl: val } )
						}
						type="url"
						placeholder="https://"
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'blockloom' ) }
						checked={ linkNewTab }
						onChange={ ( val ) =>
							setAttributes( { linkNewTab: val } )
						}
					/>
					<TextControl
						label={ __( 'Link rel', 'blockloom' ) }
						value={ linkRel }
						onChange={ ( val ) =>
							setAttributes( { linkRel: val } )
						}
						placeholder="nofollow noopener"
						help={ __(
							'Custom rel attribute for the link.',
							'blockloom'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={ __( 'Color', 'blockloom' ) }
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
								label: __( 'Background Color', 'blockloom' ),
								valueKey: 'backgroundColor',
								hoverKey: 'bgHoverColor',
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
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
						{ renderIconSVG( iconName, {
							width: iconSize,
							height: iconSize,
						} ) }
					</span>
				</span>
			</div>
		</>
	);
}
