export const log = (...rest) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...rest)
  }
}

const daysOfWeek = 7

export const formatDate = i => {
  const date = new Date()
  const today = date.getDate()
  const decrementDate = new Date(new Date().setDate(today - i))
  // const year = decrementDate.getFullYear()
  // const month = decrementDate.getMonth() + 1
  // const day = decrementDate.getDate()
  // return `${year}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2, 0)}`
  return decrementDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '-').slice(0, -1)
}

export const getDateForWeek = () => {
  const datesWeekly = ['latest']
  for (let i = 1; i < daysOfWeek; i++) {
    datesWeekly.push(formatDate(i))
  }
  return datesWeekly
}
