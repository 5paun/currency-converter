import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, IconButton, Typography, useMediaQuery } from '@material-ui/core'
import { SwapHoriz, Sync } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import Converter from '@/components/controls/Converter'
import { USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST, SWAP_PANELS } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import data from '@/mocks/data.json'
import { log } from '@/utils/helpers'
import Header from '@/components/blocks/Header'

import useStyles from './styles'

const HomePage = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const { t, i18n } = useTranslation()

  const currencies = Object.entries(data).map(item => ({ value: item[0], label: item[1] }))
  const codeCurrentLocation = useSelector(state =>
    state.exchange.panels[0].selectedCurrency,
  )
  const dispatch = useDispatch()
  const currentTheme = useSelector(state => state.general.theme)
  const codeConverted = useSelector(state => state.exchange.panels[1].selectedCurrency)
  const currencyAmountHave = useSelector(state => state.exchange.panels[0].amount)
  const currencyAmountConverted = useSelector(state => state.exchange.panels[1].amount)

  const classes = useStyles({ currentTheme })

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

  log('i18n.language', i18n.language)

  return (
    <Container className={classes.mainContainer}>
      <Header />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Typography variant="h3" component="h1"
          align="center" className={classes.title}
          >
            {t('main title')}
          </Typography>
          <Typography variant="h4" component="h4"
            className={classes.date}
          >
            {t('date')} {new Date().toLocaleDateString(i18n.language)}
          </Typography>
          <div className={classes.convertersContainer}>
            <Converter
              description="my label description"
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
              description="converted label description"
              currencies={currencies}
              currencyCode={codeConvertedStorage || codeConverted}
              selectCurrencyCode={selectCurrencyCodeConverted}
              currencyAmount={currencyAmountHave > 0 ? String(currencyAmountConverted) : '0'}
              isConverted={true}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage
