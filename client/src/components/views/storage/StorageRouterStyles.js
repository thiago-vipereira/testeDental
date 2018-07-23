import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({

        grid: { 
		display: 'flex', 
		justifyContent: 'center',
		gridTemplateColumns: '0fr 2fr 0fr', 
		gridColumnGap: '1rem', 
	},
	gridDate: { 
		display: 'flex',
		paddingTop: '7px',
		paddingLeft: '.9rem'
	},
	form: { 
        padding: '1rem 0 0',
        gridColumn: '2',
        marginBottom: '2rem'
	}, 
	loading: { 
		width: '100%', 
		padding: '1rem 0 2rem', 
		gridColumn: '2', 
		textAlign: 'center' 
	}, 
	sectionTitle: { 
		textTransform: 'uppercase', 
		color: COLORS.grey50, 
		fontSize: '.75rem', 
		borderBottom: `1px solid ${COLORS.grey77}` 
	}, 
	section: {
		marginBottom: '1rem' 
	},
	section2: {
		paddingTop: '0.45rem',
	},
	infoRow: { 
		display: 'grid', 
		gridTemplateColumns: '1fr 2fr', 
		gridColumnGap: '1rem' 
	},
	row_1: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridColumnGap: '1rem'
    },
    row_3: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
        gridColumnGap: '1rem'
    },
	row_2: { 
		display: 'grid', 
		gridTemplateColumns: '1fr 1fr', 
		gridColumnGap: '1rem' 
	}, 
	msgAuth: { 
		fontSize: '.875rem', 
		color: COLORS.red, 
		border: `1px solid ${COLORS.red}`, 
		borderRadius: '2px', 
		padding: '.5rem', 
		marginBottom: '1rem' 
	},
	bar: {
		height: '50px',
		width: '100%',
		borderBottom: `1px solid ${COLORS.grey85}`,
		backgroundColor: '#FFF'
	},
	label: {
		display: 'inline-block',
		marginBottom: '1rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem',
		paddingTop: '.7rem',
		paddingRight: '.7rem'
	},
	row_date: {
        display: 'grid',
        gridTemplateColumns: '0.3fr 1fr 0.1fr 1fr',
        gridColumnGap: '.5rem'
	},
	auditModal: {
		maxWidth: '400px'
	}
});