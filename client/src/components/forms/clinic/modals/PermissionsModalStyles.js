import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../../_constants/colors';

export const styles = StyleSheet.create({
    form: {
        width: '100%',
        padding: '1rem'
    },
    container: {
        display: 'flex',
    },
    flexItem: {
        flex: '1',
        paddingBottom: '1rem',
    },
    tab: {
        width: '100%',
        marginBottom: '1rem',
    },
    checksContainer:{
        float: 'right'
    },
    list: {
        width: '100%',
        padding: '0',
        border: `1px solid ${COLORS.grey77}`
    },
    modules: {
        listStyle: 'none',
        padding: '.5rem',
        //borderBottom: `1px solid ${COLORS.grey77}`, 
        cursor: 'pointer',
        backgroundColor: COLORS.grey85
    },
    moduleLI: {
        listStyle: 'none',
        padding: '0',
        cursor: 'pointer',
        backgroundColor: COLORS.grey85,
        borderBottom: `1px solid ${COLORS.grey65}`,
    },
    openModules: {
            listStyle: 'none',
            padding: '.5rem',
            borderBottom: `1px solid ${COLORS.grey77}`,
            backgroundColor: COLORS.grey65,
            cursor: 'pointer'
    },
    subModules: {
        listStyle: 'none',
        padding: '.5rem 1rem .5rem 2.5rem',
        //borderBottom: `1px solid ${COLORS.grey85}`,
        cursor: 'default',
        backgroundColor: COLORS.white
    },
    subText: {
        display: 'inline-block'
    },
    modulesHeader: {
        paddingLeft: '.5rem',
        fontWeight: 'bold',

    },
    openModHeader: {
        paddingLeft: '.5rem',
        fontWeight: 'bold',
        //color: COLORS.grey85
    },
    headerContainer:{
        display: 'inline',
        float: 'right'
    },
    header: {
        marginLeft: '.5rem',
        fontWeight: 'bold'
    },
    headers2: {
        paddingLeft: '16px',
        fontWeight: 'bold'
    },
    headers3: {
        paddingLeft: '10px',
        fontWeight: 'bold'
    },
    rows: {
        height: '36px',
        border: '1px solid #d9d9d9'
    },
    name: {
        paddingLeft: '.5rem'
    }
});