import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	navLink: {
		position: 'relative',
		display: 'block',
		height: '2.5rem',
		padding: '0.25rem 1rem',
		color: 'white',
		textDecoration: 'none',
		transition: 'all .5s ease',
		':hover': {
			backgroundColor: 'rgb(64, 64, 64, 0.8)',
			color: COLORS.primary
		}
	},
	active: {
		color: '#fff',
		//fontWeight: 'bold',
		backgroundColor: 'rgb(64, 64, 64, 0.8)',
		':before': {
			content: '""',
			position: 'absolute',
			height: '100%',
			width: '.25rem',
			left: 0,
			top: 0,
			backgroundColor: COLORS.primary
		}
	},
	navText: {
		verticalAlign: 'middle',
		lineHeight: '2rem',
		marginLeft: '.9em'
	},

	warning: { 
		paddingTop: '3px',
		marginTop: '6px',
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