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
	},
    list2: {
		padding: 0,
		listStyle: 'none',
		marginTop: '0',
		border: `1px solid ${COLORS.grey85}`,
        borderRadius: '2px',
        height: 'calc(100vh - 322px)',
		overflowY: 'auto',
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
	link: {
		fontSize: '.75rem',
		lineHeight: '19px',
        float: 'right',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		textDecoration: 'underline',
		cursor: 'pointer',
		':hover': {
			color: COLORS.blue
		}
	},
	delete: {
		marginRight: '.5rem',
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
	},
    form: {
        width: '60%',
        height: '100%',
        paddingTop: '1rem',
        
	},
	form2: {
        width: '100%',
        height: '100%',
		paddingTop: '1rem',
		margin: '0 2rem',
        
    },
    loading: {
        width: '100%',
        padding: '1rem 0 2rem',
        gridColumn: '2',
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
        marginBottom: '15px',
    },
    section: {
        //display: 'grid',
        //gridTemplateColumns: '4fr 2fr',
        //gridColumnGap: '1rem',
        marginBottom: '1rem'
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
    form_modal: {
		width: '100%',
        padding: '1rem'
	},
	modal: {
		width: '500px',
		overflow: 'auto'
    },
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
	label: {
		display: 'inline-block',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'left',
		color: COLORS.grey35,
        marginBottom: '.5rem',
        float: 'left',
		textIndent: '.5rem',
		width: '100%',
    },
    fieldset: {
		marginBottom: '1rem',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	fieldsetBtn: {
		position: 'relative',
		display: 'inline-block',
		width: '100%',
		textAlign: 'right',
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
	inputTeeth: {
		width: 'calc(100% - 95px)',
		marginRight: '10px',
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
	fieldFace: {
		width: '85px',
		marginRight: '10px',
		float: 'left',
		marginBottom: '5px',
	},
	btn2: {
		float: 'right'
	},
	container: {
		display: 'flex',
		flexDirection: 'row'
	},
	row1: {
		
	},
	row2: {

	},
	buttons: {
		float: 'bottom'
	}
});