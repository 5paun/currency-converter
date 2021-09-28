export const log = (...rest) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...rest)
  }
}
