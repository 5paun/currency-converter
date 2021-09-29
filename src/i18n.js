import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from 'src/translations/ru.json'
import en from 'src/translations/en.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
