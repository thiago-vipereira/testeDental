import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    nameGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        gridColumnGap: '1rem',
        backgroundColor: '#FFF',
        marginBottom: '1rem',
        borderRadius: '4px',
        padding: '1rem',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    },
    htmlGrid: {
        display: 'grid',
        gridTemplateColumns: '6fr 3fr',
        gridColumnGap: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#FFF',
        borderRadius: '4px',
        padding: '1rem',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',

    },
    html: {
        height: '550px',
        border: '1px solid #a6a6a6',
        overflow: 'auto',
        padding: '0px 10px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 5fr 1fr',
        gridColumnGap: '1rem',
        margin: '0 1rem',
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem',
        gridColumn: '2'
    },
    sectionTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
        borderBottom: `1px solid ${COLORS.grey77}`
    },
    variables: {
        height: '470px',
        marginTop: '1rem',
        border: '1px solid #a6a6a6',
        overflowY: 'auto'
    },
    itemMenu: {
        padding: '.5rem',
        border: '0px',
        fontSize: '.875em',
        color: '#262626',
        backgroundColor: '#d9d9d9',
        borderBottom: '.5px solid #a6a6a6'
    },
    subItemMenu: {
        padding: '.4rem .8rem',
        border: '0px',
        fontSize: '.8em',
        color: '#262626',
        backgroundColor: '#e9e9e9',
        borderBottom: '.5px solid #d1d1d1'
    },

});