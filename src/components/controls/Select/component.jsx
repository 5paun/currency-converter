import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import useStyles from './styles'

const LanguageSelect = ({ label, options, value, onSelect }) => {
  const classes = useStyles()

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onSelect}
      >
        {options.map(option => {
          return (
              <MenuItem key={option.value} value={option.value}>
                <div className={classes.optionWrap}>
                  <span>{option.value}</span>
                  {option.icon && <img src={option.icon} alt={option.value}
                  className={classes.optionIcon}
                                  />}
                </div>
              </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default LanguageSelect

LanguageSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}
