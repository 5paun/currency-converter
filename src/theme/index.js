import { darkGrey, darkRed, red, blue, lightGrey, transparentBlue, white, darkGreen, grey, bronze } from '@/constants/color'

export default {
  colors: {
    background: white,
    backgroundLightGrey: lightGrey,
    backgroundGrey: grey,
    borderGrey: darkGrey,
    borderGreen: darkGreen,
    borderBronze: bronze,
    primary: red,
    primaryDark: darkRed,
    secondary: blue,
    secondaryLight: transparentBlue,
    font: darkGrey,
  },
  fontSizes: {
    verySmall: '12px',
    small: '14px',
    normal: '16px',
    big: '20px',
    veryBig: '24px',
    superVeryBig: '48px',
  },
  letterSpacing: {
    normal: 'normal',
    caps: '0.25em',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  fontFamily: ['Lato, "Helvetica Neue", Arial'],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
}
