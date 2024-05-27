import React, { useEffect, useState } from 'react'
import {
  TemplateMessageType,
  updateMessages,
  getAllMessages,
} from '../../service/TemplateMessageService'
import { getSmallUUID } from '../../Utils/MathUtils'
import { Button, Col, Form, Input, List, Row } from 'antd'

type Props = {
  onSelect: (message: TemplateMessageType) => void
}

export default function MessageTemplates(props: Props) {
  const { onSelect } = props
  const [templates, setTemplates] = useState<Array<TemplateMessageType>>([])

  useEffect(() => {
    setTemplates(getAllMessages())
  }, [])

  useEffect(() => {
    onSelect(templates?.[0])
  }, [templates])

  const [showAddTemplate, setShowAddTemplate] = useState(false)

  function handleAddTemplate(data: { message: string }) {
    const id = getSmallUUID()
    const order = templates.length
    const template: TemplateMessageType = { id: getSmallUUID(), message: data.message, order }
    const messages = [...templates, template]
    setTemplates(messages)
    updateMessages(messages)
    setShowAddTemplate(false)
  }

  if (showAddTemplate) {
    return (
      <div>
        <Form onFinish={handleAddTemplate}>
          <Form.Item name="message" label="Message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <div>
      <List
        dataSource={templates}
        renderItem={(note) => (
          <List.Item>
            <Button onClick={() => onSelect(note)}>{note.message}</Button>
          </List.Item>
        )}
      />
      <Row>
        <Col span={2} offset={6}>
          <Button type="default" size="small" onClick={() => setShowAddTemplate(true)}>
            Add New Template
          </Button>
        </Col>
      </Row>
    </div>
  )
}
