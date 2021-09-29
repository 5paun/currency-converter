import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CssBaseline } from '@material-ui/core'

import HomePage from '@/components/pages/HomePage'
import ThemeProviderWrapper from '@/components/wrapper/ThemeProvider'

import { CHANGE_THEME, timerEveryMinute } from './constants'

const App = () => {
  const dispatch = useDispatch()

  const tikTak = () => {
    if (new Date().getMinutes() % 2) {
      dispatch({ type: CHANGE_THEME, payload: 'light' })
    } else {
      dispatch({ type: CHANGE_THEME, payload: 'dark' })
    }
  }

  useState(() => {
    const timerId = setInterval(() => {
      tikTak()
    }, timerEveryMinute)

    return () => clearInterval(timerId)
  }, [])

  return (
        <ThemeProviderWrapper>
          <CssBaseline />
          <HomePage />
        </ThemeProviderWrapper>
  )
}

export default App
