import { format } from 'date-fns'

export function formatDate(date: string, pattern: string) {
  return format(new Date(date), pattern)
}

export function formatPrice(value: number): string {
  return value.toFixed(2)
}
