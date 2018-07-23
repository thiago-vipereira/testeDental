import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	listContainer: {
		width: '60%',
		textAlign: 'center',
		margin: '0 auto',
		'@media screen and (min-width: 1600px)': {
			width: '50%'
		}
	},
	msg: {
		fontSize: '.875rem'
	},
	list: {
		padding: 0,
		listStyle: 'none',
		margin: '1rem 0',
		border: `1px solid ${COLORS.grey85}`,
		borderRadius: '2px'
	},
	listItem: {
		padding: '1rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		cursor: 'pointer',
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		},
		':hover': {
			backgroundColor: COLORS.grey85
		}
	},
	link: {
		marginTop: '4px',
		fontSize: '.75rem',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		textDecoration: 'underline',
		cursor: 'pointer',
		':hover': {
			color: COLORS.blue
		}
	}
});
