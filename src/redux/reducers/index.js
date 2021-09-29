import { combineReducers } from 'redux'
import { exchangeReducer } from './exchange'
import { generalReduce } from './general'

const rootReducer = combineReducers({
  general: generalReduce,
  exchange: exchangeReducer,
})

export default rootReducer
