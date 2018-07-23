import { StyleSheet } from 'aphrodite/no-important';

export const styles = StyleSheet.create({
    menu: {
        maxHeight: '283px',
        overflow: 'auto',
        '::-webkit-scrollbar': {
            width: '5px'
        },
        '::-webkit-scrollbar-track': {
            borderRadius: '2.5px'
        },
        '::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '2.5px'
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: '#ddd'
        }
    },
    container: {
        border: '1px solid #222',
        borderRadius: '4px 4px 0 0',
        paddingRight: '1px'
    },
    itemMenu: {
        padding: '.4rem .8rem',
        border: '0px',
        fontSize: '.8em',
        color: '#262626',
        backgroundColor: '#e9e9e9',
        borderBottom: '.5px solid #d1d1d1',
        height: '28px',
        cursor: 'pointer'
    },
    itemMenuSelected: {
        fontWeight: 'bold'
    }
});