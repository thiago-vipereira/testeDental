import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gridColumnGap: '1rem',
        margin: '0 1rem 1rem',
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
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
    sectionTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
        borderBottom: `1px solid ${COLORS.grey77}`
    },
	newUserModal: {
		maxWidth: '400px'
    },
    permissionsModal: {
        maxWidth: '500px'
    },
    backgroundCard: {
        backgroundColor: '#FFF',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
        padding: '1rem',
        borderRadius: '4px',
    },
});