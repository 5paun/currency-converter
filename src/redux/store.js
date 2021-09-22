import { applyMiddleware, createStore } from 'redux'
import reduxLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

let store = null

const sagaMiddleware = createSagaMiddleware()

const createDevelopmentStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, reduxLogger)),
  )
}

const createProductionStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
  )
}

export const getStore = () => {
  if (!store) {
    store = process.env.NODE_ENV === 'development'
      ? createDevelopmentStore()
      : createProductionStore()

    sagaMiddleware.run(rootSaga)
  }

  return store
}
