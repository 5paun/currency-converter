import { call, put, select, takeEvery } from '@redux-saga/core/effects'

import { USER_DATA_REQUEST, USER_DATA_RESPONSE, CURRENCIES_RESPONSE, SET_LOCAL_CURRENCY_REQUEST, SET_LOCAL_CURRENCY_RESPONSE, SET_LOCAL_CURRENCY_RESPONSE_FAIL, CURRENCIES_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL } from '@/constants'
import ConverterService from '@/api/ConverterService'

function * getCurrentIpSagaWorker () {
  try {
    const currentIP = yield call(ConverterService.getCurrentIP)
    const currentPosition = yield call(ConverterService.getCurrentPosition, currentIP.data.ipAddress)
    yield put({ type: USER_DATA_RESPONSE, payload: { ipAddress: currentIP.data.ipAddress, currencyCodeCurrentLocation: currentPosition.data.currency.code.toLowerCase() } })
    yield call(convertSelectedCurrencySagaWorker)
  } catch (error) {
    console.log('error', error)
    yield put({ type: USER_DATA_RESPONSE_FAIL, payload: error.message })
  }
}

function * getCurrenciesSagaWorker () {
  try {
    const response = yield call(ConverterService.getCurrencies)
    yield put({ type: CURRENCIES_RESPONSE, payload: Object.entries(response.data).map(item => ({ value: item[0], label: item[1] })) })
  } catch (error) {
    console.log('error', error)
    yield put({ type: CURRENCIES_RESPONSE_FAIL, payload: error.message })
  }
}

function * convertSelectedCurrencySagaWorker () {
  try {
    const currencyCodeCurrentLocation = yield select(state => state.currencies.currencyCodeCurrentLocation)
    if (currencyCodeCurrentLocation) {
      const response = yield call(ConverterService.convertSelectedCurrency, currencyCodeCurrentLocation)
      yield put({ type: SET_LOCAL_CURRENCY_RESPONSE, payload: response.data })
    }
  } catch (error) {
    console.log('error', error)
    yield put({ type: SET_LOCAL_CURRENCY_RESPONSE_FAIL, payload: error.message })
  }
}

export default function * currenciesSagaWatcher () {
  yield takeEvery(USER_DATA_REQUEST, getCurrentIpSagaWorker)
  yield takeEvery(USER_DATA_REQUEST, getCurrenciesSagaWorker)
  yield takeEvery(SET_LOCAL_CURRENCY_REQUEST, convertSelectedCurrencySagaWorker)
}
