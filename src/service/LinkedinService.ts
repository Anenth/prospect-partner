import { replaceVariablesWithValues } from "./StringUtils";

const LINKEDIN_SELECTORS = {
  PROFILE: {
    PROFILE_NAME: 'h1[class="text-heading-xlarge"]',
    MORE_BUTTON: 'button[class="pv-s-profile-actions pv-s-profile-actions--share-profile pv-s-profile-actions__overflow-toggle"]',
    CONNECT_BUTTON: 'button[aria-label="Connect with"]',
  },
  CONNECT_MODAL: {
    CONNECT_BUTTON: 'button[aria-label="Send now"]',
    ADD_NOTE_BUTTON: 'button[aria-label="Add a note"]',
    NOTE_TEXTAREA: 'textarea[name="message"]',
    SEND_NOW_BUTTON: 'button[aria-label="Send invitation"]',
  },
}

export function getLinkedProfileName(): string {
  const profileNameElement = document.querySelector(LINKEDIN_SELECTORS.PROFILE.PROFILE_NAME);
  return profileNameElement ? profileNameElement.textContent || '' : '';
}

function triggerNoteButton(){
  const addNoteButton = document.querySelector(LINKEDIN_SELECTORS.CONNECT_MODAL.ADD_NOTE_BUTTON) as HTMLButtonElement;
  if(addNoteButton){
    addNoteButton.click();
  }
}

export function triggerConnectModal(){
  const connectButton = document.querySelector(LINKEDIN_SELECTORS.PROFILE.CONNECT_BUTTON) as HTMLButtonElement;
  if(connectButton){
    connectButton.click();
    triggerNoteButton();
  }else{
    const moreButton = document.querySelector(LINKEDIN_SELECTORS.PROFILE.MORE_BUTTON) as HTMLButtonElement;
    if(moreButton){
      moreButton.click();
      setTimeout(() => {
        const connectButton = document.querySelector(LINKEDIN_SELECTORS.PROFILE.CONNECT_BUTTON) as HTMLButtonElement;
        if(connectButton){
          connectButton.click();
          triggerNoteButton()
        }
      }, 1000);
    }
  }
}

export function addNoteWithMessageAndVariableValues(message: string, values: Record<string, string>){
  const noteTextarea = document.querySelector(LINKEDIN_SELECTORS.CONNECT_MODAL.NOTE_TEXTAREA) as HTMLTextAreaElement;
  if(noteTextarea){
    noteTextarea.value = replaceVariablesWithValues(message, values);
  }
}
