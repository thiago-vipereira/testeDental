import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	fieldset: {
		marginBottom: '1rem'
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
    radioContainer: {
        width: '100%',
        float: 'left'
    },
    radioLabel: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '.75rem',
        marginLeft: '.5rem',
        marginBottom: '.5rem',
        verticalAlign: 'middle',
        cursor: 'pointer',
        ':before': {
            content: '""',
            display: 'block',
            marginRight: '.5rem',
            width: '20px',
            height: '20px',
            border: `2px solid ${COLORS.grey65}`,
            borderRadius: '100%',
            boxSizing: 'border-box'
        }
    },
    checked: {
        ':before': {
            border: `2px solid ${COLORS.primary}`
        },
        ':after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '4px',
            left: '4px',
            width: '12px',
            height: '12px',
            backgroundColor: COLORS.primary,
            borderRadius: '100%'
        }
    },
    radio: {
        display: 'none'
    }
});