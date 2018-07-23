import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  check: {
    width: '23px',
    height: '23px',
    border: '2px solid #a6a6a6',
    borderRadius: '3px',
    textAlign: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  link: {
    color: COLORS.primary,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  border: {
    borderTop: '1px solid #d9d9d9',
    ':hover': {
      backgroundColor: '#d9d9d9'
    }
  },
  modal: {
    maxWidth: '400px'
  },
  checkAll: {
    transition: 'background-color .5s ease',
    height: '100%'
  },
  inputNames: {
    cursor: 'pointer',
  }
});
