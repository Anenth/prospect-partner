import { $ } from 'select-dom'
import { replaceVariablesWithValues } from './StringUtils'

const CONNECT_BUTTON_SELECTOR = 'div[aria-label="Invite to connect"]'

const LINKEDIN_SELECTORS = {
  PROFILE: {
    PROFILE_NAME: '.artdeco-card  h1',
    MORE_BUTTON: '.artdeco-card  button[aria-label="More actions"]',
    MORE_BUTTON_CONNECT:
      '.artdeco-card  button[aria-label="More actions"] + .artdeco-dropdown__content li:nth-child(3) > div',
    CONNECT_BUTTON: '.artdeco-card button[aria-label^="Invite "]',
  },
  CONNECT_MODAL: {
    CONNECT_BUTTON: 'button[aria-label="Send now"]',
    ADD_NOTE_BUTTON: 'button[aria-label="Add a note"]',
    NOTE_TEXTAREA: 'textarea[name="message"]',
    SEND_NOW_BUTTON: 'button[aria-label="Send invitation"]',
  },
}

export function getLinkedProfileName(): {
  fullName: string
  firstName: string
  lastName: string
} {
  const profileNameElement = $(LINKEDIN_SELECTORS.PROFILE.PROFILE_NAME)
  const fullName = profileNameElement ? profileNameElement.textContent || '' : ''
  return {
    fullName,
    firstName: fullName.split(' ')?.[0],
    lastName: fullName.split(' ')?.[1],
  }
}

function triggerNoteButton(): Promise<void> {
  const addNoteButton = $(LINKEDIN_SELECTORS.CONNECT_MODAL.ADD_NOTE_BUTTON) as HTMLButtonElement
  if (addNoteButton) {
    addNoteButton.click()
    return Promise.resolve()
  }else {
    setTimeout(() => {
      triggerNoteButton()
    }, 1000)
  }
}

export function triggerConnectModal(): Promise<void> {
  const connectButton = $(LINKEDIN_SELECTORS.PROFILE.CONNECT_BUTTON) as HTMLButtonElement
  const connectButton2 = $(LINKEDIN_SELECTORS.PROFILE.MORE_BUTTON_CONNECT) as HTMLButtonElement
  if (connectButton) {
    connectButton.click()
    return triggerNoteButton();
  } else if (connectButton2) {
    connectButton2.click()
    return triggerNoteButton()
  } else {
    return Promise.resolve()
  }
}

export function addNoteWithMessageAndVariableValues(
  message: string,
  values: Record<string, string>,
) {
  const noteTextarea = $(LINKEDIN_SELECTORS.CONNECT_MODAL.NOTE_TEXTAREA) as HTMLTextAreaElement
  if (noteTextarea) {
    noteTextarea.value = replaceVariablesWithValues(message, values)
  }
}
