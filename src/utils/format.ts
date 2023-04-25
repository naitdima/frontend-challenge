import { format } from 'date-fns'

export function formatDate(date: string, pattern: string) {
  return format(new Date(date), pattern)
}
