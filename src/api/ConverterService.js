import axios from 'axios'

import { URL_CONVERT_SELECT_CURRENCY, URL_GET_CURRENT_IP, URL_GET_CURRENT_POSITION } from '@/constants'

export default class ConverterService {
  static async getCurrentIP () {
    return axios.get(URL_GET_CURRENT_IP)
  }

  static async getCurrentPosition (ip) {
    return axios.get(`${URL_GET_CURRENT_POSITION}${ip}`, {
      params: {
        key: process.env.REACT_APP_API_KEY_CURRENT_POSITION,
      },
    })
  }

  static async convertSelectedCurrency (counterCode) {
    return axios.get(`${URL_CONVERT_SELECT_CURRENCY}${counterCode}.json`)
  }
}
