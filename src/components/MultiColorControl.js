/**
 * Shared ColorControl component.
 * Shows a color indicator button that opens a popover with ColorPalette + ColorPicker.
 * Supports Normal / Hover states.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	Popover,
	ColorPalette,
	ColorPicker,
	TabPanel,
} from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';

function SingleColorControl( { label, value, onChange } ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const colors = useSetting( 'color.palette' ) || [];
	const defaultColor =
		'#fff linear-gradient(-45deg,#0000 48%,#ddd 0,#ddd 52%,#0000 0)';

	return (
		<div style={ { marginBottom: 12 } }>
			<div
				style={ {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 4,
				} }
			>
				<span
					style={ {
						fontSize: 11,
						fontWeight: 500,
						textTransform: 'uppercase',
						color: '#757575',
					} }
				>
					{ label }
				</span>
				<Button
					style={ { padding: 0, minWidth: 'auto' } }
					onClick={ () => setIsOpen( ( o ) => ! o ) }
				>
					<span
						style={ {
							display: 'inline-block',
							width: 28,
							height: 28,
							borderRadius: '50%',
							background: value || defaultColor,
							border: '2px solid #ddd',
							verticalAlign: 'middle',
						} }
					/>
				</Button>
			</div>
			{ isOpen && (
				<Popover
					placement="left-start"
					onClose={ () => setIsOpen( false ) }
				>
					<div style={ { padding: 16, width: 240 } }>
						{ colors.length > 0 && (
							<>
								<p
									style={ {
										fontSize: 11,
										fontWeight: 600,
										marginBottom: 8,
										color: '#1e1e1e',
									} }
								>
									{ __( 'Theme Colors', 'blockloom' ) }
								</p>
								<ColorPalette
									colors={ colors }
									value={ value }
									onChange={ onChange }
									disableCustomColors
								/>
								<hr
									style={ {
										margin: '12px 0',
										borderColor: '#e0e0e0',
									} }
								/>
							</>
						) }
						<p
							style={ {
								fontSize: 11,
								fontWeight: 600,
								marginBottom: 8,
								color: '#1e1e1e',
							} }
						>
							{ __( 'Custom Color', 'blockloom' ) }
						</p>
						<ColorPicker
							color={ value }
							onChange={ onChange }
							enableAlpha
						/>
						{ value && (
							<Button
								variant="tertiary"
								isDestructive
								size="small"
								onClick={ () => {
									onChange( '' );
									setIsOpen( false );
								} }
								style={ { marginTop: 8 } }
							>
								{ __( 'Clear', 'blockloom' ) }
							</Button>
						) }
					</div>
				</Popover>
			) }
		</div>
	);
}

export default function MultiColorControl( {
	settings,
	attributes,
	setAttributes,
} ) {
	return (
		<TabPanel
			activeClass="is-active"
			tabs={ [
				{ name: 'normal', title: __( 'Normal', 'blockloom' ) },
				{ name: 'hover', title: __( 'Hover', 'blockloom' ) },
			] }
		>
			{ ( tab ) => (
				<div className="tab-content" style={ { marginTop: '16px' } }>
					{ settings.map( ( item, index ) => {
						const isNormal = tab.name === 'normal';
						const currentLabel = item.label;
						const currentAttr = isNormal
							? item.valueKey
							: item.hoverKey;

						return (
							<SingleColorControl
								key={ index }
								label={ currentLabel }
								value={ attributes[ currentAttr ] }
								onChange={ ( val ) =>
									setAttributes( { [ currentAttr ]: val } )
								}
							/>
						);
					} ) }
				</div>
			) }
		</TabPanel>
	);
}
