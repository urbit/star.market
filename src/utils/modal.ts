import { MouseEvent } from 'react'

export const stopClick = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}