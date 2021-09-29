import { CHANGE_THEME } from '@/constants'

const initialState = {
  theme: 'light',
}

export function generalReduce (state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}
