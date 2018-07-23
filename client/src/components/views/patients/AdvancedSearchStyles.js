import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridColumnGap: '1rem',
    margin: '0 1rem',
    padding: '1rem 0 2rem',
    // '@media screen and (max-width: 1100px)': {
    //     gridTemplateColumns: 'unset',
    //     gridTemplateRows: '1fr 1fr'
    // }
  },
  conteiner: {
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
  form: {
    display: 'grid',
    gridTemplateRows: '0fr 1fr 0fr 0fr',
    height: 'calc(100vh - 150px)',
    minHeight: '272px',
  },

  backgroundResults: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    padding: '1rem',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
  },
  row: {
    width: '100%',
    marginRight: '0px',
    marginBottom: '0.5rem'
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.grey50,
    fontSize: '.75rem',
    borderBottom: `1px solid ${COLORS.grey77}`
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
  backgroundCriterios: {
    display: 'grid',
    backgroundColor: '#FFF',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    padding: '1rem',
    borderRadius: '4px',
    overflow: 'auto',
    gridTemplateRows: '1fr 0fr 0fr 0fr',
  },
  backgroundResults: {
    backgroundColor: '#FFF',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    padding: '1rem',
    borderRadius: '4px',
    height: 'calc(100% - 32px)',
  },
});