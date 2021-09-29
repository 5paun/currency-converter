import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { SET_AMOUNT_CURRENCY, SET_AMOUNT_CURRENCY_CONVERTED } from '@/constants'

import useStyles from './styles'

const Converter = ({
  description,
  currencies = [],
  currencyCode,
  selectCurrencyCode,
  currencyAmount,
  isConverted,
}) => {
  const currentTheme = useSelector(state => state.general.theme)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const { t, i18n } = useTranslation()
  const classes = useStyles({ currentTheme, dir: i18n.language })

  const changeCurrencyAmount = e => {
    dispatch({
      type: isConverted
        ? SET_AMOUNT_CURRENCY_CONVERTED
        : SET_AMOUNT_CURRENCY,
      payload: Number(e.target.value),
    })
  }

  return (
    <div className={classes.container}>
      <FormControl fullWidth>
        <InputLabel className={classes.label} variant="standard"
          htmlFor="uncontrolled-native"
        >
          {t(description)}
        </InputLabel>
        <Select
          className={`${classes.select} ${isConverted ? classes.selectConverted : ''}`}
          id="uncontrolled-native"
          placeholder={'Choose currency'}
          value={currencyCode}
          onChange={selectCurrencyCode}
        >
          {currencies.map(currency => {
            return (
              <MenuItem
              key={currency.value}
              value={currency.value}
              >
                {currency.label}
              </MenuItem>
            )
          })}
        </Select>
        <TextField
          className={`${classes.input} ${isConverted ? classes.inputConverted : ''}`}
          type="number"
          id="outlined-basic"
          label={`${isMobile ? t(description) : t('label for input')}`}
          variant="outlined"
          value={currencyAmount}
          onChange={changeCurrencyAmount}
        />
      </FormControl>
    </div>
  )
}

export default Converter

Converter.propTypes = {
  description: PropTypes.string,
  currencies: PropTypes.array.isRequired,
  currencyCode: PropTypes.string.isRequired,
  currencyAmount: PropTypes.string.isRequired,
  selectCurrencyCode: PropTypes.func.isRequired,
  isConverted: PropTypes.bool.isRequired,
}
