import { all } from 'redux-saga/effects'

import currenciesWatcher from './currency'

function * rootSaga () {
  yield all([
    currenciesWatcher(),
  ])
}

export default rootSaga
