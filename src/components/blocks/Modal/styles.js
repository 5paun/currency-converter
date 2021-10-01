import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    zIndex: 999,
    backgroundColor: props => theme.themes[props.currentTheme].backgroundPage,
    // padding: '30px 35px 55px',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'stretch',
    // flex: '0 0 auto',
    borderRadius: 8,
    // overflow: 'hidden',
  },
  buttonClose: {
    '&.MuiButtonBase-root': {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(70%, -70%)',
    },
  },
}))
