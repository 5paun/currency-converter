import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.borderBronze,
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
    justifyContent: 'flex-end',
  },
}))
