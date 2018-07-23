import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({

    listItem: {
		padding: '.4rem',
		paddingLeft: '10px',
		borderBottom: `1px solid ${COLORS.grey85}`,
		cursor: 'pointer',
		transition: 'background-color .5s ease',
		':last-child': {
			borderBottom: 0
        },
        ':hover': {
			backgroundColor: COLORS.grey85
		},
    },
    link: {
		fontSize: '.75rem',
		lineHeight: '19px',
		marginLeft: '.5rem',
        float: 'right',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		textDecoration: 'underline',
		cursor: 'pointer',
		':hover': {
			color: COLORS.blue
		}
	},
    list: {
		padding: 0,
		listStyle: 'none',
		margin: '1rem 0',
		border: `1px solid ${COLORS.grey85}`,
        borderRadius: '2px',
        width: '100%'
    },
    noItems: {
		padding: '.5rem',
        textAlign: 'center'
	},
	active: {
		backgroundColor: COLORS.grey85,
		width: '100%',
		height: '100%',
		display: 'block',
		position: 'relative',
		cursor: 'pointer',
		':before': {
			content: '""',
			position: 'absolute',
			height: '100%',
			width: '.25rem',
			left: 0,
			top: 0,
			backgroundColor: COLORS.primary
		}
	}, 
    red: {
        color: COLORS.red, 
        ':hover': { 
            color: COLORS.redDark 
        }
	}
});