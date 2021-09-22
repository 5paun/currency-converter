import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '@/theme'
import GlobalStyle from '@/theme/GlobalStyle'

const ThemeProviderWrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
)

export default ThemeProviderWrapper
