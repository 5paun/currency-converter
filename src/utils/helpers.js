import { daysOfWeek } from '@/constants'

export const log = (...rest) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...rest)
  }
}

export const formatDate = i => {
  const date = new Date()
  const today = date.getDate()
  const decrementDate = new Date(new Date().setDate(today - i))
  // локаль ko-KR подходила лучше всего по паттерну даты, которую принимает api
  return decrementDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '-').slice(0, -1)
}

export const getDateForWeek = () => {
  // latest, это часть урла, который отвечает за сегодняшний день.
  // А предыдущие шаблоны даты формируются при помощи функции выше
  const datesWeekly = ['latest']
  for (let i = 1; i < daysOfWeek; i++) {
    datesWeekly.push(formatDate(i))
  }
  return datesWeekly
}
