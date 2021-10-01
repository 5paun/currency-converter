import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  mainContainer: {
    backgroundColor: props => theme.themes[props.currentTheme].backgroundPage,
    height: '100vh',
    // что за дичь? Увеличивать специфичность селектора?!
    display: 'flex !important',
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
    background: props => theme.themes[props.currentTheme].backgroundApp,
    borderRadius: '12px',
    border: props => `4px solid ${theme.themes[props.currentTheme].borderApp}`,
    [theme.breakpoints.down('xs')]: {
      padding: '20px 15px',
    },
  },
  title: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizes.superVeryBig,
    marginBottom: 15,
    color: props => theme.themes[props.currentTheme].title,
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
      border: props => `3px solid ${theme.themes[props.currentTheme].borderApp}`,
      background: props => theme.themes[props.currentTheme].backgroundApp,
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
        background: props => theme.themes[props.currentTheme].backgroundApp,
      },
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContentWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
}))
