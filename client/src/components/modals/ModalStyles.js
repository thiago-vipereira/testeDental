import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	overlay: {
		position: 'fixed',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: '200px',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		opacity: 0,
		transition: 'opacity .25s ease',
		maxHeight: '100vh',
		zIndex: 999
	},
	overlayOpen: {
		opacity: 1
	},
	overlayClose: {
		opacity: 0
	},
	modal: {
		width: '80%',
		background: '#fff',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '2px',
		outline: 'none',
		boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
		maxHeight: '100%'
	},
	header: {
		padding: '.5rem',
		color: '#fff',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'center',
		background: COLORS.gradient,
	},
	headerWindow: {
		padding: '.5rem',
		color: '#fff',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'center',
		background: '#45AFE5',
	},
	closeIco: {
		height: '20px',
		width: '12px',
		float: 'right',
		marginLeft: '7px',
		cursor: 'pointer',
	},
	minIco: {
		height: '20px',
		width: '12px',
		float: 'right',
		cursor: 'pointer',
	},
	flexIco: {
		height: '30px',
		marginTop: '-30px',
		width: '100%',
		float: 'right',
		padding: '5px 8px 0px 0px',
	},
});
