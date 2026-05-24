import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import IconPicker, { renderIconSVG } from '../../components/IconPicker';

export default function Edit( { attributes, setAttributes, context } ) {
	const { iconName, text } = attributes;
	const icon = iconName || context[ 'blockloom/listIconName' ];
	const iconSize = context[ 'blockloom/iconSize' ] || 18;

	const blockProps = useBlockProps( {
		className: 'blockloom-icon-list-item',
	} );

	const textFontSize = iconSize * 0.8;

	const textStyle = {
		fontSize: `${ textFontSize }px`,
	};

	return (
		<>
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
				</PanelBody>
			</InspectorControls>

			<li { ...blockProps }>
				<span className="blockloom-icon-list-item__icon">
					<span
						style={ {
							width: iconSize,
							height: iconSize,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						} }
					>
						{ renderIconSVG( icon, {
							width: iconSize,
							height: iconSize,
						} ) }
					</span>
				</span>
				<RichText
					tagName="span"
					className="blockloom-icon-list-item__text"
					style={ textStyle }
					value={ text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __( 'List item text…', 'blockloom' ) }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
				/>
			</li>
		</>
	);
}
