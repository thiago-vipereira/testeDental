import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	input: {
		width: '100%',
		padding: '.5rem 32px .5rem .5rem',
		border: 0,//`1px solid ${COLORS.grey65}`,
		borderRadius: '2px',
		fontSize: '.875em',
		color: COLORS.grey15,
		border: '1px solid #bbb',
		backgroundColor: COLORS.grey85,
		':focus': {
			//borderColor: COLORS.blue
		},
		boxShadow: 'inset 0 2px 4px 0 hsla(0,0%,0%, 0.08)'

	},
	icon: {
		position: 'absolute',
		top: '.5rem',
		right: '.5rem',
		verticalAlign: 'middle',
		width: '18px',
		height: '18px'
	},
	path: {
		fill: COLORS.grey65
	}
});