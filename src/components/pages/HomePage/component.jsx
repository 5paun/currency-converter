import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, makeStyles, Typography } from '@material-ui/core'

import Converter from '@/components/controls/Converter'
import { USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST, SET_AMOUNT_CURRENCY_CONVERTED, SET_AMOUNT_CURRENCY } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'

const useStyles = makeStyles({
  convertersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})

const HomePage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const currencies = useSelector(state => state.currencies.currencies)
  const currencyCodeMyLocation = useSelector(state => state.currencies.currencyCodeMyLocation)
  const currencyCodeConverted = useSelector(state => state.currencies.currencyCodeConverted)
  const currencyAmountMy = useSelector(state => state.currencies.currencyAmountMy)
  const currencyAmountConverted = useSelector(state => state.currencies.currencyAmountConverted)

  const [currencyCodeMyLocationStorage, setcurrencyCodeMyLocationStorage] = useLocalStorage('currencyCodeMyLocation', '')
  const [currencyCodeConvertedStorage, setCurrencyCodeConvertedStorage] = useLocalStorage('currencyCodeConverted', '')

  const selectCurrencyCode = (action, value) => {
    dispatch({ type: action, payload: value })
  }

  const changeCurrencyAmount = (action, value) => {
    dispatch({ type: action, payload: value })
  }

  useEffect(() => {
    dispatch({ type: USER_DATA_REQUEST })
  }, [])

  return (
    <Container>
      <Typography variant="h1" component="h1"
       align="center"
      >
        Currency Converter
      </Typography>
      <div className={classes.convertersContainer}>
      <Converter
        dscr={'I have'}
        currencies={currencies}
        currencyCode={currencyCodeMyLocationStorage || currencyCodeMyLocation}
        selectCurrencyCode={e => {
          selectCurrencyCode(SET_LOCAL_CURRENCY_REQUEST, { currencyCodeMyLocation: e.target.value })
          setcurrencyCodeMyLocationStorage(e.target.value)
        }}
        currencyAmount={currencyAmountMy}
        changeCurrencyAmount={e => changeCurrencyAmount(SET_AMOUNT_CURRENCY, Number(e.target.value))}
      />
      <Converter
        dscr={'I want to buy'}
        currencies={currencies}
        currencyCode={currencyCodeConvertedStorage || currencyCodeConverted}
        selectCurrencyCode={e => {
          selectCurrencyCode(SET_LOCAL_CURRENCY_REQUEST, { currencyCodeConverted: e.target.value })
          setCurrencyCodeConvertedStorage(e.target.value)
        }}
        currencyAmount={currencyAmountMy > 0 ? currencyAmountConverted : 0}
        changeCurrencyAmount={e => changeCurrencyAmount(SET_AMOUNT_CURRENCY_CONVERTED, Number(e.target.value))}
      />
      </div>
    </Container>
  )
}

export default HomePage
