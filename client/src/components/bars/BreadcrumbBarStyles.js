import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	bar: {
		height: '50px',
		width: '100%',
		padding: '0 2rem',
        borderBottom: `1px solid ${COLORS.grey85}`,
        backgroundColor: '#FFF',
        
    },
    linkContainer: {
        display: 'inline-flex',
        height: '100%',
        alignItems: 'center',
        paddingRight: '1rem',
        ':last-child': {
            paddingRight: 0
        }
    },
    link: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        marginRight: '1rem',
        //lineHeight: '25px',
        color: COLORS.grey35,
        fontSize: '.75rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color .5s ease, background-color .25s ease',
        ':before': {
            content: '""',
            position: 'absolute',
            height: '.25rem',
            width: '100%',
            left: 0,
            bottom: 0,
            opacity: 0,
            backgroundColor: COLORS.primary,
            transition: 'opacity .25s ease'
        },
        ':hover': {
            ':before': {
                opacity: 1
            }
        }
    },
    active: {
        color: COLORS.grey35,
        cursor: 'default',
        pointerEvents: 'none',
        ':before': {
			content: '""',
			position: 'absolute',
			height: '.25rem',
			width: '100%',
			left: 0,
            bottom: 0,
            opacity: 1,
            backgroundColor: COLORS.primary,
            transition: 'opacity .25s ease'
		}
    }
});
