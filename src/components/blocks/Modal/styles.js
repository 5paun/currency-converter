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
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
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
