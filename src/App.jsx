import React from 'react'
import HomePage from '@/components/pages/HomePage'
import { Provider } from 'react-redux'
import ThemeProviderWrapper from '@/components/wrapper/ThemeProvider'
import { getStore } from '@/redux/store'
import { CssBaseline } from '@material-ui/core'

const App = () => {
  return (
      <Provider store={getStore()}>
        <ThemeProviderWrapper>
        <CssBaseline />
          <HomePage />
        </ThemeProviderWrapper>
      </Provider>
  )
}

export default App
