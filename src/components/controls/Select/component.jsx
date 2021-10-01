import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'

const LanguageSelect = ({ label, options, value, onSelect }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{t(label)}</InputLabel>
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
                  <span className={classes.optionLabel}>{t(option.label)}</span>
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
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })),
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}
