import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../../_constants/colors';

export const styles = StyleSheet.create({
	suggestionsContainer: {
		//marginTop: '-1rem',
		position: 'absolute',
		width: '100%',
		height: '220px',
		overflowX: 'hidden',
		overflowY: 'scroll',
		backgroundColor: '#fff',
		boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
		borderRadius: 0,
		borderBottomLeftRadius: '2px',
		borderBottomRightRadius: '2px',
		zIndex: 2,
	},
	suggestionsList: {
		margin: 0,
		padding: '.5rem 0',
		listStyle: 'none'
	},
	suggestion: {
		padding: '.5rem 1rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		fontSize: '.875rem',
		lineHeight: '1.5rem',
		cursor: 'pointer',
		':hover': {
			backgroundColor: COLORS.grey85
		},
		':last-child': {
			borderBottom: 'none'
		}
	},
	fieldset: {
		marginBottom: '1rem',
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem'
	},
	input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid ${COLORS.grey65}`,
		borderRadius: '2px',
		fontSize: '.875em',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
		}
	},
	icon: {
		position: 'absolute',
		top: '1.9rem',
		right: '.5rem',
		verticalAlign: 'middle',
		width: '18px',
		height: '18px'
	},
	path: {
		fill: COLORS.grey65
	},
	searchFix: {
		display: 'inline-block',
		marginTop: '.21875rem',
		width: '100%',
		minWidth: '280px',
	},
	input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid #ccc`,
		borderRadius: '3px',
		fontSize: '.875em',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
		},
		boxShadow: 'inset 0 2px 4px 0 hsla(0,0%,0%, 0.08)'
	},
	iconPatient: {
		position: 'absolute',
		top: '.7rem',
		right: '.7rem',
		verticalAlign: 'middle',
		width: '18px',
		height: '18px'
	},
	pathPatient: {
		fill: COLORS.grey65
	}
});