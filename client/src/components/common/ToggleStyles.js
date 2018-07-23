import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  fieldset: {
		marginBottom: '1rem'
	},
	label: {
		display: 'inline-block',
		fontSize: '.75rem',
		fontWeight: 'bold',
		textAlign: 'left',
		color: COLORS.grey35,
    marginBottom: '.5rem',
    float: 'left',
		textIndent: '.5rem',
		width: '100%',
	},
	toggleContainer: {
    width: '55px',
    height: '26px',
    borderRadius: '13px',
    overflow: 'hidden',
    lineHeight: '26px',
    fontSize: '13px',
    color: '#fff',
    cursor: 'pointer',
  },
  toggleContent: {
    display: 'inline-flex',
    padding: '0px 5px',
    transition: 'all .5s ease'
  },
  toggleCircle: {
    backgroundColor: '#fff',
    height: '18px',
    width: '18px',
    borderRadius: '10px',
    margin: '4px 5px'
  }
});