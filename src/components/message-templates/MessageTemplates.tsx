import React, { useState } from 'react'
import { TemplateMessageType } from '../../service/TemplateMessageService'
import { getSmallUUID } from '../../Utils/MathUtils'
import { getFormValues } from '../../Utils/FormUtils'
import { Button, Form, Input, List } from 'antd';

type Props = {
  onSelect: (message: TemplateMessageType) => void
}

export default function MessageTemplates(props: Props) {
  const { onSelect } = props
  const [templates, setTemplates] = useState<Record<string, TemplateMessageType>>({})
  const [showAddTemplate, setShowAddTemplate] = useState(false)


  function handleAddTemplate(data: {message: string}) {
      const id = getSmallUUID()
      const order = Object.values(templates).length
      const template: TemplateMessageType = { id, message: data.message, order }
      setTemplates({ ...templates, [id]: template })
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
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <div>
      <List
        dataSource={Object.values(templates)}
        renderItem={note => (
          <List.Item>
            <Button onClick={() => onSelect(note)}>{note.message}</Button>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={() => setShowAddTemplate(true)}>Add New Template</Button>
    </div>
  )
}
