import { format, parse } from 'date-fns'

export const to12HourFormat = (time: string) => {
  try {
    const parsed = parse(time, 'HH:mm', new Date())
    return format(parsed, 'hh:mm')
  } catch {
    return time
  }
}
