import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	form: {
		width: '100%'
	},
	msgAuth: {
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
	},
	msgSpan: {
		marginRight: '4px'
	}
});