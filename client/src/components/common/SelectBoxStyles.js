import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	fieldset: {
		marginBottom: '1rem'
	},
	input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid ${COLORS.grey65}`,
		webkitBorderRadius: '2px',
		mozBorderRadius: '2px',
		borderRadius: '2px',
		height: '34px',
		fontSize: '.875em',
		backgroundColor: '#fff',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
		}
	},
	container: {
        width: '100%',
        float: 'left'
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
	msgError: {
		display: 'block',
		marginTop: '.5rem',
		borderRadius: '2px',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.red,
		textIndent: '.5rem'
	}
});