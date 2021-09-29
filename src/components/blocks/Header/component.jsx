import React, { useEffect, useState } from 'react'
import Select from '@/components/controls/Select'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'

import useStyles from './styles'
import enFlag from '@/assets/img/en.png'
import ruFlag from '@/assets/img/ru.png'
import useLocalStorage from '@/hooks/useLocalStorage'
import { CHANGE_THEME } from '@/constants'

const languages = [
  {
    value: 'en',
    icon: enFlag,
  },
  {
    value: 'ru',
    icon: ruFlag,
  },
]

const themes = [
  {
    value: 'light',
  },
  {
    value: 'dark',
  },
  {
    value: 'contrast',
  },
]

const Header = () => {
  const { i18n } = useTranslation()
  const [currentLanguageStorage, setCurrentLanguageStorage] = useLocalStorage('language', '')
  const dispatch = useDispatch()
  const currentTheme = useSelector(state => state.general.theme)

  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    if (currentLanguageStorage) {
      setLanguage(currentLanguageStorage)
      i18n.changeLanguage(currentLanguageStorage)
    }
  }, [])

  const classes = useStyles({ currentTheme })

  const changeLanguage = e => {
    const lang = e.target.value
    setLanguage(lang)
    setCurrentLanguageStorage(lang)
    i18n.changeLanguage(lang)
  }

  const changeTheme = e => {
    const theme = e.target.value
    dispatch({ type: CHANGE_THEME, payload: theme })
  }

  return (
    <header className={classes.container}>
      <Container>
          <div className={classes.wrapper}>
            <Select
              label="theme"
              options={themes}
              value={currentTheme}
              onSelect={changeTheme}
            />
            <Select
              label="language"
              options={languages}
              value={language}
              onSelect={changeLanguage}
            />
          </div>
      </Container>
    </header>
  )
}

export default Header
