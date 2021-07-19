import { ChangeEvent } from "react"

interface TextInputProps {
  label?: string,
  placeholder?: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  type: string,
}

const TextInput = (props: TextInputProps) => {
  const { label } = props

  return <div>
    {label && <label>{label}</label>}
    <input {...props} />
  </div>
}

export default TextInput
