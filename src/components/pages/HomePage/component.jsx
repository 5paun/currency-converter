import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, IconButton, makeStyles, Typography, useMediaQuery } from '@material-ui/core'

import Converter from '@/components/controls/Converter'
import { USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST, SWAP_PANELS } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import data from '@/mocks/data.json'
import { SwapHoriz, Sync } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors.backgroundLightGrey,
    padding: '24px',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    padding: 50,
    background: theme.colors.backgroundGrey,
    borderRadius: '12px',
    border: `4px solid ${theme.colors.borderGreen}`,
    [theme.breakpoints.down('xs')]: {
      padding: '20px 15px',
    },
  },
  title: {
    fontSize: theme.fontSizes.superVeryBig,
    marginBottom: 20,
    color: theme.colors.borderGreen,
    fontWeight: theme.fontWeights.bold,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.fontSizes.veryBig,
      marginBottom: 5,
    },
  },
  convertersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  swapIcon: {
    [theme.breakpoints.down('xs')]: {
      border: `3px solid ${theme.colors.borderGreen}`,
      background: theme.colors.backgroundGrey,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      width: 60,
      height: 60,
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translateY(-50%)',
      zIndex: 1,

      '&:hover': {
        background: theme.colors.backgroundGrey,
      },
    },
  },
}))

const HomePage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))

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

  useEffect(() => {
    if (codeCurrentLocationStorage) {
      dispatch({
        type: SET_LOCAL_CURRENCY_REQUEST,
        payload: { id: 'left', selectedCurrency: codeCurrentLocationStorage },
      })
    }
    if (codeConvertedStorage) {
      dispatch({
        type: SET_LOCAL_CURRENCY_REQUEST,
        payload: { id: 'right', selectedCurrency: codeConvertedStorage },
      })
    }
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

  const swapPanels = () => {
    dispatch({ type: SWAP_PANELS })
    setCodeCurrentLocationStorage(codeConverted)
    setCodeConvertedStorage(codeCurrentLocation)
  }

  return (
    <Container className={classes.container}>
      <div className={classes.wrapper}>
        <Typography variant="h3" component="h1"
        align="center" className={classes.title}
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
          <IconButton color="default" aria-label="upload picture"
          component="span" onClick={swapPanels}
          className={classes.swapIcon}
          >
            {isMobile
              ? <Sync fontSize="large" />
              : <SwapHoriz fontSize="large" />
            }
          </IconButton>
          <Converter
            description="I want to buy"
            currencies={currencies}
            currencyCode={codeConvertedStorage || codeConverted}
            selectCurrencyCode={selectCurrencyCodeConverted}
            currencyAmount={currencyAmountHave > 0 ? String(currencyAmountConverted) : '0'}
            isConverted={true}
          />
        </div>
      </div>
    </Container>
  )
}

export default HomePage
