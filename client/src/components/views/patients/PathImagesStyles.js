import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
  link: {
    borderRadius: '2px',
    padding: '9px 0',
    color: COLORS.white,
    cursor: 'pointer',
    fontSize: '.95rem',
    width: '140px'
  },

  containerOptions: {
    display: 'inline-flex',
    position: 'relative',
    float: 'right',
    fontSize: '14px',
  },

  colorFolder:{
    color: COLORS.white
  },

  newFolder:{
    backgroundColor: COLORS.grey65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  newPicture:{
    backgroundColor: COLORS.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  disabledInput: {
    backgroundColor: COLORS.grey77,
    width: '100%',
    height: '35px',
		padding: '.5rem',
		border: `1px solid #ccc`,
		borderRadius: '3px',
		fontSize: '.875em',
		color: COLORS.grey15,
    boxShadow: 'inset 0 2px 4px 0 hsla(0,0%,0%, 0.08)',
    margin: '1rem 0'
  },
  
  label: {
		marginBottom: '.5rem',
		fontSize: '.75rem',
		fontWeight: 'bold',
		color: COLORS.grey35,
		paddingLeft: '.5rem'
  },

  modal: {
    width: '500px',
  },

  modalContent: {
    padding: '1rem'
  },

  gridPathModal: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: '1rem',
    marginBottom: '1rem',
    marginTop: '.5rem'
  },

  fileSelect: {
    cursor: 'pointer',
    borderRadius: '2px',
    overflow: 'hidden'
  },

  containerFolders: {
    display: 'flex',
    margin: '30px 0',
    flexWrap: 'wrap'
  },

  containerArchives: {
    display: 'flex',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  
  tooltipContainer: {
    position: 'relative'
  },

  flexPath: {
    display: 'flex',
  },

  container: {
    display: 'flex'
  },

  flex: {
    display: 'flex',
    position: 'relative'
  },

  folders: {
    display: 'flex',
    border: '1px solid grey',
    borderRadius: '2px',
    margin: '.5rem 8px',
    padding: '4px',
    textDecoration: 'none',
    width: '152px',
    height: '40px',
    ':hover': {
      backgroundColor: COLORS.grey85,
    },
  },
  
  folderNameBox:{
    display: 'flex',
    position: 'relative',
    width: '66%',
    overflow: 'hidden'
  },

  folderName: {
    margin: '0',
    color: COLORS.grey50,
    fontWeight: 'bold',
    lineHeight: '29px',
    fontSize: '.85rem',
    whiteSpace: 'nowrap'
  },

  archives: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid grey',
    borderRadius: '2px',
    margin: '.5rem 8px',
    textDecoration: 'none',
    width: '175px',
    height: '218px'
  },

  archiveName: {
    display: 'flex',
    margin: '0',
    color: COLORS.grey50,
    fontSize: '.9rem',
    fontWeight: 'bold',
    borderTop: '1px solid grey',
    padding: '.7rem',
    justifyContent: 'center',
  },

  archiveBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    ':hover': {
      backgroundColor: COLORS.grey77
    }
  },

  pictures:{
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1'
  },
  
  tooltipFolder: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#fff !important',
    pointerEvents: 'all !important',
    top: '8px !important',
    left: '27px !important',
    opacity: '0.6 !important',
    boxShadow: '-3px 3px 5px rgba(0, 0, 0, 0.4) !important',
    borderRadius: '0px !important',
    padding: '0 !important',
    cursor: 'pointer',
    ':hover': {
      opacity: '1 !important'
    },
    ':after': {
      display: 'none',
    }
  },
  tooltipArchives: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#fff !important',
    pointerEvents: 'all !important',
    top: '8px !important',
    left: '50px !important',
    opacity: '0.6 !important',
    boxShadow: '-3px 3px 5px rgba(0, 0, 0, 0.4) !important',
    borderRadius: '0px !important',
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

  gear: {
    cursor: 'pointer',
    position: 'absolute',
    right: '9px',
    top: '8px',
    borderRadius: '2px',
    ':hover > span > svg > path': {
      fill: COLORS.primary,
    },
  },

  topText: {
    padding: '4px'
  },

  pictureExt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%'
  },


});
export const stylesMarquee = (props) => StyleSheet.create({
  marqueeName: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    transform: 'translateX(0)',
    transition: `${props.length * 0.15}s`,
    ':hover' : {
      transform: 'translateX(calc(90px - 100%))'
    }
  }
});