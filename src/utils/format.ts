import { format } from 'date-fns'

export function formatTime(date: string) {
  return format(new Date(date), 'kk:mm:ss')
}
