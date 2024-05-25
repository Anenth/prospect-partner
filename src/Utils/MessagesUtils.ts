import MESSAGE_KEY from '../contentScript/MESSAGE_KEY';

const browser = chrome;

export function setMessageToContentScript(messageKey: MESSAGE_KEY, payload: any) {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    if(!tabId) throw new Error('Tab ID not found');

    browser.tabs.sendMessage(tabId, { action: messageKey, payload});
  });
}
