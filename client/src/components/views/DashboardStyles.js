import { StyleSheet } from 'aphrodite/no-important';

//import { COLORS } from '../_constants/colors';

export const gridStyles = StyleSheet.create({
	grid: {
		minWidth: '1020px',
		position: 'absolute',
		height: '100%',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '200px auto',
			gridTemplateRows: '50px auto',
	},
  tableContainer: {
	margin: '0px auto 20px auto',
	width: '100%',
	
	
	backgroundColor: '#FFF',
	borderRadius: '4px',
	padding: '1rem',
	boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)'
  },
	content: {
		// height: '100%',
		gridColumn: 2,
		gridRow: '2 / 3',
		overflow: 'hidden',
		display: 'flex',				//add
		flexDirection: 'column',	//add
		backgroundColor:'#ececec'
	},
	flex: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		overflow: 'auto',				//add

	},
	flexScroll: {
		// maxHeight: '100%',
		// overflowY: 'auto'
	}
});