import { connectWithPerson} from "../service/LinkedinService";
import MESSAGE_KEY from "./MESSAGE_KEY";

console.info('contentScript is running')

const browser = chrome;

const messageHandler: Record<MESSAGE_KEY, (payload: any) => void> = {
  [MESSAGE_KEY.CONNET_WITH_PERSON]: connectWithPerson
}

browser.runtime.onMessage.addListener((request: {
  action: MESSAGE_KEY;
  payload: any;
}, sender, sendResponse) => {
  if (request.action in messageHandler) {
    const response = messageHandler[request.action as MESSAGE_KEY](request.payload); // Explicitly specify the type of request.action
    sendResponse({ response });
  }
});
