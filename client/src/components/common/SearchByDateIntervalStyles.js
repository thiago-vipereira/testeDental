import { StyleSheet } from 'aphrodite/no-important'; 

import { COLORS } from '../_constants/colors'; 

export const styles = StyleSheet.create({ 

	bar: {
		height: '50px',
		width: '100%',
		borderBottom: `1px solid ${COLORS.grey85}`,
		backgroundColor: '#FFF'
	},
	label: {
		display: 'inline-block',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem',
		paddingTop: '.7rem',
		paddingRight: '.7rem'
  },
  gridDate: { 
		display: 'flex',
		paddingTop: '7px',
		paddingLeft: '1rem',
  }
    
});