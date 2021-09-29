import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import App from './App'
import './style.css'
import i18n from './i18n'
import { store } from './redux/store'

ReactDOM.render(
  <Provider store={store}>
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
  </Provider>,
  document.getElementById('root'))
