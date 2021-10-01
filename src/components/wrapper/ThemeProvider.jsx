import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import PropTypes from 'prop-types'

import muiTheme from '@/theme'

const theme = createTheme({
  ...muiTheme,
})

const ThemeProviderWrapper = ({ children }) => (
    <ThemeProvider theme={theme}>
      <>
        {children}
      </>
    </ThemeProvider>
)

export default ThemeProviderWrapper

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}
