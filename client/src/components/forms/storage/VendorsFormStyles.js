import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    grid: {
        display: 'flex',
        margin: '0 1rem',
        justifyContent: 'center'
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    form: {
        width: '100%',
        maxHeight: '100vmax',
        paddingTop: '1rem',

    },

    listContainer: {
        width: '100%',
        gridColumn: '2',
        marginBottom: '1rem',

    },
    
    loading: {
        width: '100%',
        padding: '1rem 0 2rem',
        gridColumn: '2',
        textAlign: 'center'
    },
    card: {
        width: '100%',
        gridColumn: '2',
        marginBottom: '1rem',
        backgroundColor:'#FFF',
        borderRadius: '4px',
        padding: '1rem',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',

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
	}
});