import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, makeStyles, Typography } from '@material-ui/core'

import Converter from '@/components/controls/Converter'
import { USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import data from '@/mocks/data.json'

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

  const currencies = Object.entries(data).map(item => ({ value: item[0], label: item[1] }))
  const codeCurrentLocation = useSelector(state =>
    state.exchange.panels[0].selectedCurrency,
  )
  const codeConverted = useSelector(state => state.exchange.panels[1].selectedCurrency)
  const currencyAmountHave = useSelector(state => state.exchange.panels[0].amount)
  const currencyAmountConverted = useSelector(state => state.exchange.panels[1].amount)

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
      payload: { id: 'left', selectedCurrency: e.target.value },
    })
    setCodeCurrentLocationStorage(e.target.value)
  }

  const selectCurrencyCodeConverted = e => {
    dispatch({
      type: SET_LOCAL_CURRENCY_REQUEST,
      payload: { id: 'right', selectedCurrency: e.target.value },
    })
    setCodeConvertedStorage(e.target.value)
  }

  useEffect(() => {
    // setTimeout(() => {
    if (codeCurrentLocationStorage) {
      dispatch({
        type: SET_LOCAL_CURRENCY_REQUEST,
        payload: { id: 'left', selectedCurrency: codeCurrentLocationStorage },
      })
    }
    if (codeConvertedStorage) {
      dispatch({
        type: SET_LOCAL_CURRENCY_REQUEST,
        payload: { id: 'left', selectedCurrency: codeConvertedStorage },
      })
    }

    // }, 3000)
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
