import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	sideMenu: {
		position: 'relative',
		backgroundColor: COLORS.grey15,
		color: COLORS.grey85,
		fontSize: '.75rem',
		gridColumn: 1,
		gridRow: '1 / 3',
		justifySelf: 'stretch',
		minHeight: '402px'
	},
	navList: {
		padding: 0,
		listStyle: 'none',
		margin: '1rem 0'
	},
	navListBottom: {
		position: 'absolute',
		width: '100%',
		bottom: 0
	},
	navLink: {
	
		position: 'relative',
		display: 'block',
		height: '2rem',
		padding: '0rem 1rem',
		color: COLORS.grey85,
		textDecoration: 'none',
		transition: 'all .5s ease',
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'rgb(64, 64, 64, 0.8)'
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
		marginLeft: '.9em',
	},

	wrapper: {
		width: '200px',
		height: '99vh',
		position:'absolute'
	}
});