import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',  
    padding: '2rem 2rem',
    justifyContent: 'center'
    /*'@media screen and (min-width: 1400px)': {
        gridTemplateColumns: '1fr 2fr 1fr'
    }*/
  },
  content:{
    display: 'flex',
    width: '1600px'
  },

  item1: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1'
    },
  item2: {
    display: 'flex',
    flex: '1'
    },
  form: {
    width: '100%',
    maxHeight: '100vmax',
    padding: '0 1rem 0 1rem ',
  },
  backgroundModels:{
    backgroundColor: '#FFF',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    padding: '1rem',
    borderRadius: '4px',
  },

  listContainer: {
    width: '100%',
    marginBottom: '1.5rem',

  },
  
  loading: {
    width: '100%',
    padding: '1rem 0 2rem',
    gridColumn: '2',
    textAlign: 'center'
  },

  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.grey50,
    fontSize: '.75rem',
    borderBottom: `1px solid ${COLORS.grey77}`
  },

  section: {
    //display: 'grid',
    //gridTemplateColumns: '4fr 2fr',
    //gridColumnGap: '1rem',
    marginBottom: '1rem'
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '1rem'
  },

  password: {
    display: 'inline-block',
    marginBottom: '1rem'
  },

  msgAuth: {
    fontSize: '.875rem',
    color: COLORS.red,
    border: `1px solid ${COLORS.red}`,
    borderRadius: '2px',
    padding: '.5rem',
    marginBottom: '1rem'
  },
  
  msgSpan: {
    marginRight: '4px'
  },

  form_modal: {
    width: '100%',
    padding: '1rem'
  },
  link: {
		fontSize: '.85rem',
		color: COLORS.blue,
		textDecoration: 'underline',
		cursor: 'pointer',
		transform: 'color .5s ease',
		':hover': {
			color: COLORS.primary
		}
	},
  msgAuth_modal: {
    textAlign: 'center',
    fontSize: '.875rem',
    color: COLORS.red,
    border: `1px solid ${COLORS.red}`,
    borderRadius: '2px',
    padding: '.5rem',
    marginBottom: '1rem'
  },
  newProcedureModal: {
    maxWidth: '400px'
  }
});