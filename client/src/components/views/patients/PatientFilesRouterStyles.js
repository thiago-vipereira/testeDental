  import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  flex: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
  },
  grid: {
    display: 'grid',
    gridTemplateColumn: '1fr 4fr',
    gridCOlumnGap: '1rem',
    padding: '0 1rem'
  },
  formContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  formGroup:{
    flex: '1',
    paddingRight: '20px',
    marginTop: '1rem'

  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: COLORS.grey50,
    fontSize: '.75rem',
    borderBottom: `1px solid ${COLORS.grey77}`
  },
  backgroundGroup: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    padding: '1rem',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
  },
  formFiles:{
    flex:'4',
    marginTop: '1rem',
    marginLeft: '1rem',
  },
  backgroundDocuments: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    padding: '2rem 1rem',
    boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    height: 'calc(100vh - 215px)',
    overflow: 'auto'
  },
  list: {
		padding: 0,
		listStyle: 'none',
		margin: '0',
		border: `1px solid ${COLORS.grey85}`,
    borderRadius: '2px',
    width: '100%'
  },
  active: {
		backgroundColor: COLORS.grey85,
		width: '100%',
		height: '100%',
		position: 'relative',
		cursor: 'pointer',
		':before': {
			content: '""',
			position: 'absolute',
			height: '100%',
			width: '.25rem',
			left: 0,
			top: 0,
			backgroundColor: COLORS.primary
		}
  },
  listItem: {
		padding: '.4rem',
		paddingLeft: '10px',
		borderBottom: `1px solid ${COLORS.grey85}`,
		cursor: 'pointer',
    transition: 'background-color .5s ease',
    display: 'block',
    textDecoration: 'none',
    color: COLORS.grey35,
		':last-child': {
			borderBottom: 0
        },
        ':hover': {
			backgroundColor: COLORS.grey85
		},
  },
});