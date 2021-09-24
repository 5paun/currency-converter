import {
  USER_DATA_RESPONSE, SET_LOCAL_CURRENCY_REQUEST, SET_AMOUNT_CURRENCY_CONVERTED,
  SET_AMOUNT_CURRENCY, SET_LOCAL_CURRENCY_RESPONSE,
  SET_LOCAL_CURRENCY_RESPONSE_FAIL, USER_DATA_RESPONSE_FAIL,
} from '@/constants/actions'

const initialState = {
  rates: [],
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
        panels: [
          ...state.panels.map(item => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                selectedCurrency: action.payload.selectedCurrency,
              }
            } else return item
          }),
        ],
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
      const exchange = state.rates.find(item => codeConverted in item)[codeConverted]

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
      const exchange = state.rates.find(item => codeConverted in item)[codeConverted]
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
    default:
      return state
  }
}