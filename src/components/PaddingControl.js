/**
 * Shared PaddingControl — four linked or individual padding sliders.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RangeControl, Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';

export default function PaddingControl( { values, onChange, max = 80 } ) {
	const [ linked, setLinked ] = useState(
		values.top === values.right &&
			values.right === values.bottom &&
			values.bottom === values.left
	);

	const set = ( side, val ) => {
		if ( linked ) {
			onChange( { top: val, right: val, bottom: val, left: val } );
		} else {
			onChange( { ...values, [ side ]: val } );
		}
	};

	return (
		<div>
			<div
				style={ {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 8,
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
					{ __( 'Padding', 'blockloom' ) }
				</span>
				<Tooltip
					text={
						linked
							? __( 'Unlink sides', 'blockloom' )
							: __( 'Link sides', 'blockloom' )
					}
				>
					<Button
						icon={ linked ? link : linkOff }
						size="small"
						isPressed={ linked }
						onClick={ () => setLinked( ( l ) => ! l ) }
					/>
				</Tooltip>
			</div>
			{ linked ? (
				<RangeControl
					label={ __( 'All sides', 'blockloom' ) }
					value={ values.top }
					onChange={ ( v ) => set( 'top', v ) }
					min={ 0 }
					max={ max }
				/>
			) : (
				<>
					<RangeControl
						label={ __( 'Top', 'blockloom' ) }
						value={ values.top }
						onChange={ ( v ) => set( 'top', v ) }
						min={ 0 }
						max={ max }
					/>
					<RangeControl
						label={ __( 'Right', 'blockloom' ) }
						value={ values.right }
						onChange={ ( v ) => set( 'right', v ) }
						min={ 0 }
						max={ max }
					/>
					<RangeControl
						label={ __( 'Bottom', 'blockloom' ) }
						value={ values.bottom }
						onChange={ ( v ) => set( 'bottom', v ) }
						min={ 0 }
						max={ max }
					/>
					<RangeControl
						label={ __( 'Left', 'blockloom' ) }
						value={ values.left }
						onChange={ ( v ) => set( 'left', v ) }
						min={ 0 }
						max={ max }
					/>
				</>
			) }
		</div>
	);
}
