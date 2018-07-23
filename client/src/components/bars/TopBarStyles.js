import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	topbar: {
		height: '50px',
		width: '100%',
		padding: '.28125rem 1rem',
		paddingLeft: 0,
		borderBottom: `1px solid ${COLORS.grey85}`
	},
	left: {
		display: 'inline-flex',
		alignItems: 'start',
		marginLeft: "10px"
	},
	right: {
		float: 'right',
		display: 'inline-flex',
		alignItems: 'start',
	},
	searchFix: {
		display: 'inline-block',
		marginTop: '.21875rem',
		marginLeft: '.5rem',
		width: '280px'
	},
	patientModal: {
		maxWidth: '400px'
	},

	notification: {
        height: '0',
        width: 'calc(100% - 200px)',
        fontSize: '.75rem',
        lineHeight: '1rem',
        textAlign: 'center',
        backgroundColor: COLORS.primary,
        opacity: 0,
        position: 'absolute',
        transition: 'all .5s ease',
		top: 0,
		marginLeft: "-16px",
		zIndex: 0,
		marginLeft: 0,
		right: 0,
		paddingRight: '200px'
	},
	
	notificationMessage:{
		color: '#fff'
		// marginLeft: "-400px"
	},

	undoButton: {
		color: '#595959',
		textDecoration: 'underline',
		marginLeft: '5px',
		cursor: 'pointer'
	},

    show: {
        height: '3.1rem',
        paddingTop: '18px',
        opacity: 1
    },
    success: {
        backgroundColor: COLORS.green
    },
    danger: {
        backgroundColor: COLORS.red
	},
	tooltip: {
		padding: '.5rem 1rem',
		borderRadius: '2px',
		opacity: '0',
		fontWeight: 'bold',
		backgroundColor: '#45AFE5',
		transition: 'opacity .5s ease',
		boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.4)'
	}
	

});
