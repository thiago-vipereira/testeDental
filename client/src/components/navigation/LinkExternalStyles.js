import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	link: {
		fontSize: '.875rem',
		color: COLORS.blueDark,
		transition: 'color .5s ease',
		':hover': {
			color: COLORS.blue
		},
		':hover path': {
			fill: COLORS.blue
		}
	},
	noUnderline: {
		textDecoration: 'none'
	},
	text: {
		marginLeft: '.5rem',
		verticalAlign: 'middle'
	}
});