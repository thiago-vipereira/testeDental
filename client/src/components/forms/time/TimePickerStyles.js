import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
	label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem'
	},
	timePicker: {
		position: 'relative',
		maxWidth: '70px',
		display: 'inline-flex'
	},
	input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid ${COLORS.grey65}`,
		borderRadius: '2px',
		fontSize: '.875em',
		textAlign: 'center',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
		}
	},
	tp_clock: {
		position: 'absolute',
		zIndex: 1,
		display: 'flex',
		height: '120px',
		width: '100px',
		backgroundColor: '#fff',
		boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.25)',
		visibility: 'visible',
		opacity: 1,
		transition: 'opacity .5s ease, height .5s ease',
		borderRadius: '2px'
	},
	hide: {
		visibility: 'hidden',
		height: 0,
		opacity: 0,
		transition: 'visibility 0s .5s, opacity .5s ease, height .5s ease'
	},
	tick: {
		width: '50%',
		padding: '.5rem .5rem .5rem .5rem',
		display: 'flex',
		flexFlow: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	tickType: {
		fontSize: '.75rem',
		fontWeight: 'bold',
		marginBottom: '.25rem',
		userSelect: 'none'
	},
	tickNumber: {
		fontSize: '1.5rem',
		margin: '.25rem',
		color: COLORS.primary,
		userSelect: 'none'
	},
	arrow: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		borderRadius: '2px',
		cursor: 'pointer',
		paddingBottom: '2px',
		transition: 'background-color .5s ease',
		':hover': {
			backgroundColor: COLORS.grey85
		}
	}
});