import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	btn: {
		borderRadius: '100%',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: '40px',
		minHeight: '40px',
		cursor: 'pointer',
		marginRight: '.5rem',
		transition: 'background-color .5s ease',
		zIndex: 3,
		//float: 'left',
		':hover': {
			backgroundColor: COLORS.grey85
		},
		':last-child': {
			marginRight: 0,
		}
	},
	right: {
		float: 'right'
	},
	tip: {
		
		boxShadow: '10px black'
	}
});