import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    flex: 1,
    maxWidth: '45%',
    border: `3px solid ${theme.colors.borderGrey}`,
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      width: '100%',
      margin: '10px 0',
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  select: {
    marginBottom: 20,
    '&::before': {
      borderBottom: `2px solid ${theme.colors.borderBronze}`,
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
      border: `2px solid ${theme.colors.borderBronze}`,
    },
  },
  inputConverted: {
    [theme.breakpoints.down('xs')]: {
      order: 0,
    },
  },
}))
