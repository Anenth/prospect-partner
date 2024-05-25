import { useState, useEffect } from 'react'

import './Popup.css'
import MessageTemplates from '../components/message-templates/MessageTemplates';
import { TemplateMessageType } from '../service/TemplateMessageService';
import { addNoteWithMessageAndVariableValues, getLinkedProfileName, triggerConnectModal } from '../service/LinkedinService';

export const Popup = () => {
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
  /* If connect button is not present, then click on the more button
  and click on connect button
  and add note
  fill the notes
    */
     triggerConnectModal();
     addNoteWithMessageAndVariableValues(selectedNote?.message || '', {name: getLinkedProfileName(),

     });
  }

  return (
    <div>
      <MessageTemplates onSelect={setSelectedNote}/>
      <button onClick={handleOnclick}>Connect</button>
    </div>
  )
}

export default Popup
