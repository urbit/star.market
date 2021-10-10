import { MouseEvent } from "react"
import { Box } from "@tlon/indigo-react"

const Modal = ({ children, hideModal }: { children: JSX.Element, hideModal: () => void }) => {
  const onClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    hideModal()
  }

  return <Box className="modal" padding={3} onClick={onClick}>
    {children}
  </Box>
}

export default Modal
