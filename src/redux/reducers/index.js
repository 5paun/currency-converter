import { combineReducers } from 'redux'
import { currenciesReducer } from './currencies'

const rootReducer = combineReducers({
  currencies: currenciesReducer,
})

export default rootReducer
