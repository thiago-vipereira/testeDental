import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	form: {
		width: '60%',
		margin: '0 auto',
		'@media screen and (min-width: 1600px)': {
			width: '50%'
		}
	},
	msgAuth: {
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
	},
	msgSpan: {
		marginRight: '4px'
	},
	link: {
		marginTop: '4px',
		fontSize: '.75rem',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		//float: 'right',
		':hover': {
			color: COLORS.blue
		}
	}
});