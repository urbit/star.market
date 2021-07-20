import { MouseEvent, FormEvent } from 'react'

export const stopClick = (e: MouseEvent | FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  e.stopPropagation()
}