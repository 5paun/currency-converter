import axios from 'axios'

import { API_KEY_FOR_MY_POSITION, URL_CONVERT_SELECT_CURRENCY, URL_GET_CURRENCIES, URL_MY_IP, URL_MY_POSITION } from '@/constants'

export default class ConverterService {
  static async getCurrentIP () {
    return axios.get(URL_MY_IP)
  }

  static async getCurrentPosition (myIP) {
    return axios.get(`${URL_MY_POSITION}${myIP}`, {
      params: {
        key: API_KEY_FOR_MY_POSITION,
      },
    })
  }

  static async getCurrencies () {
    return axios.get(URL_GET_CURRENCIES)
  }

  static async convertSelectedCurrency (counterCode) {
    return axios.get(`${URL_CONVERT_SELECT_CURRENCY}${counterCode}.json`)
  }
}
