import {
  USER_DATA_RESPONSE, SET_LOCAL_CURRENCY_REQUEST, SET_AMOUNT_CURRENCY_CONVERTED,
  SET_AMOUNT_CURRENCY, SET_LOCAL_CURRENCY_RESPONSE,
  SET_LOCAL_CURRENCY_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL,
} from '@/constants/actions'

const initialState = {
  code: {
    currentLocation: '',
    converted: 'usd',
  },
  currency: {
    amountHave: 0,
    amountConverted: 0,
  },
  convertedCurrency: {},
  error: '',
}

export function exchangeReducer (state = initialState, action) {
  switch (action.type) {
    case USER_DATA_RESPONSE:
      return {
        ...state,
        code: {
          ...state.code,
          currentLocation: action.payload,
        },
      }
    case USER_DATA_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_LOCAL_CURRENCY_REQUEST:
      return {
        ...state,
        code: {
          ...state.code,
          ...action.payload,
        },
      }
    case SET_LOCAL_CURRENCY_RESPONSE: {
      const exChange = action.payload[state.code.currentLocation][state.code.converted] * state.currency.amountHave
      return {
        ...state,
        convertedCurrency: action.payload,
        currency: {
          ...state.currency,
          amountConverted: state.code.currentLocation ? exChange : 0,
        },
      }
    }
    case SET_LOCAL_CURRENCY_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_AMOUNT_CURRENCY: {
      const exChange = state.convertedCurrency[state.code.currentLocation][state.code.converted]
      return {
        ...state,
        currency: {
          ...state.currency,
          amountHave: action.payload,
          amountConverted: action.payload * exChange,
        },
      }
    }
    case SET_AMOUNT_CURRENCY_CONVERTED: {
      const exChange = state.convertedCurrency[state.code.currentLocation][state.code.converted]
      return {
        ...state,
        currency: {
          ...state.currency,
          amountHave: action.payload / exChange,
          amountConverted: action.payload,
        },
      }
    }
    default:
      return state
  }
}
