import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	fieldset: {
		marginBottom: '1rem'
	},
	label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem'
	},
	input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid #ccc`,
		borderRadius: '3px',
		fontSize: '.875em',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
		},
		boxShadow: 'inset 0 2px 4px 0 hsla(0,0%,0%, 0.08)'
	},
	msgError: {
		display: 'block',
		marginTop: '.5rem',
		borderRadius: '2px',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.red,
		textIndent: '.5rem'
	},
	row_3: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
        gridColumnGap: '1rem'
	},
	link: {
		fontSize: '.75rem',
		lineHeight: '19px',
		marginTop: '6px',
        float: 'left',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		textDecoration: 'underline',
		cursor: 'pointer',
		':hover': {
			color: COLORS.blue
		}
	},
	red: {
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
	},
	icoRelative: {
		position: 'relative',
	},
	ico: {
		position: 'absolute',
		top: '1.8rem',
		right: '.5rem',
		width: '18px',
		height: '18px'
	},
});