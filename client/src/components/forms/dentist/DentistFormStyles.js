import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        
        
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    content: {
        display: 'flex',
        width: '1600px',

    },
    form: {
        flex: '2',
        padding: '1rem',
        margin: '2rem 0',

    },
    schedule: {
        flex: '1',
        padding: '1rem',
        margin: '2rem 0',
    },
    backgroundCard: {
        padding: '1rem',
        backgroundColor:'#FFF',
        borderRadius: '4px',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
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
        marginBottom: '1rem',
        backgroundColor:'#FFF',
        borderRadius: '4px',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        padding: '1rem'
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
        width: '100%',
        gridColumn: '2',
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
    form_modal: {
		width: '100%',
        padding: '1rem'
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
});