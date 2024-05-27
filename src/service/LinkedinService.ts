import { $ } from 'select-dom'
import { replaceVariablesWithValues } from '../Utils/StringUtils'

const CONNECT_BUTTON_SELECTOR = 'div[aria-label="Invite to connect"]'

const LINKEDIN_SELECTORS = {
  PROFILE: {
    PROFILE_NAME: '.artdeco-card  h1',
    MORE_BUTTON: '.artdeco-card  button[aria-label="More actions"]',
    MORE_BUTTON_CONNECT:
      '.artdeco-card  button[aria-label="More actions"] + .artdeco-dropdown__content li:nth-child(3) > div',
    CONNECT_BUTTON: '.scaffold-layout__main .artdeco-card button[aria-label^="Invite "]',
  },
  CONNECT_MODAL: {
    SEND_INVITATION: 'button[aria-label="Send invitation"]',
    ADD_NOTE_BUTTON: 'button[aria-label="Add a note"]',
    NOTE_TEXTAREA: 'textarea[name="message"]',
  },
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const element = $(selector)
    if (element) {
      resolve(element)
    } else {
      setTimeout(() => resolve(waitForElement(selector)), 1000)
    }
  })
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

async function triggerNoteButton(): Promise<void> {
  const addNoteButton = (await waitForElement(
    LINKEDIN_SELECTORS.CONNECT_MODAL.ADD_NOTE_BUTTON,
  )) as HTMLButtonElement
  if (addNoteButton) {
    addNoteButton.click()
    return Promise.resolve()
  }
}

export async function triggerSendInvitationButton(): Promise<void> {
  const sendInvitationButton = (await waitForElement(
    LINKEDIN_SELECTORS.CONNECT_MODAL.SEND_INVITATION,
  )) as HTMLButtonElement
  if (sendInvitationButton) {
    sendInvitationButton.click()
    return Promise.resolve()
  }
}

export function triggerConnectModal(): Promise<void> {
  const connectButton = $(LINKEDIN_SELECTORS.PROFILE.CONNECT_BUTTON) as HTMLButtonElement
  const connectButton2 = $(LINKEDIN_SELECTORS.PROFILE.MORE_BUTTON_CONNECT) as HTMLButtonElement
  if (connectButton) {
    connectButton.click()
    return triggerNoteButton()
  } else if (connectButton2) {
    connectButton2.click()
    return triggerNoteButton()
  } else {
    return Promise.resolve()
  }
}

export async function addNoteWithMessageAndVariableValues(
  message: string,
  values: Record<string, string>,
): Promise<void> {
  const noteTextarea = $(LINKEDIN_SELECTORS.CONNECT_MODAL.NOTE_TEXTAREA) as HTMLTextAreaElement
  if (noteTextarea) {
    noteTextarea.value = replaceVariablesWithValues(message, values)
    noteTextarea.dispatchEvent(new Event('input', { bubbles: true }))
    await wait(1000)
    return Promise.resolve()
  } else {
    return Promise.resolve()
  }
}

export async function connectWithPerson(message: string) {
  const name = getLinkedProfileName()
  const isModalOpen = await triggerConnectModal()
  await addNoteWithMessageAndVariableValues(message || '', { name: name.firstName })
  triggerSendInvitationButton()
}
