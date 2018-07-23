import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  form: {
    margin: '1.5rem 0 1rem 0'
  },
  questions: {
    marginTop: '1rem',
    marginLeft: '1rem'
  },
  bottom5rem: {
    marginBottom: '.5rem'
  },
  checkOption: {
    marginLeft: '.5rem',
    fontSize: '.75rem'
  },
  disabledInput: {
    backgroundColor: COLORS.grey77,
    width: '100%',
    height: '35px',
		padding: '.5rem',
		border: `1px solid #ccc`,
		borderRadius: '3px',
		fontSize: '.875em',
		color: COLORS.grey15,
    boxShadow: 'inset 0 2px 4px 0 hsla(0,0%,0%, 0.08)',
    margin: '1rem 0'
	},
});