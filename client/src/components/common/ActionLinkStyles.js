import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	link: {
		fontSize: '.75rem',
		color: COLORS.blue,
		textDecoration: 'underline',
		cursor: 'pointer',
		transform: 'color .5s ease',
		':hover': {
			color: COLORS.primary
		}
	}
});