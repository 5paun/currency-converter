import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, IconButton, Typography, useMediaQuery } from '@mui/material'
import { SwapHoriz, Sync, Timeline } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

import Converter from '@/components/controls/Converter'
import {
  USER_DATA_REQUEST, SET_LOCAL_CURRENCY_REQUEST, SWAP_PANELS,
  SET_CURRENCY_HISTORY_REQUEST, CLEAR_WEEKLY_HISTORY,
} from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import data from '@/mocks/data.json'
import { log, getDateForWeek } from '@/utils/helpers'
import Header from '@/components/blocks/Header'
import Modal from '@/components/blocks/Modal'

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
  const weeklyHistoryRates = useSelector(state => state.exchange.weeklyHistoryRates)

  const [modalIsVisible, setModalIsVisible] = useState(false)

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

  const openModal = () => {
    const date = getDateForWeek()

    setModalIsVisible(true)
    dispatch({ type: SET_CURRENCY_HISTORY_REQUEST, payload: date })
  }

  const closeModal = () => {
    setModalIsVisible(false)
    dispatch({ type: CLEAR_WEEKLY_HISTORY })
  }

  const sortAndTransformWeeklyRates = arr => {
    const sortedData = [...arr].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    log('sortedData', sortedData)
    const result = sortedData.map(item => item.currency)
    return result
  }

  const options = {
    title: {
      text: 'My chart',
    },
    series: [{
      data: sortAndTransformWeeklyRates(weeklyHistoryRates),
    }],
  }

  return (
    <>
      <Container className={classes.mainContainer}>
        <Header />
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <Typography variant="h3" component="h1"
            align="center" className={classes.title}
            >
              {t('main title')}
            </Typography>
            <div className={classes.row}>
              <Typography variant="h4" component="h4"
                className={classes.date}
              >
                {t('date')} {new Date().toLocaleDateString(i18n.language)}
              </Typography>
              <Button
                onClick={openModal}
                variant="outlined"
                endIcon={<Timeline />}
              >
                  history
              </Button>
            </div>
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
      {modalIsVisible && <Modal closeModal={closeModal}>
                          <div className={classes.modalContentWrap}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={options}
                            />
                          </div>
                         </Modal>
      }
    </>
  )
}

export default HomePage
