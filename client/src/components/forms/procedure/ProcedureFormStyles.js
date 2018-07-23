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
    form: {
        width: '60%',
        height: '100%',
        paddingTop: '1rem',
        
    },

    listContainer: {
        width: '100%',
    },

    list: {
        backgroundColor: '#FFF',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        padding: '1rem',
        borderRadius: '4px',
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
        marginBottom: '1rem'
    },

    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '1rem',
    },

    row_2: { 
		display: 'grid', 
		gridTemplateColumns: '1fr 1fr', 
		gridColumnGap: '1rem' 
	},

    password: {
        display: 'inline-block',
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
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        width: '100%',
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
    },
    label2: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.grey35,
		textIndent: '.5rem',
	},
    backgroundCard: {
        marginBottom: '1rem',
        height: '57px',
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
    fieldset: {
		marginBottom: '1rem',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
    },
    preview_field: {
		display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '1rem',
        marginBottom: '1rem',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        width: '368px',
	},
});