import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
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
  row: {
    width: '100%',
    marginRight: '0px',
    marginBottom: '0.5rem'
  },
  form: {
    display: 'grid',
    gridTemplateRows: '0fr 1fr 0fr 0fr',
    height: 'calc(100vh - 130px)',
    minHeight: '272px',
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.grey50,
    fontSize: '.75rem',
    borderBottom: `1px solid ${COLORS.grey77}`
  },
  backgroundCriterios: {
    display: 'grid',
    backgroundColor: '#FFF',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    padding: '1rem',
    borderRadius: '4px',
    overflow: 'auto',
    gridTemplateRows: '1fr 0fr 0fr 0fr',
  },
  container: {
    border: '1px solid #d9d9d9',
    // padding: '0 0.5rem',
    textAlign: 'right',
    marginBottom: '1rem',
    overflowY: 'auto'
  },
  item: {
    padding: '0.5rem',
    // borderBottom: '1px solid #d9d9d9',
    border: '1px solid #d9d9d9',
    margin: 0
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
});