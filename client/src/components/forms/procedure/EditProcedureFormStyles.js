import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridColumnGap: '1rem',
        margin: '0 1rem',
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    flex:{
        display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',				//add
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem'

    },
    formList: {
        flex: '1',
        minWidth: '100%',

    },
    formContent: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },

    formGroup:{
        flex: '1',
        paddingRight: '20px',
        marginTop: '1rem'

    },
    backgroundGroup: {
        backgroundColor: '#FFF',
        borderRadius: '4px',
        padding: '1rem',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',

    },

    formProcedure:{
        flex:'4',
        marginTop: '1rem',
        marginLeft: '1rem',
    },

    backgroundProcedure: {
        backgroundColor: '#FFF',
        borderRadius: '4px',
        padding: '1rem',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    },
    
    listContainer: {
        width: '100%',
        gridColumn: '2',
        marginBottom: '1rem'
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
        //display: 'grid',
        //gridTemplateColumns: '4fr 2fr',
        //gridColumnGap: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#FFF',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        
    },
    row: {
        display: 'grid',
        gridColumnGap: '1rem',
    },
    password: {
        display: 'inline-block',
        marginBottom: '1rem',
        width: '100%'
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
	msgAuth_modal: {
		textAlign: 'center',
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
    },
    newProcedureModal: {
		maxWidth: '400px'
    },
    link: {
		fontSize: '0.875rem',
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
    listName: {
        fontWeight: 'bolder',
    },
    btnProcedure: {
        margin: '1rem'
    },
    red: {
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        marginBottom: '-4px',
    },
});