import React from 'react'
import { Text } from '@tlon/indigo-react'

import './Balance.scss'

interface BalanceProps {
  amount: number
  label: string
}

export default function Balance({ amount, label }: BalanceProps) {
  return <Text className="balance">Balance: {amount} {label}</Text>
}
