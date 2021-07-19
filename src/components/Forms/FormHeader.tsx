import { Button, Row, Text } from '@tlon/indigo-react'

const FormHeader = (
  { title, hideModal }:
  { title: string, hideModal: () => void }
) => {
  return <Row className="form-header">
    <Text className="back" onClick={hideModal}>Back</Text>
    <Text className="title">{title}</Text>
    <Button className="close" onClick={hideModal}>X</Button>
  </Row>
}

export default FormHeader
