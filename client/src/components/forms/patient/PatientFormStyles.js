import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    flex: {
		display: 'flex',
		justifyContent: 'center',
		padding: '1rem',
		overflow: 'auto'
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    form: {
		width: '50%',
		height: '100%',
    },
    schedule: {
        width: '100%',
        padding: '1rem 0 0',
        marginBottom: '1rem'
    },
    loading: {
        width: '100%',
        padding: '1rem 0 2rem',
        textAlign: 'center'
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
    },
    section: {
		marginBottom: '1rem',
		padding: '1rem',
		backgroundColor: '#FFF',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    },
    row_1: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridColumnGap: '1rem'
    },
    row_3: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
        gridColumnGap: '1rem'
    },
	msgAuth: {
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
    },
    listContainer: {
		width: '60%',
		textAlign: 'center',
		margin: '0 auto',
		'@media screen and (min-width: 1600px)': {
			width: '50%'
		}
	},
    list: {
		listStyle: 'none',
		marginTop: '0',
		borderRadius: '2px',
        maxHeight: '100%',
		overflowY: 'auto',
		marginBottom: '1rem',
		backgroundColor: '#ececec',
		padding: '1rem'
	},
	listItem: {
		padding: '.5rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
		},
		marginBottom: '1rem',
		backgroundColor: '#FFF',
		padding: '1rem',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
		
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
    msgAuth_modal: {
		textAlign: 'center',
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
    },
    form_modal: {
		width: '100%',
        padding: '1rem'
    },
    fieldset: {
		marginBottom: '1rem',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
    },
    modal: {
		maxWidth: '614px'
    },
    modal_del: {
		maxWidth: '400px'
	},
	btnNote: {
		marginBottom: '.5rem'
	}
	
});