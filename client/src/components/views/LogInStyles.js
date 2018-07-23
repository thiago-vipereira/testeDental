import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	grid: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'stretch'
	},
	column: {
		position: 'relative'
	},
	columnForm: {
		width: '41.666%',
		display: 'flex',
		alignItems: 'center'
	},
	columnLog: {
		width: '58.333%',
		background: COLORS.gradient,
		display: 'flex',
		alignItems: 'center'
	},
	bottomAbsolute: {
		position: 'absolute',
		width: '100%',
		bottom: '10%'
	},
	bottomLinks: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '0 15%'
	},
	subscription: {
		textAlign: 'center',
		fontSize: '.875em'
	},
	subscriptionTxt: {
		marginRight: '.5em'
	},
	tips: {
		width: '70%',
		maxHeight: '70%',
		margin: '0 auto',
		color: '#fff',
		textAlign: 'center',
		lineHeight: '1.5'
	},
	formContainer: {
		width: '100%',
		margin: '0 auto'
	},
	loading: {
		width: '100%',
		textAlign: 'center'
	},
	wrapper: {
		width: '100%',
		height: '100vh',
		position:'absolute',
		overflow: "hidden"
	}
});
