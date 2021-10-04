import { call, put, select, takeLatest, fork, join } from '@redux-saga/core/effects'

import {
  USER_DATA_REQUEST, USER_DATA_RESPONSE, SET_LOCAL_CURRENCY_REQUEST,
  SET_LOCAL_CURRENCY_RESPONSE, SET_LOCAL_CURRENCY_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL,
  SWAP_PANELS, SET_CURRENCY_HISTORY_DAILY_RESPONSE, SET_CURRENCY_HISTORY_DAILY_RESPONSE_FAIL,
  SET_CURRENCY_HISTORY_REQUEST,
} from '@/constants'
import ConverterService from '@/api/ConverterService'

function * getCurrentIpWorker () {
  try {
    const currentIP = yield call(ConverterService.getCurrentIP)
    // eslint-disable-next-line
    const currentPosition = yield call(ConverterService.getCurrentPosition, currentIP.data.ipAddress)
    const codeCurrentLocation = yield select(state => state.exchange.panels[0].selectedCurrency)
    if (!codeCurrentLocation) {
      yield put({
        type: USER_DATA_RESPONSE,
        payload: currentPosition.data.currency.code.toLowerCase(),
      })
    }
    yield call(convertSelectedCurrencyWorker)
  } catch (error) {
    yield put({ type: USER_DATA_RESPONSE_FAIL, payload: error.message })
  }
}

function * convertSelectedCurrencyWorker () {
  try {
    const codeCurrentLocation = yield select(state => state.exchange.panels[0].selectedCurrency)
    if (codeCurrentLocation) {
      const response = yield call(ConverterService.convertSelectedCurrency, codeCurrentLocation)
      const transformData = Object.entries(response.data[codeCurrentLocation])
        .map(([key, value]) => ({ [key]: value }))
      yield put({ type: SET_LOCAL_CURRENCY_RESPONSE, payload: transformData })
    }
  } catch (error) {
    yield put({ type: SET_LOCAL_CURRENCY_RESPONSE_FAIL, payload: error.message })
  }
}

function * getDailyCurrencyRateWorker (date) {
  try {
    const codeCurrentLocation = yield select(state => state.exchange.panels[0].selectedCurrency)
    if (codeCurrentLocation) {
      const response = yield call(ConverterService.convertSelectedCurrency, codeCurrentLocation, date)
      const codeConverted = yield select(state => state.exchange.panels[1].selectedCurrency)
      return { date: response.data.date, currency: response.data[codeCurrentLocation][codeConverted] }
    }
  } catch (error) {
    yield put({ type: SET_CURRENCY_HISTORY_DAILY_RESPONSE_FAIL, payload: error.message })
  }
}

function * getWeeklyCurrencyRateWorker (dates) {
  const { payload } = dates
  const sagas = []
  for (const date of payload) {
    sagas.push(yield fork(getDailyCurrencyRateWorker, date))
  }
  const results = yield join(sagas)
  yield put({ type: SET_CURRENCY_HISTORY_DAILY_RESPONSE, payload: results })
}

export default function * currenciesWatcher () {
  yield takeLatest(USER_DATA_REQUEST, getCurrentIpWorker)
  yield takeLatest(SET_LOCAL_CURRENCY_REQUEST, convertSelectedCurrencyWorker)
  yield takeLatest(SWAP_PANELS, convertSelectedCurrencyWorker)
  yield takeLatest(SET_CURRENCY_HISTORY_REQUEST, getWeeklyCurrencyRateWorker)
}
