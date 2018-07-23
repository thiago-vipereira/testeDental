import { StyleSheet } from 'aphrodite/no-important';

// import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    borderBottom: '1px solid #d9d9d9',
    height: '50px',
    fontSize: '.85rem',
    color: '#595959',
    lineHeight: '49px',
    fontWeight: 'bold',
    backgroundColor: '#FFF',
  },
  action: {
    padding: '0px 1rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#d9d9d9'
    }
  },
  newUser: { 
    width: '122px'
  },
  dropdown: {
    borderLeft: '1px solid #d9d9d9',
    borderRight: '1px solid #d9d9d9',
    padding: '0px'
  },
  content: {
    display: 'flex'
  },
  contentDrop: {
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 10px',
    position: 'absolute',
    backgroundColor: '#fff',
    marginTop: '1px',
    fontWeight: 'normal',
    lineHeight: 'normal',
    zIndex: 1
  },
  itemDrop: {
    padding: '.55rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#d9d9d9'
    }
  },
  printer: {
    padding: '0px 0.7rem',
    lineHeight: 'normal',
    display: 'table',
    height: '100%',
    verticalAlign: 'middle',
  },
  printerIcon: {
    padding: '0px 0.3rem',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  printerCircle: {
    cursor: 'pointer',
    height: '38px',
    width: '38px',
    padding: '7px',
    borderRadius: '19px',
    ':hover': {
      backgroundColor: '#d9d9d9'
    }
  },
  tooltipprinter: {
		padding: '.5rem 1rem',
		borderRadius: '2px',
		opacity: '0',
		fontWeight: 'bold',
		backgroundColor: 'black !important',
		transition: 'opacity .5s ease',
		boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)'
	}
});