import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  check: {
    width: '23px',
    height: '23px',
    border: '2px solid #a6a6a6',
    borderRadius: '3px',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  link: {
    color: COLORS.primary,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  border: {
    borderTop: '1px solid #d9d9d9',
    ':hover': {
      backgroundColor: '#d9d9d9'
    }
  },
  borderRed: {
    borderTop: '1px solid #fff',
    backgroundColor: '#eac5c5',
    ':hover': {
      backgroundColor: '#e2a1a1'
    }
  },
  borderGreen: {
    borderTop: '1px solid #fff',
    backgroundColor: '#c0eac8',
    ':hover': {
      backgroundColor: '#83d192'
    }
  },
  greenText:{
    color:'green',
  },
  redText:{
    color:'red',
  },
  defaultText: {

  },
  table : {
    borderBottom:'none'
  },
  tableFilter: {

  },
  modal: {
    maxWidth: '400px'
  },
  checkAll: {
    transition: 'background-color .5s ease',
    height: '100%'
  },
  list: {
		padding: 0,
		listStyle: 'none',
    margin: '0',
    marginBottom: '1rem',
    borderRadius: '1px',
    maxHeight: 'calc(100vh - 365px)',
    overflowY: 'auto',
  },
  listMaterials: {
		padding: 0,
		listStyle: 'none',
    margin: '0',
    marginBottom: '1rem',
    borderRadius: '1px',
    maxHeight: 'calc(100vh - 325px)',
    overflowY: 'auto',
  },
  warning: { 

		
    fontSize: '12px',
		paddingTop: '3px',
		float: 'right',
		display: 'table-cell',
		height: '20px',
		width: '20px',
		textAlign: 'center',
		verticalAlign: 'middle',
		borderRadius: '50%',
		backgroundColor: COLORS.red,
		color: 'white',
	}
});
