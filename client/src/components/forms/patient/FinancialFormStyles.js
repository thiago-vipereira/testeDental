import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
	flex: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
	},
	header:{
		float: 'left',
		textAlign: 'left',
		fontWeight: '500',
		color: COLORS.grey65
	},
    listContainer: {
		width: '96%',
		textAlign: 'center',
		margin: '0 auto',
	},
	msg: {
		fontSize: '.875rem'
	},
	list: {
        backgroundColor: '#FFF',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        padding: '1rem 1rem 3.5rem 1rem',
		borderRadius: '4px',
		margin: '10px 0px 40px 10px',
	},
    list2: {
		padding: 0,
		listStyle: 'none',
		marginTop: '0',
		overflow: 'hidden',
	},
	listHeader: {
		padding: '.5rem',
		cursor: 'default',
		borderBottom: `1px solid ${COLORS.grey85}`,
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		},
	},
	listItem: {
		lineHeight: '40px',
		textAlign: 'center',
		verticalAlign: 'middle',
		listStyle: 'none',
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
    form: {
		width: '60%',
	    padding: '1rem 0 2rem',
    },
    sectionTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
		borderBottom: `1px solid ${COLORS.grey77}`,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: '.5rem',
		margin: '0 1rem',
		marginBottom: '15px',
	},
	financialTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		margin: '0',
    },
    section: {
		marginBottom: '1rem',
        backgroundColor: '#ececec',
        paddingTop: '1rem',
    },
    date: {
		fontSize: '.8rem',
		lineHeight: '19px',
		color: COLORS.grey65,
		transition: 'color .5s ease',
	},
	red: {
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
    },
    link2: {
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
    modal: {
		maxWidth: '614px'
    },
    modal_del: {
		maxWidth: '400px'
	},
	btnNote: {
		marginBottom: '.5rem'
	},
	listText: {
		marginBottom: '1rem',
		padding: '1rem',		
	},
	financial_bar: {
		height: '100px',
		width: '100%',
		padding: '.75rem 1rem',
		backgroundColor: 'white',
		marginTop: '40px',
	},
});