import { openDB } from 'idb'
const DB_NAME = 'prospectPartnerDB'

export const DB = await openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore('messages')
  },
})
