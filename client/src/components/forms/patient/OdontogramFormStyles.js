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
	flex2: {
		padding: '0 1rem !important',
        display: 'block !important',
	},
    form: {
		width: '900px',
		height: '100%',
	},
	form2: {
		width: '870px',
		height: '100%',
		minWidth: '870px',
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
    },
    section: {
		marginBottom: '1rem',
		padding: '1rem',
		backgroundColor: '#FFF',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
	},
	sectionStatus: {
		marginBottom: '1rem',
		backgroundColor: '#FFF',
		borderRadius: '4px',
		boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    },
	list: {
		listStyle: 'none',
		marginTop: '0',
		borderRadius: '2px',
        maxHeight: '100%',
		overflowY: 'auto',
		marginBottom: '1rem',
		backgroundColor: '#ececec',
		padding: '1rem'
	},
	listItem: {
		backgroundColor: '#ececec',
		borderRadius: '4px',
		float: 'left',
		height: '175px',
		width: '50px',
		margin: '1px',
	},
	listItemStatusTop: {
		background: 'linear-gradient(#e6e6e6, #fff);',
		borderRadius: '4px',
		float: 'left',
		height: '110px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		border: '1px solid #e6e6e6',
	},
	listItemStatusTopDeciduos: {
		background: 'linear-gradient(#d0ebff, #fff);',
		borderRadius: '4px',
		float: 'left',
		height: '110px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		border: '1px solid #d0ebff',
	},
	listItemStatusBot: {
		background: 'linear-gradient(#fff, #e6e6e6);',
		borderRadius: '4px',
		float: 'left',
		height: '110px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		border: '1px solid #e6e6e6',
	},
	listItemStatusBotDeciduos: {
		background: 'linear-gradient(#fff, #d0ebff);',
		borderRadius: '4px',
		float: 'left',
		height: '110px',
		width: '50px',
		margin: '1px',
		position: 'relative',
		border: '1px solid #d0ebff',
	},
	noItems: {
		padding: '.5rem',
		textAlign: 'center'
	},
    date: {
		fontSize: '.8rem',
		lineHeight: '19px',
		color: COLORS.grey65,
		transition: 'color .5s ease',
	},
	statusNumberTop: {
		fontSize: '.8rem',
		lineHeight: '19px',
		color: COLORS.grey65,
		transition: 'color .5s ease',
		position: 'absolute',
		textAlign: 'center',
		width: '100%',
		fontWeight: '600',
	},
	statusNumberBot: {
		fontSize: '.8rem',
		lineHeight: '19px',
		color: COLORS.grey65,
		transition: 'color .5s ease',
		position: 'absolute',
		textAlign: 'center',
		width: '100%',
		top: '91px',
		fontWeight: '600',
	},
	red: {
		color: COLORS.red,
		':hover': {
			color: COLORS.redDark
		}
    },
    link2: {
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
	link: {
		color: COLORS.primary,
		cursor: 'pointer',
		':hover': {
		  textDecoration: 'underline'
		}
	},
    modal: {
		maxWidth: '614px'
	},
	modalEdit: {
		maxWidth: '210px'
    },
    modal_del: {
		maxWidth: '400px'
	},
	btnNote: {
		marginBottom: '.5rem'
	},
	tooth: {
		position: 'absolute'
	},
	status_top_left: {
		marginRight: '5px',
		display: 'block',
		float: 'left',
	},
	status_top_right: {
		display: 'block',
		float: 'left',
	},
	status_top_left_deciduos: {
		marginRight: '5px',
		display: 'block',
		float: 'left',
		paddingLeft: '156px',
	},
	status_top_right_deciduos: {
		display: 'block',
		float: 'left',
	},
	status_bot_left_deciduos: {
		marginRight: '5px',
		display: 'block',
		float: 'left',
		paddingLeft: '156px',
	},
	status_bot_right_deciduos: {
		display: 'block',
		float: 'left',
	},
	status_bot_left: {
		marginRight: '5px',
		display: 'block',
		float: 'left',
	},
	status_bot_right: {
		display: 'block',
		float: 'left',
	},
	status_top: {
		display: 'block',
		clear: 'both',
		marginBottom: '5px',
	},
	status_top_deciduos: {
		display: 'block',
		clear: 'both',
		marginBottom: '5px',
	},
	status_bot_deciduos: {
		display: 'block',
		clear: 'both',
		marginBottom: '5px',
	},
	status_bot: {
		display: 'block',
		clear: 'both',
	},
	pointer: {
		pointerEvents: 'auto !important',
		cursor: 'pointer',
		width: '77px !important',
		background: '#FFFFFF !important',
		border: '1px solid #DCDCDC !important',
		borderRadius: '4px !important',
		padding: '3px !important',
		display: 'flex !important',
		flexWrap: 'wrap !important',
		':after': {
			borderLeftColor: '#FFFFFF !important',
		},
	},
	btn_modal: {
		cursor: 'pointer',
		height: '100%',
		width: '100%',
		textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
		borderRadius: '10%',
		borderRight: '1px solid '+COLORS.grey85,
		borderBottom: '1px solid '+COLORS.grey85,
		margin: '2px',
		padding: '1px',
        height: '100%',
        lineHeight: '25px',
        color: COLORS.grey35,
        fontSize: '.75rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color .5s ease, background-color .25s ease',
        ':hover': {
            color: '#FFFFFF !important',
            backgroundColor: COLORS.grey85
		},
		backgroundColor: '#ececec',
	},
	labelStatus: {
		display: 'inline-block',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem',
		paddingTop: '2px',
		paddingBottom: '2px',
		paddingRight: '.7rem'
  	},
  	pointerConfig: {
		width: '210px !important',
		background: '#FFFFFF !important',
		padding: '3px !important',
		display: 'flex !important',
		flexWrap: 'wrap !important',
	},
	subtitle: {
		margin: '0px 20px 0px 0px',
	},
	subtitleBot: {
		margin: '5px 0px 6px 0px',
		display: 'inline-flex',
	},
	ball: {
		height: '15px',
		width: '15px',
		margin: '2px 5px 0px 0px',
		borderRadius: '100%',
		float: 'left',
	},
	status_odontogram: {
		height: '477px',
	},
});