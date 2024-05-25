import { useState, useEffect } from 'react'
import { Button, Space } from 'antd';
import { appVersion } from '../../Utils/EnvUtils';
import { TemplateMessageType } from '../../service/TemplateMessageService';
import MessageTemplates from '../message-templates/MessageTemplates';
import MESSAGE_KEY from '../../contentScript/MESSAGE_KEY';
import { setMessageToContentScript } from '../../Utils/MessagesUtils';


export default function ConnectWithPerson(){
  const [selectedNote, setSelectedNote] = useState<TemplateMessageType>();

  // useEffect(() => {
  //   chrome.storage.sync.get(['notes'], (result) => {
  //     setNotes(result.notes)
  //   })
  // }, [])

  // useEffect(() => {
    // chrome.storage.sync.set({ count })
  //   chrome.runtime.sendMessage({ type: 'COUNT', count })
  // }, [count])


  function handleOnclick() {
    setMessageToContentScript(MESSAGE_KEY.CONNET_WITH_PERSON, selectedNote?.message)
  }

  return (
    <div>
      <MessageTemplates onSelect={setSelectedNote}/>
      <Space direction="vertical" size='large' />
      <Button type="primary" size="large" onClick={handleOnclick}>Connect</Button>
    </div>
  )
}

