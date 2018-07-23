import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  listContainer: {
    borderLeft: `1px solid ${COLORS.grey85}`,
    borderRight: `1px solid ${COLORS.grey85}`,
    borderBottom: `1px solid ${COLORS.grey85}`,
    marginTop: '2.5rem'
  },
  link: {
    color: COLORS.grey35,
    textDecoration: 'none',
  },
  line: {
    minHeight: '28px',
    cursor: 'pointer',
    padding: '4px',
    borderTop: `1px solid ${COLORS.grey85}`,
    ':hover': {
      backgroundColor: COLORS.grey85
    }
  },
  containerOption: {
    position: 'absolute',
    padding: '.8rem',
    borderRadius: '2px',
    width: '140px',
    top: '-56px',
    right: '0px',
    cursor: 'pointer',
    backgroundColor: COLORS.primary
  },
  create: {
    color: COLORS.white,
    fontSize: '.95rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '500px'
  }
});