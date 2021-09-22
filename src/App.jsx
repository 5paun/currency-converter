import React from 'react'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'

import HomePage from '@/components/pages/HomePage'
import ThemeProviderWrapper from '@/components/wrapper/ThemeProvider'
import { getStore } from '@/redux/store'

const App = () => {
  return (
      <Provider store={getStore()}>
        {/* <ThemeProviderWrapper> */}
          <CssBaseline />
          <HomePage />
        {/* </ThemeProviderWrapper> */}
      </Provider>
  )
}

export default App
