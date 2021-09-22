import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles({
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
})

const Converter = ({ dscr, currencies = [], currencyCode, selectCurrencyCode, currencyAmount, changeCurrencyAmount }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5"
       component="h5"
      >
        {dscr}
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
        value={`${currencyAmount}`}
        onChange={changeCurrencyAmount}
      />
    </div>
  )
}

export default Converter

Converter.propTypes = {
  dscr: PropTypes.string,
  currencies: PropTypes.array.isRequired,
  currencyCode: PropTypes.string.isRequired,
  currencyAmount: PropTypes.number.isRequired,
  selectCurrencyCode: PropTypes.func.isRequired,
  changeCurrencyAmount: PropTypes.func.isRequired,
}
