import {
  USER_DATA_RESPONSE, SET_LOCAL_CURRENCY_REQUEST, SET_AMOUNT_CURRENCY_CONVERTED,
  SET_AMOUNT_CURRENCY, SET_LOCAL_CURRENCY_RESPONSE, SET_LOCAL_CURRENCY_RESPONSE_FAIL,
  USER_DATA_RESPONSE_FAIL, SWAP_PANELS, SET_CURRENCY_HISTORY_DAILY_RESPONSE, SET_CURRENCY_HISTORY_DAILY_RESPONSE_FAIL,
  CLEAR_WEEKLY_HISTORY,
} from '@/constants'

const initialState = {
  rates: [],
  weeklyHistoryRates: [],
  panels: [
    {
      id: 'left',
      order: 0,
      selectedCurrency: '',
      amount: 0,
    },
    {
      id: 'right',
      order: 1,
      selectedCurrency: 'usd',
      amount: 0,
    },
  ],
  error: '',
}

export function exchangeReducer (state = initialState, action) {
  const codeCurrentLocation = state.panels[0].selectedCurrency
  const codeConverted = state.panels[1].selectedCurrency
  let exchange
  if (state.rates.length > 0) {
    exchange = state.rates.find(item => codeConverted in item)[codeConverted]
  }
  switch (action.type) {
    case USER_DATA_RESPONSE:
      return {
        ...state,
        panels: [...state.panels.map(panel => {
          if (panel.id === 'left') {
            return {
              ...panel,
              selectedCurrency: action.payload,
            }
          } else return panel
        })],
      }
    case USER_DATA_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_LOCAL_CURRENCY_REQUEST:
      return {
        ...state,
        panels: [...state.panels.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              selectedCurrency: action.payload.selectedCurrency,
            }
          } else return item
        })],
      }
    case SET_LOCAL_CURRENCY_RESPONSE: {
      const selectedCurrencyConverted = action.payload.find(item => codeConverted in item)
      const exchange = selectedCurrencyConverted[codeConverted] * state.panels[0].amount
      return {
        ...state,
        rates: action.payload,
        panels: [...state.panels.map(panel => {
          if (panel.id === 'right') {
            return {
              ...panel,
              amount: codeCurrentLocation ? exchange : 0,
            }
          } else return panel
        })],
      }
    }
    case SET_LOCAL_CURRENCY_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_AMOUNT_CURRENCY: {
      return {
        ...state,
        panels: [...state.panels.map(panel => {
          if (panel.id === 'left') {
            return {
              ...panel,
              amount: action.payload,
            }
          } else {
            return {
              ...panel,
              amount: action.payload * exchange,
            }
          }
        })],
      }
    }
    case SET_AMOUNT_CURRENCY_CONVERTED: {
      return {
        ...state,
        panels: [...state.panels.map(panel => {
          if (panel.id === 'left') {
            return {
              ...panel,
              amount: action.payload / exchange,
            }
          } else {
            return {
              ...panel,
              amount: action.payload,
            }
          }
        })],
      }
    }
    case SWAP_PANELS: {
      return {
        ...state,
        panels: [...state.panels.map(item => {
          if (item.order === 0) {
            return {
              ...item,
              selectedCurrency: state.panels[1].selectedCurrency,
            }
          } else {
            return {
              ...item,
              selectedCurrency: state.panels[0].selectedCurrency,
              amount: state.panels[0].amount / exchange,
            }
          }
        })],
      }
    }
    case SET_CURRENCY_HISTORY_DAILY_RESPONSE: {
      return {
        ...state,
        weeklyHistoryRates: [...state.weeklyHistoryRates, action.payload],
      }
    }
    case SET_CURRENCY_HISTORY_DAILY_RESPONSE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_WEEKLY_HISTORY:
      return {
        ...state,
        weeklyHistoryRates: [],
      }
    default:
      return state
  }
}
