import React, { useState } from 'react'
import { TemplateMessageType } from '../../service/TemplateMessageService'
import { getSmallUUID } from '../../Utils/MathUtils'
import { getFormValues } from '../../Utils/FormUtils'

type Props = {
  onSelect: (message: TemplateMessageType) => void
}

export default function MessageTemplates(props: Props) {
  const { onSelect } = props
  const [templates, setTemplates] = useState<Record<string, TemplateMessageType>>({})
  const [showAddTemplate, setShowAddTemplate] = useState(false)


  const handleAddTemplate = (e: React.FormEvent) => {
    const data =getFormValues(e);
      const id = getSmallUUID()
      const order = Object.values(templates).length
      const template: TemplateMessageType = { id, message: data.message, order }
      setTemplates({ ...templates, [id]: template })
      setShowAddTemplate(false)
  }

  if (showAddTemplate) {
    return (
      <div>
        <form onSubmit={handleAddTemplate}>
          <textarea name="message" title="Message"></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <ul>
        {Object.values(templates).map((note) => (
          <li key={note.id}>
            <button onClick={() => onSelect(note)}>{note.message}</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowAddTemplate(true)}>Add New Template</button>
    </div>
  )
}
