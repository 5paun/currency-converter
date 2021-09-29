import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  optionWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    margin: '0 5px',
  },
  optionIcon: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    margin: '0 5px',
  },
}))
