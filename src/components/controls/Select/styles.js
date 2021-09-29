import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  optionWrap: {
    minWidth: 40,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionIcon: {
    width: 16,
    height: 16,
    borderRadius: '50%',
  },
}))
