import { StyleSheet } from 'aphrodite/no-important';

export const styles = StyleSheet.create({
    check: {
        width: '23px',
        height: '23px',
        border: '2px solid #a6a6a6',
        borderRadius: '3px',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        marginLeft: '.5rem',
        display: 'inline-flex'
    },
  checkAll: {
    transition: 'background-color .5s ease',
    height: 'calc(100% - 1px)',
    borderRadius: '3px',
    marginTop: '1px',
    marginLeft: '1px',
    width: 'calc(100% - 2px)'
  },
});