import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gridColumnGap: '1rem',
        margin: '0 1rem',
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    form: {
        width: '100%',
        padding: '1rem 0 2rem',
        gridColumn: '2'
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
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '1rem'
    },
    password: {
        display: 'inline-block',
        marginBottom: '1rem'
    },
    passwordModal: {
        width: '400px'
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
	}
});