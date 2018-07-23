import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	grid: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		//alignContent: 'space-around',
		background: COLORS.gradient
	},
	formContainer: {
		width: '40%',
		margin: '0 auto',
		padding: '2rem',
		backgroundColor: '#fff',
		borderRadius: '2px',
		boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
		textAlign: 'center',
		'@media screen and (min-width: 1600px)': {
			width: '30%'
		}
	},
	msg: {
		marginBottom: '2rem'
	}
});