import {
  darkGrey,
  darkRed,
  red,
  blue,
  lightGrey,
  transparentBlue,
  white,
  darkGreen,
  grey,
  bronze,
  bronzeContrast,
  darkGreenContrast,
  darkGreyContrast,
  greyContrast,
  lightGreyContrast,
} from '@/constants'

const COLORS = {
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
}

export default {
  colors: COLORS,
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
  fontFamily: ['Roboto, Arial'],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
  themes: {
    light: {
      backgroundPage: lightGrey,
      backgroundHeader: bronze,
      backgroundApp: grey,
      borderControl: bronze,
      borderPanel: darkGrey,
      borderApp: darkGreen,
      title: darkGreen,
    },
    dark: {
      backgroundPage: darkGreen,
      backgroundHeader: bronze,
      backgroundApp: darkGrey,
      borderControl: bronze,
      borderPanel: grey,
      borderApp: lightGrey,
      title: lightGrey,
    },
    contrast: {
      backgroundPage: lightGreyContrast,
      backgroundHeader: bronzeContrast,
      backgroundApp: greyContrast,
      borderControl: bronzeContrast,
      borderPanel: darkGreyContrast,
      borderApp: darkGreenContrast,
      title: darkGreenContrast,
    },
  },
  typography: {
    button: {
      border: `1px solid ${COLORS.borderBronze}`,
      fontSize: 14,
    },
    h4: {
      fontSize: 20,
    },
  },
}
