import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	listContainer: {
		width: '60%',
		textAlign: 'center',
		margin: '0 auto',
	},
	msg: {
		fontSize: '.875rem'
	},
	list: {
		padding: 0,
		listStyle: 'none',
		marginTop: '0',
		border: `1px solid ${COLORS.grey85}`,
        borderRadius: '2px',
        maxHeight: 'calc(100vh - 300px)',
        overflowY: 'auto',
	},

	listItem: {
		padding: '.5rem',
		cursor: 'default',
		borderBottom: `1px solid ${COLORS.grey85}`,
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		},
		':hover': {
			backgroundColor: COLORS.grey85
		},
	},
	noItems: {
		padding: '.5rem',
		textAlign: 'center'
	},
	link: {
		fontSize: '.75rem',
		lineHeight: '19px',
		marginLeft: '.5rem',
        float: 'right',
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
	}
});
