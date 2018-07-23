import { StyleSheet } from 'aphrodite/no-important';

export const styles = StyleSheet.create({
	pageCircleContainer: {
    textAlign: 'center',
    backgroundColor:'#FFF',
    display: 'inline-block',
    cursor: 'pointer',
		border: '2px solid #dbdbdb',
    userSelect: 'none',
        '-webkit-user-drag': 'element',
        userSelect: 'none'
  },
  containerSmall : {
    height: '32px',
    width: '32px',
    fontSize: '12px',
    lineHeight: '30px',
    borderRadius: '16px',
    margin: '0 3px',
  },
  containerNormal: {
    height: '40px',
    width: '40px',
    fontSize: '14px',
    lineHeight: '38px',
    borderRadius: '20px',
    margin: '0 5px',
  },
  pageCircleScroll: {
    cursor: 'pointer',
		border: '2px solid #dbdbdb',
    margin: '-1px',
    textAlign: 'center',
    userSelect: 'none'
  },
  scrollSmall: {
    height: '30px',
    width: '30px',
    borderRadius: '15px',
    fontSize: '12px',
    lineHeight: '28px',
  },
  scrollNormal: {
    height: '38px',
    width: '38px',
    borderRadius: '20px',
    fontSize: '14px',
    lineHeight: '36px',
  },
  pageInfos: {
    marginTop: '5px',
    fontSize: '11px',
    borderBottom: '1px solid #ccc',
    width: 'fit-content',
    userSelect: 'none'
  },
  dot: {
    '-webkit-transition': 'width 1s ease-in-out',
    '-moz-transition': 'width 1s ease-in-out',
    '-o-transition': 'width 1s ease-in-out',
    transition: 'width 1s ease-in-out'
  }
});