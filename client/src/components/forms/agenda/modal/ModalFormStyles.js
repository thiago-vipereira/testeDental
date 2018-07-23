import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../../_constants/colors';

export const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        gridColumn: '2',
        marginBottom: '1rem',
    },
    form_modal: {
		width: '100%',
        padding: '1rem'
    },
	msgAuth_modal: {
		textAlign: 'center',
		fontSize: '.875rem',
		color: COLORS.red,
		border: `1px solid ${COLORS.red}`,
		borderRadius: '2px',
		padding: '.5rem',
		marginBottom: '1rem'
    },
});