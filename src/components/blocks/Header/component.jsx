import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'

import enFlag from '@/assets/img/en.png'
import ruFlag from '@/assets/img/ru.png'
import heFlag from '@/assets/img/he.png'
import useLocalStorage from '@/hooks/useLocalStorage'
import Select from '@/components/controls/Select'
import { CHANGE_THEME } from '@/constants'

import useStyles from './styles'

const languages = [
  {
    label: 'languages.en',
    value: 'en',
    icon: enFlag,
  },
  {
    label: 'languages.ru',
    value: 'ru',
    icon: ruFlag,
  },
  {
    label: 'languages.he',
    value: 'he',
    icon: heFlag,
  },
]

const themes = [
  {
    label: 'theme.light',
    value: 'light',
  },
  {
    label: 'theme.dark',
    value: 'dark',
  },
  {
    label: 'theme.contrast',
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
      changeLanguage(currentLanguageStorage)
    }
  }, [])

  const classes = useStyles({ currentTheme })

  const changeLanguage = lang => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr')
  }

  const changeLanguageHandle = e => {
    const lang = e.target.value
    setCurrentLanguageStorage(lang)
    changeLanguage(lang)
  }

  const changeThemeHandle = e => {
    const theme = e.target.value
    dispatch({ type: CHANGE_THEME, payload: theme })
  }

  return (
    <header className={classes.container}>
      <Container>
          <div className={classes.wrapper}>
            <Select
              label="theme.theme"
              options={themes}
              value={currentTheme}
              onSelect={changeThemeHandle}
            />
            <Select
              label="language"
              options={languages}
              value={language}
              onSelect={changeLanguageHandle}
            />
          </div>
      </Container>
    </header>
  )
}

export default Header
