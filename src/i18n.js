import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from 'src/translations/ru.json'
import en from 'src/translations/en.json'
import he from 'src/translations/he.json'
import common from 'src/translations/common.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: { ...ru, ...common } },
      en: { translation: { ...en, ...common } },
      he: { translation: { ...he, ...common } },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
