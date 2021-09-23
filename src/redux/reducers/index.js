import { combineReducers } from 'redux'
import { exchangeReducer } from './exchange '

const rootReducer = combineReducers({
  exchange: exchangeReducer,
})

export default rootReducer
