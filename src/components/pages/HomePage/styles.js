import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  mainContainer: {
    backgroundColor: theme.colors.backgroundLightGrey,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 24px 0',
    },
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    padding: 50,
    background: theme.colors.backgroundGrey,
    borderRadius: '12px',
    border: `4px solid ${theme.colors.borderGreen}`,
    [theme.breakpoints.down('xs')]: {
      padding: '20px 15px',
    },
  },
  title: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.superVeryBig,
    marginBottom: 15,
    color: theme.colors.borderGreen,
    fontWeight: theme.fontWeights.bold,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.fontSizes.veryBig,
      marginBottom: 10,
    },
  },
  date: {
    fontSize: theme.fontSizes.big,
    marginBottom: 5,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      fontSize: theme.fontSizes.normal,
    },
  },
  convertersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  swapIcon: {
    [theme.breakpoints.down('xs')]: {
      border: `3px solid ${theme.colors.borderGreen}`,
      background: theme.colors.backgroundGrey,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: 60,
      height: 60,
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translateY(-50%)',
      zIndex: 1,

      '&:hover': {
        background: theme.colors.backgroundGrey,
      },
    },
  },
}))
