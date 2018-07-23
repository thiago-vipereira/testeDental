import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
	listContainer: {
		width: '60%',
		textAlign: 'center',
		margin: '0 auto',
		'@media screen and (min-width: 1600px)': {
			width: '50%'
		},
		overflow:'hidden'
	},
	msg: {
		fontSize: '.875rem'
	},
	list: {
		padding: 0,
		listStyle: 'none',
		margin: '1rem 0',
		border: `1px solid ${COLORS.grey85}`,
        borderRadius: '2px',
     
		overflowY: 'auto',
		marginTop: 0
	},
	listItem: {
		padding: '.5rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		}
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
	warning: {
		marginRight: '.25rem',
		fontSize: '.75rem',
		lineHeight: '19px',
        float: 'right',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		cursor: 'pointer',
		':hover': {
			color: COLORS.blue
		},
	},

    grid: {
        display: 'flex',
        margin: '0 1rem',
		justifyContent: 'center',
		width: '100%'
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
	},
	
    newProcedureModal: {
		maxWidth: '400px'
	},

	red: {
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
	}
});
