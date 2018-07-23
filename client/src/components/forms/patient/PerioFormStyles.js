import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    flex: {
		display: 'flex',
		justifyContent: 'center',
		padding: '1rem',
		overflow: 'auto'
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
	},
	form: {
		width: '900px',
		height: '100%',
	},

	sectionTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
		borderBottom: `1px solid ${COLORS.grey77}`,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: '.5rem',
		marginTop: '18px'
    },
    section: {
		marginBottom: '1rem',
		padding: '1rem',
		backgroundColor: '#FFF',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
	},

	odonto_top: {
		width: '900px',
		display: 'flex',
		flexDirection: 'row',
		
	},

	odonto_bot: {
		marginTop: '1px',
		width: '900px',
		display: 'flex',
		flexDirection: 'row'
	},

	listItem: {
		borderRadius: '4px',
		height: '150px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		background: 'linear-gradient(#ececec, #fdfdfd)',
		border: '1px #ececec solid'
	},

	listItemPerioTop: {
		background: 'linear-gradient(#fdfdfd,#ececec)',
		borderRadius: '4px',
		height: '150px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		paddingTop: '20px',
		border: '1px #e5e5e5 solid',
		borderTop: 'none',
	},

	listItemPerioBottom: {
		background: 'linear-gradient(#fdfdfd,#ececec)',
		borderRadius: '4px',
		height: '150px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		border: '1px #e5e5e5 solid',
		borderTop: 'none',
	},

	listItemInfo: {
		
		background: 'linear-gradient(#fdfdfd)',
		borderRadius: '4px',
		height: '150px',
		width: '25px',
		margin: '1px',
		position: 'relative'
	},

    tooth_number: {
        display: 'inline-block',
		fontSize: '.8rem',
        lineHeight: '19px',
        textAlign: 'center',
        width: '50px',
		color: COLORS.grey65,
		transition: 'color .5s ease',
		
		bottom: '0',
		
	},

	teeth_lingual_sup: {
		transform: 'rotate(-90deg)',
		float: 'left',
		position: 'relative',
		top: '10px',
		left: '-60px',
		width: '145px',
		color: COLORS.grey65,
	},
	teeth_lingual_inf: {
		transform: 'rotate(-90deg)',
		float: 'left',
		position: 'relative',
		top: '10px',
		left: '-68px',
		width: '160px',
		color: COLORS.grey65,
	},
	teeth_bucal_sup: {
		transform: 'rotate(-90deg)',
		float: 'left',
		position: 'relative',
		top: '52px',
		left: '-63px',
		width: '150px',
		color: COLORS.grey65,
	},
	teeth_bucal_inf: {
		transform: 'rotate(-90deg)',
		float: 'left',
		position: 'relative',
		top: '51px',
		left: '-63px',
		width: '150px',
		color: COLORS.grey65,
	},
	inputPerio: {
		marginLeft: '1px',
		height: '22px',
		width: '15px',
		border: '1px solid #c4c4c4',
		textAlign: 'center',
		fontSize: '12px',
		backgroundColor: '#fff',
		borderRadius: '1px !important'
	},
	inputPerioDisabled: {
		marginLeft: '1px',
		height: '22px',
		width: '15px',
		border: '1px solid #c4c4c4',
		textAlign: 'center',
		fontSize: '12px',
		backgroundColor: '#ccc',
		borderRadius: '1px !important',
		pointerEvents:'none',
		color: '#ccc'
	},
	inputPerioFull: {
		marginLeft: '1px',
		height: '22px',
		width: '47px',
		border: '1px solid #c4c4c4',
		textAlign: 'center',
		fontSize: '11px',
		backgroundColor: '#fff',
		borderRadius: '1px !important'
	},
	
	first_separator: {
		height: '30px',
		width: '885px',
		backgroundColor: COLORS.grey85,
		borderRadius: '4px',
		marginBottom: '1px',
		textAlign: 'center',
		paddingTop: '7px'
	},

	separator: {
		height: '30px',
		width: '885px',
		backgroundColor: COLORS.grey85,
		borderRadius: '4px',
		marginTop: '15px',
		marginBottom: '1px',
		textAlign: 'center',
		paddingTop: '7px'
	},
	indice_sangramento: {
		marginLeft: '3px',
		borderRadius: "3px",
		marginTop:'21px',
		width: '20px',
		height: '21px',
		backgroundColor: '#810e0e',
		textAlign: 'center'
	},
	margem_gengival: {
		marginLeft: '3px',
		borderRadius: "3px",
		marginTop: '7px',
		width: '20px',
		height: '20px',
		backgroundColor: '#f13c56',
		textAlign: 'center'
	},	
	nivel_osseo: {
		marginLeft: '3px',
		borderRadius: "3px",
		marginTop: '7px',
		width: '20px',
		height: '20px',
		backgroundColor: '#5062eb',
		textAlign: 'center'
	},
	infoText: {
		color: '#7f7f7f',
		fontSize: '14px'
	},
	infoInterno: {
		color: 'white',
		fontSize: '12px',
		cursor: 'pointer'
	}

});