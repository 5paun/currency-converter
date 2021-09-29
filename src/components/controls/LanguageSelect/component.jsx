import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useLocalStorage from '@/hooks/useLocalStorage'
import useStyles from './styles'
import { log } from 'src/utils/helpers'
import enFlag from '@/assets/img/en.png'
import ruFlag from '@/assets/img/ru.png'

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

const LanguageSelect = () => {
  const { i18n } = useTranslation()
  const [currentLanguageStorage, setCurrentLanguageStorage] = useLocalStorage('language', '')
  const classes = useStyles()
  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = e => {
    const lang = e.target.value
    setLanguage(lang)
    setCurrentLanguageStorage(lang)
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    log('currentLanguageStorage', currentLanguageStorage)
    if (currentLanguageStorage) {
      setLanguage(currentLanguageStorage)
      i18n.changeLanguage(currentLanguageStorage)
    }
  }, [])

  return (
    <FormControl className={classes.container}>
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        label="Language"
        onChange={changeLanguage}
      >
        {languages.map(lang => {
          return (
              <MenuItem key={lang.value} value={lang.value}
                className={classes.optionWrap}
              >
                <div className={classes.optionWrap}>
                  <span>{lang.value}</span>
                  <img src={lang.icon} alt={lang.value}
                  style={{ width: 16, height: 16, borderRadius: '50%' }}
                  />
                </div>
              </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default LanguageSelect
