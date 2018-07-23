import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	suggestionsContainer: {
		//marginTop: '-1rem',
		backgroundColor: '#fff',
		boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
		borderRadius: 0,
		borderBottomLeftRadius: '2px',
		borderBottomRightRadius: '2px'
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
	noResults: {
		zIndex: 1,
		padding: '2rem 1rem',
		fontSize: '.875rem',
		lineHeight: '1.5rem',
		textAlign: 'center',
		backgroundColor: '#fff',
		boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)',
		borderRadius: 0,
		borderBottomLeftRadius: '2px',
		borderBottomRightRadius: '2px'
	}
});