import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    flex: 1,
    maxWidth: '45%',
    border: props => `3px solid ${theme.themes[props.currentTheme].borderPanel}`,
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      width: '100%',
      margin: '10px 0',
    },
  },
  label: {
    left: props => props.dir === 'he' ? 'unset' : 0,
    right: props => props.dir === 'he' ? 0 : 'unset',
    transformOrigin: props => props.dir === 'he' ? 'top right' : 'top left',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  select: {
    marginBottom: 20,
    '&::before': {
      borderBottom: props => `2px solid ${theme.themes[props.currentTheme].borderControl}`,
    },
    [theme.breakpoints.down('xs')]: {
      order: 0,
      marginBottom: 10,

      '&.MuiInput-formControl': {
        marginTop: 0,
      },
    },
  },
  selectConverted: {
    [theme.breakpoints.down('xs')]: {
      order: 1,
      marginBottom: 0,

      '&.MuiInput-formControl': {
        marginTop: 5,
      },
    },
  },
  input: {
    margin: '5px 0',

    '& fieldset': {
      border: props => `2px solid ${theme.themes[props.currentTheme].borderControl}`,
    },
  },
  inputConverted: {
    [theme.breakpoints.down('xs')]: {
      order: 0,
    },
  },
}))
