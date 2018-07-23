import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  container: {
    height: 'calc(100vh - 50px)',
    overflow: 'auto',
    zIndex: '1'
  },
  resizable: {
    minHeight: '100%',
    minWidth: '100%'
  },
  squares: {
    backgroundImage: "linear-gradient(#ececec 10px, transparent 0%), linear-gradient(to left, #d9d9d9 85px, #ececec 10px)",
    backgroundSize: '95px 95px',
  },
  circle: {
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: '#c4c4c4',
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: '998',
    backgroundColor: COLORS.blue
  },
  circleEdit: {
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: '#c4c4c4',
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: '998',
  },
  edit: {
    bottom: '20px',
    right: '20px',
    height: '50px',
    width: '50px',
    lineHeight: '50px',
    borderRadius: '25px',
    backgroundColor: COLORS.green
  },
  save: {
    bottom: '20px',
    right: '20px',
    height: '50px',
    width: '50px',
    lineHeight: '50px',
    borderRadius: '25px',
    backgroundColor: '#1b998b',
  },
  item: {
    padding: '0.5rem',
    // borderBottom: '1px solid #d9d9d9',
    border: '1px solid #d9d9d9',
    margin: 0
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)'
  },
  row: {
    width: '100%',
    marginRight: '0px',
    marginBottom: '0.5rem'
  },
  plus: {
    bottom: '25px',
    height: '40px',
    width: '40px',
    transition: "right .5s",
    lineHeight: '40px',
    borderRadius: '20px'
  },
  addModal: {
    maxWidth: '348px'
  },
  addElementModalVisual: {
    width: 'calc(1000px + 2rem)',
    height: '681px',
    overflow: 'unset'
  },
  addElementModalText: {
    width: '600px',
    height: '400px',
    overflow: 'unset'
  },
  footer: {
    padding: '1rem',
    display: 'table',
    width: '100%'
  },
  form: {
    width: '100%',
    height: 'calc(100% - 30px)',
    padding: '1rem'
  },
  gridForm: {
    display: 'grid',
    gridTemplateColumns: '100px auto',
    height: 'calc(100% - 38px)'
  },
  label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
    textIndent: '.5rem',
    marginTop: '5px'
  },
  insertImageForm: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: '.5rem',
    height: '292px'
  },
  imageContainer: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    pointerEvents: 'none'
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
  header: {
    height: '25px',
    position: 'absolute',
    width: '100%',
    top: '-20px',
    backgroundColor: 'rgba(196,196,196,0.8)',
    borderRadius: '2px 2px 0px 0px',
    padding: '0 3px',
    // opacity: '0.8',
    zIndex: '998',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto'
  },
  headerElement: {
    height: '25px',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#c4c4c4',
    borderRadius: '2px 2px 0px 0px',
    padding: '0 3px',
    opacity: '0.7',
    zIndex: '998'
  },
  cardDescription: {
    textAlign: 'center',
    lineHeight: '25px'
  },
  filterForm: {
    display: 'grid',
    gridTemplateRows: '0fr 1fr 0fr 0fr',
    height: '100%',
    minHeight: '272px',
    backgroundColor: '#FFF',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    padding: '1rem',
    borderRadius: '4px',
  },
  tableContainer: {
    borderLeft: '1px solid rgb(217, 217, 217)',
    borderRight: '1px solid rgb(217, 217, 217)',
    borderBottom: '1px solid rgb(217, 217, 217)'
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.grey65,
    fontSize: '.75rem',
    borderBottom: `1px solid ${COLORS.grey85}`
  },
  filterContainer: {
    border: '1px solid #d9d9d9',
    textAlign: 'right',
    marginBottom: '1rem',
    overflowY: 'auto'
  },
  input: {
		width: '100%',
		padding: '.5rem',
		border: `1px solid ${COLORS.grey65}`,
		borderRadius: '2px',
		fontSize: '.875em',
		backgroundColor: '#fff',
		color: COLORS.grey15,
		':focus': {
			borderColor: COLORS.blue
    },
    marginBottom: '1rem'
  },
  gridElement: {
    display: 'grid',
    gridTemplateColumns: '250px auto'
  },
  content: {
    display: 'flex',
    height: 'fit-content',
    alignItems: 'baseline'
  },
  infoFilter: {
    fontSize: '.75rem',
    fontWeight: 'bold',
    color: '#595959',
    padding: '0px 0.5rem'
  },
  msgFilter: {
    marginTop: '.5rem',
    fontSize: '.75rem',
    fontWeight: 'bold',
    color: '#CC4C29',
    textIndent: '.5rem'
  },
  defaultConteiner: {
    display: 'table',
    height: '100%',
    width: '100%'
  },
  defaultMsg: {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
    fontWeight: 'bold'
  },
  gridElementInfos: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto'
  },
  gridElementText: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr auto',
    gridColumnGap: '.5rem'
  },
  gridElementTitle: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '100%'
  },
  tooltip: {
    backgroundColor: '#fff !important',
    pointerEvents: 'all !important',
    top: '-20px !important',
    opacity: '0.6 !important',
    borderRadius: '0px !important',
    marginLeft: '5px !important',
    padding: '0 !important',
    cursor: 'pointer',
    ':hover': {
      opacity: '1 !important'
    },
    ':after': {
      display: 'none',
    }
  },
  tooltipOption: {
    display: 'grid',
    gridColumnGap: '.5rem',
    gridTemplateColumns: '16px auto',
    color: COLORS.grey35 + ' !important',
    transition: 'color .2s ease',
    padding: '.25rem .5rem',
    ':hover': {
      backgroundColor: COLORS.primary,
      color: '#fff !important'
    },
    ':hover > label': {
      border: '1px solid #fff'
    },
    ':hover > span > svg > path': {
      fill:'white !important'
    },
    ':hover > span > svg > polygon': {
      fill:'white !important'
    }
  },
  cardOption: {
    display: 'grid',
    gridColumnGap: '1rem',
    gridTemplateColumns: '24px auto',
    color: COLORS.grey35 + ' !important',
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: COLORS.grey77
    },
  },
  cardColor: {
    borderRadius: '2px',
    border: '1px solid '+ COLORS.grey35
  },
  colorPicker: {
    position: 'absolute',
    left: '-114px',
    top: '45px',
    display: 'none',
    opacity: '1'
  },
  arrowRight: {
    width: 0, 
    height: 0, 
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderLeft: '7px solid #fff',
    zIndex: '1',
    position: 'absolute',
    left: 'calc(100% - 1px)',
    top: '11px',
    paddingRight: '5px'

  },
  gridElementAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  gridElementMiddle: {
    display: 'table-cell',
    verticalAlign: 'middle'
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
  },
  savedCardsModal: {
    height: '640px',
    width: '802px'
  },
  gridSavedCards: {
    height: 'calc(100% - 30px)',
    display: 'grid',
    gridTemplateRows: '1fr auto'
  },
  textElementList: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto',
    gridColumnGap: '.5rem',
    padding: '.2rem 0'
  },
  textElementListGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: '.5rem',
  }
});