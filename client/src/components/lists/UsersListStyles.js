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
	selectItem: {
		padding: '.5rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		},
		backgroundColor: COLORS.greenDark
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
	},
	backgroundDentists: {
		backgroundColor: '#FFF',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        padding: '1rem',
        borderRadius: '4px',
	}
});
