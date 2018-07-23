import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    container: {
		border: `1px solid ${COLORS.grey85}`,
		borderRadius: '2px',
		marginBottom: '1rem'
	},
	day: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr',
		gridColumnGap: '1rem',
		padding: '.5rem',
		borderBottom: `1px solid ${COLORS.grey85}`,
		':last-child': {
			borderBottom: 0,
		}
	},
	label: {
		fontWeight: 'bold',
		fontSize: '.875rem'
	},
	interval: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '.5rem'
	},
	noTime: {
		fontSize: '.875rem',
		color: COLORS.grey77,
		marginBottom: '.5rem'
	},
	delete: {
		display: 'inline-flex',
		justifyContent: 'center',
		minWidth: '20px',
		maxWidth: '20px',
		width: '20px',
		height: '20px',
		borderRadius: '10px',
		backgroundColor: COLORS.grey85,
		cursor: 'pointer',
		transition: 'background-color .5s ease',
		':hover': {
			backgroundColor: COLORS.grey77,
		}
	},
	iconX: {
		display: 'flex',
		justifyContent: 'center'
	}
});