import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
    form: {
        margin: '1.5rem 0 1rem 0'
    },
    sendModal: {
        width: '1080px',
        height: 'calc(100vh - 95px)',
        // maxWidth: '95%',
        // maxHeight: '90vh'
    },
    emailModal: {
        width: '600px'
    },
    warningModal: {
        width: '270px'
    },
    over_bar: {
		width: '80%',
        backgroundColor:'white',
        float: 'right',
    },
    patient: {
		width: '20%',
        backgroundColor:'#d9d9d9',
        float: 'left',
        height: '50px',
        paddingLeft: '26px',
        lineHeight: '49px',
        color: '#595959',
        fontSize: '.75rem',
        fontWeight: 'bold',
    },
	bar: {
		height: '50px',
		width: '100%',
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
    bar2: {
		height: '50px',
		padding: '.75rem 1rem',
        borderBottom: `1px solid ${COLORS.grey85}`,
        backgroundColor:'white'
    },
    listContainer: {
        borderLeft: `1px solid ${COLORS.grey85}`,
        borderRight: `1px solid ${COLORS.grey85}`,
        borderBottom: `1px solid ${COLORS.grey85}`,
    },
    line: {
        minHeight: '28px',
        cursor: 'pointer',
        padding: '4px',
        borderTop: `1px solid ${COLORS.grey85}`,
        ':hover': {
            backgroundColor: COLORS.grey85
        }
    },
    gridSendEmail: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
		gridColumnGap: '1rem',
        marginBottom: '1rem',
        height: 'calc(100% - 38px)'
    },
    gridDestination: {
        display: 'grid',
        gridTemplateColumns: '160px 20px',
    },
    gridDestinations: {
        display: 'grid',
        gridTemplateRows: '34px 1fr',
		gridRowGap: '1rem',
        height: 'calc(100vh - 209px)'
    },
    overflowList: {
        overflow: 'auto'
    },
    cutText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    destinationEmail: {
        fontSize: '.75rem'
    },
    destinationEmailEmpty: {
        fontSize: '.75rem',
        color: COLORS.red
    }
});
