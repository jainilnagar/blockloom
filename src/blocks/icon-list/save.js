import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		layout,
		columns,
		gap,
		iconColor,
		iconHoverColor,
		textColor,
		textHoverColor,
		iconPosition,
		iconSpacing,
		iconSize,
		lineHeight,
		showDivider,
		dividerColor,
		dividerHoverColor,
		alignment,
	} = attributes;

	const listColumns = layout === 'horizontal' && columns === 1 ? 2 : columns;

	const listStyle = {
		'--bl-list-gap': `${ gap }px`,
		'--bl-list-icon-color': iconColor || undefined,
		'--bl-list-icon-hover-color': iconHoverColor || iconColor || undefined,
		'--bl-list-text-color': textColor || undefined,
		'--bl-list-text-hover-color': textHoverColor || textColor || undefined,
		'--bl-list-divider-color': dividerColor || '#e0e0e0',
		'--bl-list-divider-hover-color':
			dividerHoverColor || dividerColor || '#e0e0e0',
		'--bl-list-icon-spacing': `${ iconSpacing }px`,
		'--bl-list-icon-position': iconPosition,
		'--bl-list-icon-size': `${ iconSize }px`,
		lineHeight,
		display: layout === 'horizontal' ? 'grid' : 'flex',
		gridTemplateColumns:
			layout === 'horizontal'
				? `repeat(${ listColumns }, 1fr)`
				: undefined,
		flexDirection: layout === 'vertical' ? 'column' : undefined,
		columnGap: '15px',
		rowGap: `${ gap }px`,
		textAlign: alignment,
		listStyle: 'none',
		margin: 0,
		padding: 0,
	};

	const listClassName = `blockloom-icon-list layout-${ layout }${
		showDivider ? ' has-divider' : ''
	} align-${ alignment }`;

	const blockProps = useBlockProps.save( {
		className: `blockloom-icon-list__wrap`,
	} );

	return (
		<div { ...blockProps }>
			<ul className={ listClassName } style={ listStyle }>
				<InnerBlocks.Content />
			</ul>
		</div>
	);
}
