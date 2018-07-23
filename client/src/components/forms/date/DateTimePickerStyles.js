import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem'
	},
  input: {
    width: '100%',
    padding: '.5rem',
    border: `1px solid ${COLORS.grey65}`,
    borderRadius: '2px',
    fontSize: '.875em',
    color: COLORS.grey15,
    ':focus': {
      borderColor: COLORS.blue
    }
  },
  fieldset: {
	
  },
  icon: {
		position: 'absolute',
		top: '.5rem',
		right: '.5rem',
    marginTop: '20px'
  },
  icons: {
		position: 'absolute',
		top: '.3rem',
		right: '.5rem',
  },
  timePicker: {
    position: 'relative',
    marginBottom: '1rem'
  }
});
