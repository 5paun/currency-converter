import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createTheme } from '@material-ui/core'
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
