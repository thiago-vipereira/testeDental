import { StyleSheet } from 'aphrodite/no-important'; 

import { COLORS } from '../../_constants/colors'; 

export const styles = StyleSheet.create({ 
	grid: { 
		display: 'grid', 
		gridTemplateColumns: '1fr 2fr 1fr', 
		gridColumnGap: '1rem', 
		margin: '0 1rem', 
		padding: '1rem'
	}, 
	form: { 
		width: '100%',
        gridColumn: '2',
		margin: '0',

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
		marginBottom: '1rem',
		padding: '1rem',
		backgroundColor: '#FFF',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
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
	picture: {
		overflow: 'hidden',
		border: '14px dashed #a6a6a6',
		height: 'calc(100% + 24px)',
		width: 'calc(100% + 24px)',
		marginTop: '-12px',
		marginLeft: '-12px'
	  },
	pictureInside: {
        height: '100%',
        width: '100%',
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: '.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pictureImg: {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto'
    },
    plus: {
        height: '30px',
        width: '30px',
        margin: 'auto',
        lineHeight: '26px',
        textAlign: 'center',
        backgroundColor: '#d9d9d9',
        borderRadius: '13px',
        display: 'block',
        cursor: 'pointer'
	},
	closePosition: {
        display: 'flex',
        position: 'relative',
        marginLeft: 'calc(100% - 13px)',
        cursor: 'pointer'
	},
	close: {
        height: '13px',
        width: '13px',
        backgroundColor: '#a6a6a6',
        lineHeight: '9px',
        borderRadius: '0px 0px 0px 2px'
    },
});