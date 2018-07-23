import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	loginInfo: {
		display: 'grid', 
		gridTemplateColumns: '85% 15%',
		alignItems: 'center', 
		height: '50px', 
		padding: '.5rem 1rem', 
		borderBottom: `1px solid ${COLORS.grey25}`, 
		cursor: 'pointer', 
		transition: 'all .5s ease',
		':hover': {
			backgroundColor: COLORS.grey25
		}
	},
	loginInfoLogo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '.5rem 1rem',
		borderBottom: `1px solid ${COLORS.grey25}`, 
		cursor: 'pointer', 
		transition: 'all .5s ease',
		':hover': {
			backgroundColor: 'rgb(64, 64, 64, 0.8)'
		}
	},
	mainInfo: {
		fontSize: '.875rem',
		fontWeight: 'bold',
		color: '#fff',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	secondaryInfo: {
		textAlign: 'center',
		fontStyle: 'italic',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	secondaryInfoLeft: {
		textAlign: 'left',
		fontStyle: 'italic',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	icon: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 .25rem',
	},
	dropDown: {
		position: 'absolute',
		zIndex: 1,
		width: '92%',
		borderBottomRightRadius: '2px',
		borderBottomLeftRadius: '2px',
		backgroundColor: '#fff',
		boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.75)',
		color: COLORS.grey35
	},
	list: {
		listStyle: 'none',
		padding: 0,
		margin: 0
	},
	accountOptions: {
		borderBottom: `1px solid ${COLORS.grey85}`,
		marginBottom: '.5rem'
	},
	link: {
		position: 'relative',
		padding: '.5rem 1rem',
		cursor: 'pointer',
		':hover': {
			backgroundColor: COLORS.grey85
		}
	},
	reactlink: {
		display: 'block',
		textDecoration: 'none',
		color: COLORS.grey35
	},
	active: {
		fontWeight: 'bold',
		backgroundColor: COLORS.grey85,
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
	noLogo: {
		display: 'none'
	},
	logo: {
		width: '120px',
		height: '120px',
		borderRadius: '50%',
		position: 'relative',
		overflow: 'hidden',
		margin: '.5rem'
	},
	pictureImg: {
		width: '100%',
		position: 'absolute',
		left: '50%',
		top: '50%',
		webkitTransform: 'translate(-50%, -50%)',
		mozTransform:'translate(-50%, -50%)',
		msTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',
	}
});