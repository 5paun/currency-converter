import { all } from 'redux-saga/effects'

import currenciesSagaWatcher from './currency'

function * rootSaga () {
  yield all([
    currenciesSagaWatcher(),
  ])
}

export default rootSaga
