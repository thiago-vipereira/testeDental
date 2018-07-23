import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  headerGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gridColumnGap: '1rem',
        marginBottom: '2rem',
        height: '275px'
    },
    htmlGrid: {
        display: 'grid',
        gridTemplateColumns: '4fr 1fr',
        gridColumnGap: '1rem',
        marginBottom: '1rem',
    },
    footer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginBottom: '1rem'
    },
    picture: {
      overflow: 'hidden',
      border: '14px dashed #a6a6a6',
      height: 'calc(100% + 24px)',
      width: 'calc(100% + 24px)',
      marginTop: '-12px',
      marginLeft: '-12px'
    },
    pictureInside: {
        height: '100%',
        width: '100%',
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: '.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pictureImg: {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto'
    },
    plus: {
        height: '30px',
        width: '30px',
        margin: 'auto',
        lineHeight: '26px',
        textAlign: 'center',
        backgroundColor: '#d9d9d9',
        borderRadius: '13px',
        display: 'block',
        cursor: 'pointer'
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
    closePosition: {
        display: 'flex',
        position: 'relative',
        marginLeft: 'calc(100% - 13px)',
        cursor: 'pointer'
    },
    close: {
        height: '13px',
        width: '13px',
        backgroundColor: '#a6a6a6',
        lineHeight: '9px',
        borderRadius: '0px 0px 0px 2px'
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
    }
});