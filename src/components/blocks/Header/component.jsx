import React from 'react'
import LanguageSelect from '@/components/controls/LanguageSelect'

import useStyles from './styles'
import { Container } from '@material-ui/core'

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Container>
          <div className={classes.wrapper}>
            <LanguageSelect />
          </div>
      </Container>
    </div>
  )
}

export default Header
