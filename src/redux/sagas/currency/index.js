import { call, put, select, takeLatest } from '@redux-saga/core/effects'

import {
  USER_DATA_REQUEST, USER_DATA_RESPONSE, SET_LOCAL_CURRENCY_REQUEST,
  SET_LOCAL_CURRENCY_RESPONSE, SET_LOCAL_CURRENCY_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL,
  SWAP_PANELS,
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

export default function * currenciesWatcher () {
  yield takeLatest(USER_DATA_REQUEST, getCurrentIpWorker)
  yield takeLatest(SET_LOCAL_CURRENCY_REQUEST, convertSelectedCurrencyWorker)
  yield takeLatest(SWAP_PANELS, convertSelectedCurrencyWorker)
}
