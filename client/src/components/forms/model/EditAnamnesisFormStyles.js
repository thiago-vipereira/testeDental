import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
    nameGrid: {
        display: 'grid',
        gridTemplateColumns: '4fr 2fr',
        gridColumnGap: '1rem',
    },
    htmlGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridColumnGap: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#FFF',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '2px 3px 4px 0px rgba(0,0,0,0.08)',
    },
    html: {
        height: '550px',
        border: '1px solid #a6a6a6'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 4fr 2fr',
        gridColumnGap: '1rem',
        margin: '0 1rem',
        /*'@media screen and (min-width: 1400px)': {
            gridTemplateColumns: '1fr 2fr 1fr'
        }*/
    },
    close: {
        float: 'right',
        marginTop: '-2px',
        cursor: 'pointer'
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem 0',
        gridColumn: '2'
    },
    optionGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 0fr 0fr',
      gridColumnGap: '1rem',
    },
    sectionTitle: {
        textTransform: 'uppercase',
        color: COLORS.grey50,
        fontSize: '.75rem',
        borderBottom: `1px solid ${COLORS.grey77}`
    },
    variables: {
        height: '470px',
        marginTop: '1rem',
        border: '1px solid #a6a6a6',
        overflowY: 'auto'
    },
    itemMenu: {
        padding: '.5rem',
        border: '0px',
        fontSize: '.875em',
        color: '#262626',
        backgroundColor: '#d9d9d9',
        borderBottom: '.5px solid #a6a6a6'
    },
    subItemMenu: {
        padding: '.4rem .8rem',
        border: '0px',
        fontSize: '.8em',
        color: '#262626',
        backgroundColor: '#e9e9e9',
        borderBottom: '.5px solid #d1d1d1'
    },
    closeCircle: {
      backgroundColor: '#a6a6a6',
      height: '20px',
      width: '20px',
      borderRadius: '10px',
      lineHeight: '17px',
      paddingLeft: '2px',
      cursor: 'pointer',
      marginTop: '24px'
    },
    fieldset: {
		marginBottom: '1rem'
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
		}
    },
    label: {
		display: 'inline-block',
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		float: 'left',
		color: COLORS.grey35,
		textIndent: '.5rem'
    },
});