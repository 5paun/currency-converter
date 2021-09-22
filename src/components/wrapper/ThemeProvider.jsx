import React from 'react'
import { ThemeProvider } from '@material-ui/styles'

import theme from '@/theme'

const ThemeProviderWrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      <>
        {children}
      </>
    </ThemeProvider>
)

export default ThemeProviderWrapper
