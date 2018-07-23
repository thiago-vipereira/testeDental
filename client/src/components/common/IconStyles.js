import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	icon: {
		display: 'inline-block',
		//verticalAlign: 'middle',
		minWidth: '16px',
		//height: '16px',
		textAlign: 'center'
	},
	path: {
		fill: '#ffffff',
		transition: 'fill .2s ease'
		// transitionProperty: 'fill',
		// transitionDuration: '0.5s'
	},

	normal: {
		width: '32px',
		//height: '32px',
	},
	large: {
		width: '48px',
		//height: '48px',
	},
	blueDark: {
		fill: COLORS.blueDark
	},
	grey: {
		fill: COLORS.grey35
	},
	grey65: {
		fill: COLORS.grey65
	},
	grey77: {
		fill: COLORS.grey77
	},
	grey85: {
		fill: COLORS.grey85
	},
	primary: {
		fill: COLORS.primary
	},
	red: {
		fill: COLORS.red,
		':hover': {
			fill: COLORS.white,
			transition: 'fill .2s ease'
		}
	},
	white: {
		stroke: COLORS.white
	},
	
	blueDark_stroke: {
		stroke: COLORS.blueDark
	},
	grey_stroke: {
		stroke: COLORS.grey35
	},
	grey65_stroke: {
		stroke: COLORS.grey65
	},
	grey77_stroke: {
		stroke: COLORS.grey77
	},
	grey85_stroke: {
		stroke: COLORS.grey85
	},
	primary_stroke: {
		stroke: COLORS.primary
	},
	red_stroke: {
		stroke: COLORS.red,
		':hover': {
			stroke: COLORS.white,
			transition: 'fill .2s ease'
		}
	},
	white_stroke: {
		stroke: COLORS.white
	},
	
	marginTop: {
		marginTop: '-1px'
	},
	mirror: {
		transform: 'scaleX(-1)'
	},
	mirrorTop: {
		transform: 'scaleY(-1)'
	},
	arrowLeft: {
		marginLeft: '-1px',
		marginTop: '-3px'
	},
	arrowRight: {
		marginRight: '-5px',
		marginTop: '-3px'
	},
	right: {
		float: 'right'
	},
	balloon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: '25px',
        padding: '0px 5px',
        height: '100%',
        fontSize: '.8rem',
		lineHeight: '15px',
		color: '#fff',
		transition: 'color .5s ease',
		textAlign: 'center',
		width: '50px',
		fontWeight: '600',
	},
	midBlock: {
		height: '50px',
		width: '22px',
		position: 'relative',
		float: 'left',
	},
});