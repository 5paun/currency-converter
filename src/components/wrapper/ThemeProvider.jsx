import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createTheme } from '@material-ui/core'
import PropTypes from 'prop-types'

import globalStyles from '@/theme'

const theme = createTheme({
  ...globalStyles,
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
