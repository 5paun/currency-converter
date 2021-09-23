import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, makeStyles, Typography } from '@material-ui/core'

import Converter from '@/components/controls/Converter'
import { USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import serviceData from '@/constants/currencies'

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

  const currencies = Object.entries(serviceData).map(item => ({ value: item[0], label: item[1] }))
  const codeCurrentLocation = useSelector(state =>
    state.exchange.code.currentLocation,
  )
  const codeConverted = useSelector(state => state.exchange.code.converted)
  const currencyAmountHave = useSelector(state => state.exchange.currency.amountHave)
  const currencyAmountConverted = useSelector(state => state.exchange.currency.amountConverted)

  const [
    codeCurrentLocationStorage,
    setCodeCurrentLocationStorage,
  ] = useLocalStorage('currencyCodeCurrentLocation', '')
  const [
    codeConvertedStorage,
    setCodeConvertedStorage,
  ] = useLocalStorage('currencyCodeConverted', '')

  useEffect(() => {
    dispatch({ type: USER_DATA_REQUEST })
  }, [])

  const selectCurrencyCodeCurrentLocation = e => {
    dispatch({
      type: SET_LOCAL_CURRENCY_REQUEST,
      payload: {
        currentLocation: e.target.value,
      },
    })
    setCodeCurrentLocationStorage(e.target.value)
  }

  const selectCurrencyCodeConverted = e => {
    dispatch({
      type: SET_LOCAL_CURRENCY_REQUEST,
      payload: {
        converted: e.target.value,
      },
    })
    setCodeConvertedStorage(e.target.value)
  }

  return (
    <Container>
      <Typography variant="h1" component="h1"
       align="center"
      >
        Currency Converter
      </Typography>
      <div className={classes.convertersContainer}>
      <Converter
        description="I have"
        currencies={currencies}
        currencyCode={codeCurrentLocationStorage || codeCurrentLocation}
        selectCurrencyCode={selectCurrencyCodeCurrentLocation}
        currencyAmount={String(currencyAmountHave)}
        isConverted={false}
      />
      <Converter
        description="I want to buy"
        currencies={currencies}
        currencyCode={codeConvertedStorage || codeConverted}
        selectCurrencyCode={selectCurrencyCodeConverted}
        currencyAmount={currencyAmountHave > 0 ? String(currencyAmountConverted) : '0'}
        isConverted={true}
      />
      </div>
    </Container>
  )
}

export default HomePage
