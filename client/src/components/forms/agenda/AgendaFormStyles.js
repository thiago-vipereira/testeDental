import { StyleSheet } from 'aphrodite/no-important'; 

import { COLORS } from '../../_constants/colors'; 

export const styles = StyleSheet.create({
	listContainer: {
        width: '100%',
        gridColumn: '2',
        marginBottom: '1rem',
    },
	grid: { 
		display: 'grid', 
		gridTemplateColumns: '0fr 2fr 0fr', 
		gridColumnGap: '1rem', 
		margin: '0 1rem', 
	},
	gridDate: { 
		display: 'grid', 
		gridTemplateColumns: '2fr 1fr 1fr', 
		gridColumnGap: '1rem', 
		margin: '0 1rem', 
	},
	form: { 
		width: '100%',
        padding: '1rem 0 0',
        gridColumn: '2',
        marginBottom: '2rem'
	},
	formAgenda: {
		width: '23%',
		height: 'calc(99% - 50px)',
        padding: '1rem 0.5rem 0',
		float: 'left',
	},
	formCalendar: {
		width: '77%',
		padding: '1rem 0 0',
		paddingRight: '0.5rem',
		float: 'right',
		display: 'initial !important',
		paddingBottom: '1rem',
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
		borderBottom: `1px solid ${COLORS.grey77}` 
	}, 
	section: {
		marginBottom: '1rem' 
	},
	section2: {
		paddingTop: '0.45rem',
	},
	infoRow: { 
		display: 'grid', 
		gridTemplateColumns: '1fr 2fr', 
		gridColumnGap: '1rem' 
	},
	row_procedure: {
        display: 'grid',
        gridTemplateColumns: '4fr 1fr',
        gridColumnGap: '1rem'
	},
	row_confirm: {
        display: 'inline-block',
		marginBottom: '1rem',
		marginTop: '20px',
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
	row_2: { 
		display: 'flex', 

	},
	row_interval: { 
		display: 'grid', 
		gridTemplateColumns: '2fr 1fr 2fr 1fr', 
		gridColumnGap: '1rem' 
	},  
	row_delete: {
		display: 'inline',
		marginBottom: '1rem',
		marginTop: '1rem'
    },
	msgAuth: { 
		fontSize: '.875rem', 
		color: COLORS.red, 
		border: `1px solid ${COLORS.red}`, 
		borderRadius: '2px', 
		padding: '.5rem', 
		marginBottom: '1rem' 
	},
	label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'right',
		color: COLORS.grey35,
		textIndent: '.5rem',
		paddingTop: '.7rem',
		marginRight: '1rem',
	},
	label2: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.grey35,
		textIndent: '.5rem',
	},
	labelTime: {
		display: 'inline',
		width: '36px',
		margin: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.grey35,
		textAlign: 'center'
	},
	row_date: {
        display: 'grid',
        gridTemplateColumns: '0.3fr 1fr 0.1fr 1fr',
        gridColumnGap: '.5rem'
	},
	agendaModal: {
		maxWidth: '400px'
	},
	form_modal: {
		width: '100%',
        padding: '1rem'
	},
	interval: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '1rem'
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
	fieldset: {
		marginBottom: '1rem',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	fieldset_patient: {
		margin: '1rem 0',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	bar: {
		height: '50px',
		width: '100%',
		padding: '.75rem 1rem',
        borderBottom: `1px solid ${COLORS.grey85}`,
		backgroundColor:'white',
		textAlign: 'center',
	},
	bar2: {
		height: '50px',
		padding: '.75rem 1rem',
        borderBottom: `1px solid ${COLORS.grey85}`,
        backgroundColor:'white'
	},
	link: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: '25px',
        padding: '0 1rem',
        height: '100%',
        lineHeight: '25px',
        color: COLORS.grey35,
        fontSize: '.75rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color .5s ease, background-color .25s ease',
        ':hover': {
            color: COLORS.grey35,
            backgroundColor: COLORS.grey85
        }
	},
	active: {
        color: '#fff',
        backgroundColor: COLORS.primary,
        ':hover': {
            color: '#fff',
            backgroundColor: COLORS.primary,
        }
	},
	actions: {
		display: 'flex',
		borderBottom: '1px solid #d9d9d9',
		height: '50px',
		fontSize: '.85rem',
		color: '#595959',
		lineHeight: '49px',
		fontWeight: 'bold',
		backgroundColor: '#FFF',
	},
	action: {
		padding: '0px 1rem',
		cursor: 'pointer',
		':hover': {
			backgroundColor: '#d9d9d9'
		}
	},
	btn: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: '100%',
		padding: '0px 6px',
        height: '100%',
        lineHeight: '25px',
        color: COLORS.grey35,
        fontSize: '.75rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color .5s ease, background-color .25s ease',
        ':hover': {
            color: COLORS.grey35,
            backgroundColor: COLORS.grey85
        }
	},
	password: {
        display: 'inline-block',
        marginBottom: '1rem'
	},
	buttons: {
		float: 'right',
		marginBottom: '1rem'
	},
	list: {
		padding: 0,
		listStyle: 'none',
		marginTop: '0',
		border: `1px solid ${COLORS.grey85}`,
        borderRadius: '2px',
        maxHeight: '25vmax',
        overflowY: 'auto',
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
	ico: {
		height: '20px',
		width: '20px',
		float: 'left',
		margin: '4px 0',
		marginLeft: '.5rem',
		cursor: 'default',
	},
	labelIco: {
		float: 'left',
		marginTop: '7px',
		cursor: 'pointer',
	},
	rowIco: {
		clear: 'both',
		cursor: 'pointer',
		':hover' : {
			backgroundColor: COLORS.blue
		}
	},
	cssAux: {
		backgroundColor: 'COLORS.blueDark',
		fontSize: '.875rem',
		color: 'COLORS.grey15',
		':focus': {
			borderColor: COLORS.blue
		}
	},
	dateInput: {
		minWidth: '192px'
	},
	btnStyle:{
		height: '100%',
	}
});