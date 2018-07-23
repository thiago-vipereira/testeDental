import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  gridElementAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  deleteModal: {
    width: '400px'
  },
  loading: {
    position: 'absolute',
    zIndex: '1',
    backgroundColor: '#fff',
    width: '802px',
    height: '540px'
  },
  containerCard: {
    overflow: 'auto',
    backgroundColor: '#ececec',
    borderBottom: '1px solid '+COLORS.grey65,
  },
  hoverCard: {
    backgroundColor: 'rgba(256,256,256,0.6)',
    position: 'absolute',
    cursor: 'pointer',
    zIndex: '1',
    opacity: '0',
    userSelect: 'none',
    transition: 'opacity .5s ease',
    ':hover': {
      opacity: '1'
    }
  },
  containerNew: {
    height: '60px',
    backgroundColor: '#fff',
    margin: '10px 10px 0px 10px'
  },
  hoverNew: {
    transition: 'opacity .5s ease',
    opacity: '0.5',
    cursor: 'pointer',
    ':hover': {
      opacity: '1'
    }
  },
  imageContainer: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    pointerEvents: 'none'
  },
  card: {
    borderRadius: '4px',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden'
  },
  cardInside: {
    pointerEvents: 'none',
    userSelect: 'none'
  },
  gridElementTitle: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '100%'
  },
  title: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.grey65,
    textIndent: '.5rem',
    marginTop: '5px'
  },
  defaultConteiner: {
    display: 'table',
    height: '100%',
    width: '100%'
  },
  gridElementMiddle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  tableContainer: {
    borderLeft: '1px solid rgb(217, 217, 217)',
    borderRight: '1px solid rgb(217, 217, 217)',
    borderBottom: '1px solid rgb(217, 217, 217)'
  },
  textElementListGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: '.5rem',
  },
  numberTextElement: {
    color: COLORS.primary,
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  stringTextElement: {
    color: COLORS.grey50,
    fontSize: '20px',
    lineHeight: '32px'
  }
})