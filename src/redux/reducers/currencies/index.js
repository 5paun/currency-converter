import { USER_DATA_RESPONSE, CURRENCIES_RESPONSE, CURRENCIES_RESPONSE_FAIL, SET_LOCAL_CURRENCY_REQUEST, SET_AMOUNT_CURRENCY_CONVERTED, SET_AMOUNT_CURRENCY, SET_LOCAL_CURRENCY_RESPONSE, SET_LOCAL_CURRENCY_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL } from '@/constants/actions'

const initialState = {
  ipAddress: '',
  currencyCodeMyLocation: '',
  currencyCodeConverted: 'usd',
  currencyAmountMy: 0,
  currencyAmountConverted: 0,
  currencies: [],
  convertedCurrency: {},
  error: '',
}

export function currenciesReducer (state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RESPONSE:
      return {
        ...state,
        ...action.payload,
      }
    case USER_DATA_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CURRENCIES_RESPONSE:
      return {
        ...state,
        currencies: action.payload,
      }
    case CURRENCIES_RESPONSE_FAIL:
      return {
        ...state,
        error: action.paload,
      }
    case SET_LOCAL_CURRENCY_REQUEST:
      return {
        ...state,
        ...action.payload,
      }
    case SET_LOCAL_CURRENCY_RESPONSE:
      return {
        ...state,
        convertedCurrency: action.payload,
        currencyAmountConverted: state.currencyCodeMyLocation ? action.payload[state.currencyCodeMyLocation][state.currencyCodeConverted] : 0,
      }
    case SET_LOCAL_CURRENCY_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_AMOUNT_CURRENCY:
      return {
        ...state,
        currencyAmountMy: action.payload,
        currencyAmountConverted: action.payload * state.convertedCurrency[state.currencyCodeMyLocation][state.currencyCodeConverted],
      }
    case SET_AMOUNT_CURRENCY_CONVERTED:
      return {
        ...state,
        currencyAmountMy: action.payload / state.convertedCurrency[state.currencyCodeMyLocation][state.currencyCodeConverted],
        currencyAmountConverted: action.payload,
      }

    default:
      return state
  }
}
