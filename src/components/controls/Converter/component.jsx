import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'

import { SET_AMOUNT_CURRENCY, SET_AMOUNT_CURRENCY_CONVERTED } from 'src/constants'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '45%',
  },
  title: {
    marginBottom: 10,
  },
  select: {
    marginBottom: 20,
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

  const changeCurrencyAmount = e => {
    dispatch({
      type: isConverted
        ? SET_AMOUNT_CURRENCY_CONVERTED
        : SET_AMOUNT_CURRENCY,
      payload: Number(e.target.value),
    })
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5"
       component="h5"
      >
        {description}
      </Typography>
      <Select
        className={classes.select}
        placeholder={'Choose currency'}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currencyCode}
        label="Age"
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
        type="number"
        id="outlined-basic"
        label="current value"
        variant="outlined"
        value={currencyAmount}
        onChange={changeCurrencyAmount}
      />
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
