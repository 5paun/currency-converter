import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  container: {
    backgroundColor: props => theme.themes[props.currentTheme].backgroundHeader,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 70,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: 60,
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
