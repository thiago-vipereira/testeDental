import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	btn: {
		//display: 'inline-flex',
		//alignItems: 'flex-end',
		padding: '.75rem 1rem',
		color: '#fff',
		fontSize: '.75rem',
		borderRadius: '2px',
		marginRight: '.5rem',
		transition: 'background-color .5s ease',
		':last-child': {
			marginRight: 0,
		},
		':hover > span > span > svg > path':  {
			fill:'#FFF',
		}
	},
	btnBucket: {
		display: 'inline-flex',
		alignItems: 'flex-end',
		padding: '.75rem 1rem',
		color: '#fff',
		fontSize: '.75rem',
		borderRadius: '2px',
		marginRight: '.5rem',
		transition: 'background-color .5s ease',
		':last-child': {
			marginRight: 0,
		},
		':hover > span > span > svg > path':  {
			fill:'#FFF',
		}
	},
	primary: {
		backgroundColor: COLORS.primary,
		':hover': {
			backgroundColor: COLORS.blue
		}
	},
	secondary: {
		color: COLORS.grey35,
		backgroundColor: COLORS.secondary,
		':hover': {
			backgroundColor: COLORS.grey77
		}
	},
	green: {
		backgroundColor: COLORS.green,
		':hover': {
			backgroundColor: COLORS.greenDark
		}
	},
	green2: {
		backgroundColor: COLORS.green2,
		':hover': {
			backgroundColor: COLORS.greenDark2
		}
	},
	red: {
		backgroundColor: COLORS.red,
		':hover': {
			backgroundColor: COLORS.redDark
		}
	},
	white:{
		backgroundColor: COLORS.white,
		color: COLORS.red,
		':hover': {
			backgroundColor: COLORS.red,
			color: COLORS.white,
		}
	},
	disabled: {
		color: COLORS.grey85,
		backgroundColor: COLORS.grey65,
		pointerEvents: 'none',
		cursor: 'default'
	},
	large: {
		minWidth: '95px',
		fontSize: '1rem'
	},
	medium: {
		height: '35px',
    padding: '0 .75rem'
	},
	right: {
		float: 'right'
	},
	full: {
		width: '100%'
	},
	iconBucket: {
		marginRight: '3px'
	},
	
});