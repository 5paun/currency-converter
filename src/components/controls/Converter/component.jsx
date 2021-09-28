import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core'

import { SET_AMOUNT_CURRENCY, SET_AMOUNT_CURRENCY_CONVERTED } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
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

const Converter = ({
  description,
  currencies = [],
  currencyCode,
  selectCurrencyCode,
  currencyAmount,
  isConverted,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const { t } = useTranslation()

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
          label={`${isMobile ? t(description) : 'current value'}`}
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
